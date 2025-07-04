export const dynamic = 'force-dynamic';

import Tag from "@/app/components/Tag";
import { getImageUrl } from "@/app/utils/utils"
import { Prisma , GenreMovie } from "@prisma/client";
import Link from "next/link";
import ArabicDate from "@/app/components/ArabicDate";
import { getRunTimeorEpisodes } from "@/app/utils/utils";
import MovieType from "@/app/components/MovieType";
import ImagesInMovie from "@/app/components/ImagesInMovie";

type FullMovie = Prisma.MovieGetPayload<{
    include: {
        GenreMovie: {
            include: {
                Genre: true;
            };
        };
        MovieActor: {
            include: {
                Actor: true;
            };
        };
        ProviderMovie: {
            include: {
                Platform: true;
            };
        };
        CompanyMovie: {
            include: {
                ProductionCompany: true;
            };
        };
        Image: true;
    };
}>;

type FullGenreMovie = Prisma.GenreMovieGetPayload<{
    include: {
        Genre: true;
    };
}>;


const page = async ({ params }: { params: Promise<{ id: string }>}) => {

    const { id } = await params

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
    const { movie }: { movie: FullMovie } = await fetch(`${baseUrl}/api/movie/${id}`).then(res => res.json());


    return (
        <div className="w-screen mb-100">
            {/* Main */}
            <div className="w-screen relative h-screen">
                {/* Background image with filter */}
                <div
                    className="absolute inset-0 bg-center bg-cover brightness-30 blur-sm z-0"
                    style={{ backgroundImage: `url(${getImageUrl(movie.backdrop_path)})` }}
                ></div>
                <div className="w-full h-full flex items-end justify-between p-20 pt-[118px] pb-10 gap-5 lg:gap-50 xl:gap-80 z-10 relative">

                    <div className=" flex flex-col justify-end gap-10">
                        <div className="flex items-end justify-start gap-3">
                            <h1 className="text-text text-7xl font-bold">{movie.title}</h1>
                            {
                                movie.GenreMovie.map((genre: FullGenreMovie) => (
                                    <Tag Tag={genre?.Genre?.name} key={genre?.Genre?.id} />
                                ))
                            }
                        </div>
                        <p className="text-muted-text text-base font-medium">{movie.overview}</p>
                        {
                            movie.ProviderMovie.length > 0 &&
                            <p className="text-muted-text text-sm font-medium">متاح على {movie.ProviderMovie[0]?.Platform?.name}</p>
                            &&
                            <Link href={(movie.ProviderMovie[0]?.Platform?.link as string)} target="_blank" className="w-fit">
                                <img src={getImageUrl(movie.ProviderMovie[0]?.Platform?.poster_path ?? null)} alt="" className="w-[50px] rounded-md" />
                            </Link>
                        }
                    </div>
                    <div className="flex flex-col items-end gap-5">
                        <div className="flex flex-row-reverse items-center justify-center gap-4">
                            <h4 className="text-sm font-bold text-nowrap bg-secondary px-2 py-1 rounded-full empty:hidden"><ArabicDate dateString={movie.release_date} /></h4>
                            <h4 className="text-sm font-bold text-nowrap bg-secondary px-2 py-1 rounded-full text-center empty:hidden">{getRunTimeorEpisodes(movie)}</h4>
                            <h4 className="text-sm font-bold text-nowrap bg-secondary px-2 py-1 rounded-full text-center empty:hidden"><MovieType movietype={movie.type} /></h4>
                        </div>
                        <div className="flex flex-col items-end gap-5 max-h-[70vh]">
                            <img
                                src={getImageUrl(movie.poster_path, true)}
                                alt={movie.title}
                                className="max-h-full w-auto object-cover rounded-2xl shadow-xl"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* Images */}
            <ImagesInMovie images={movie.Image} />
            {/* Production */}
            <section className="my-30">
                {/* section Header */}
                <div className="w-[81%] mx-auto flex items-center justify-end flex-row-reverse gap-5">
                    <div >
                        <h2 className="text-5xl text-text font-extrabold mb-2">شركات الانتاج</h2>
                        <h5 className="text-base text-muted-text font-normal">الجهات اللي وقفت ورا العمل ده، بالإنتاج والدعم.</h5>
                    </div>
                    <div className="w-3 h-20 bg-primary self-stretch"></div>
                </div>
                {/* Companies */}
                <div className="flex items-start justify-end flex-row-reverse gap-5 flex-wrap w-[81%] mx-auto mt-15">
                    {
                        movie.CompanyMovie.map((companyMovie) => (
                            <div key={companyMovie?.ProductionCompany?.id} className="flex flex-col items-center gap-3">
                                <img

                                    src={getImageUrl(companyMovie.ProductionCompany?.poster_path ?? null)}
                                    className="h-[150px] w-fit background-cover background-center rounded-xl cursor-pointer bg-surface-background border-2xl p-4"
                                    alt=""
                                >
                                </img>
                                <h3 className="text-text font-semibold">{companyMovie?.ProductionCompany?.name}</h3>
                            </div>
                        ))
                    }
                </div>

            </section>
            {/* Actors */}
            {
                movie.MovieActor.filter((movieactor) => movieactor.Actor.department == "Acting").length > 0 &&
                <section className="my-30 ">
                    {/* section Header */}
                    <div className="w-[81%] mx-auto flex items-center justify-end flex-row-reverse gap-5">
                        <div >
                            <h2 className="text-5xl text-text font-extrabold mb-2">الممثلين</h2>
                            <h5 className="text-base text-muted-text font-normal">الكاست</h5>
                        </div>
                        <div className="w-3 h-20 bg-primary self-stretch"></div>
                    </div>
                    <div className="grid gap-10 flex-wrap w-[81%] mx-auto my-20 grid-cols-2">
                        {
                            movie.MovieActor.filter((movieactor) => movieactor.Actor.department == "Acting").map((movieactor) => (
                                <Link href={`/person/${movieactor.Actor.id}`} key={movieactor.id}
                                    className="flex items-center justify-start gap-5">
                                    <img
                                        key={movieactor?.Actor?.id}
                                        src={getImageUrl(movieactor.Actor?.profile_path ?? null , true)}
                                        className="size-[150px] background-cover object-center rounded-full cursor-pointer object-cover"
                                        alt=""
                                    >
                                    </img>
                                    <div>
                                        <h2 className="text-3xl text-text font-bold mb-2">{movieactor.Actor?.name}</h2>
                                        <h5 className="text-base text-muted-text font-normal">{movieactor.name}</h5>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </section>
            }
            {
                movie.MovieActor.filter((movieactor) => movieactor.Actor.department !== "Acting").length > 0 &&
                <section className="my-30 ">
                    {/* section Header */}
                    <div className="w-[81%] mx-auto flex items-center justify-end flex-row-reverse gap-5">
                        <div >
                            <h2 className="text-5xl text-text font-extrabold mb-2">الطاقم</h2>
                            <h5 className="text-base text-muted-text font-normal">الكرو</h5>
                        </div>
                        <div className="w-3 h-20 bg-primary self-stretch"></div>
                    </div>
                    <div className="grid gap-10 flex-wrap w-[81%] mx-auto my-20 grid-cols-2">
                        {
                            movie.MovieActor.filter((movieactor) => movieactor.Actor.department !== "Acting").map((movieactor) => (
                                <div key={movieactor.id}
                                    className="flex items-center justify-start gap-5">
                                    <img
                                        key={movieactor?.Actor?.id}
                                        src={getImageUrl(movieactor.Actor?.profile_path ?? null , true)}
                                        className="size-[150px] background-cover object-center rounded-full cursor-pointer object-cover"
                                        alt=""
                                    >
                                    </img>
                                    <div>
                                        <h2 className="text-3xl text-text font-bold mb-2">{movieactor.Actor?.name}</h2>
                                        <h5 className="text-base text-muted-text font-normal">{movieactor.name}</h5>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </section>
            }
        </div>
    )
}

export default page