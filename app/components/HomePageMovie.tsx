import type { Movie } from "@prisma/client";
import { getImageUrl, getYear } from "../utils/utils";
import Link from "next/link";
import MovieType from "./MovieType";


export default function HomePageMovie({ movie }: { movie: Movie }) {

    const imagePath = getImageUrl(movie.poster_path , true);

    return (
        <Link href={`/movie/${movie.id}`} className="flex-1 group cursor-pointer relative overflow-hidden" >
            <img src={imagePath} className="object-cover rounded-2xl group-hover:brightness-40" alt="" />
            <div className="absolute bottom-3 my-4  text-center w-full not-group-hover:translate-y-[200%] duration-250 ease-in-out">
                <h3 className="text-text text-2xl font-bold text-center mx-1">{movie.title}</h3>
                <h5 className="text-muted-text text-lg font-semibold empty:hidden">{getYear(movie.release_date)}</h5>
                <h5 className="text-soft-text text-lg font-semibold empty:hidden"><MovieType movietype={movie.type} /></h5>
                {/* <p className="text-soft-text font-medium text-xl">{movie.overview}</p> */}
            </div>

        </Link>
    );

}