export const dynamic = 'force-dynamic';
import React from 'react'
import { departmentFormatter, getImageUrl } from '@/app/utils/utils'
import ArabicDate from '@/app/components/ArabicDate'
import HomePageMovie from '@/app/components/HomePageMovie';
import type { Movie, MovieActor } from '@prisma/client';
import { uniqueBy } from '@/app/utils/utils';



type MovieActorWithRelations = MovieActor & {
    Movie: Movie;
    Actor: {
        id: number;
        name: string;
        department: string;
        // other Actor fields
    };
};

type PageProps = {
    params: {
        id: string;
    };
};

async function Page({ params } : { params: Promise<{ id: string }>}) {
    const { id } = await params;

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
    const { actor } = await fetch(`${baseUrl}/api/person/${id}`).then(res => res.json());
    const { results, actors, movies } = await fetch(`${baseUrl}/api/search/الحريفة`).then(res => res.json());

    // console.log(results)
    console.log(actors)
    console.log(movies)

    const sortedMovies = actor.MovieActor.sort((a: { order: number }, b: { order: number }) => a.order - b.order);
    const backdropMovie = sortedMovies.filter((movieactor: MovieActorWithRelations) => movieactor.Movie.backdrop_path != null && (actor.department !== "Acting" || (movieactor.order as number) > -1))[0].Movie;


    // return <h1 className='text-9xl text-text'>{id}</h1>

    return (
        <div>
            {/* Main */}
            <div className="w-screen relative h-screen">
                {/* Background image with filter */}
                <div
                    className="absolute inset-0 bg-center bg-cover brightness-30 blur-sm z-0"
                    style={{ backgroundImage: `url(${getImageUrl(backdropMovie?.backdrop_path ?? null)})` }}
                ></div>
                <div className="w-full h-full flex items-center justify-between p-20 pt-[118px] pb-10 gap-5 lg:gap-50 xl:gap-80 z-10 relative">

                    <div className=" flex flex-col justify-end gap-10">
                        <h1 className="text-text text-7xl font-bold">{actor.name}</h1>
                        <p className="text-muted-text text-base font-medium">{actor.bio}</p>
                    </div>
                    <div className="flex flex-col items-end gap-5">
                        <div className="flex flex-row-reverse items-center justify-center gap-4">
                            <h4 className="text-sm font-bold text-nowrap bg-secondary px-2 py-1 rounded-full empty:hidden"><ArabicDate dateString={actor.birthday} /></h4>
                            <h4 className="text-sm font-bold text-nowrap bg-secondary px-2 py-1 rounded-full text-center empty:hidden">{actor.place_of_birth}</h4>
                            <h4 className="text-sm font-bold text-nowrap bg-secondary px-2 py-1 rounded-full text-center empty:hidden">{departmentFormatter(actor.department)}</h4>
                            <h4 className="text-sm font-bold text-nowrap bg-secondary px-2 py-1 rounded-full text-center empty:hidden">{actor.gender == 2 ? "ذكر" : "انثى"}</h4>
                        </div>
                        <div className="flex flex-col items-end gap-5 max-h-[70vh]">
                            <img
                                src={getImageUrl(actor.profile_path, true)}
                                alt=""
                                className="max-h-full w-auto object-cover rounded-2xl shadow-xl"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <section className='my-30 w-screen'>
                <div className="w-[81%] mx-auto flex items-center justify-end flex-row-reverse gap-5">
                    <div >
                        <h2 className="text-5xl text-text font-extrabold mb-2">اتفرج عليه في</h2>
                        <h5 className="text-base text-muted-text font-normal">الاعمال</h5>
                    </div>
                    <div className="w-3 h-20 bg-primary self-stretch"></div>
                </div>
                <div className='w-[81%] mx-auto grid grid-cols-5 gap-10 mt-20'>
                    {
                        uniqueBy<MovieActorWithRelations>(actor.MovieActor, "movieId")
                            .sort((a: MovieActorWithRelations, b: MovieActorWithRelations) => {
                                const aInvalid = (a.order as number) < 0;
                                const bInvalid = (b.order as number) < 0;

                                if (aInvalid && !bInvalid) return 1;  // a goes to end
                                if (!aInvalid && bInvalid) return -1; // b goes to end
                                if (aInvalid && bInvalid) return 0;   // both are invalid, keep order

                                if (a.order === b.order) {
                                    const aDate = a.Movie.release_date ? new Date(a.Movie.release_date).getTime() : 0;
                                    const bDate = b.Movie.release_date ? new Date(b.Movie.release_date).getTime() : 0;
                                    return bDate - aDate; // newer first
                                }

                                return (a.order as number) - (b.order as number);
                            })
                            .map(({ Movie }: { Movie: Movie }) => (
                                <HomePageMovie key={Movie.id} movie={Movie} />
                            ))
                    }

                </div>
            </section>
        </div>
    )
}

export default Page