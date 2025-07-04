import type { Movie } from "@prisma/client";
import { getImageUrl, getYear } from "../utils/utils";
import Link from "next/link";
import MovieType from "./MovieType";
import FallbackImage from "./ImageFallback";


export default function HomePageMovie({ movie }: { movie: Movie }) {

    const imagePath = getImageUrl(movie.poster_path , true);

    return (
        <Link href={`/movie/${movie.id}`} className="flex-1 group cursor-pointer relative overflow-hidden " >
            <FallbackImage
            src={imagePath} className="object-cover rounded-2xl group-hover:brightness-40 bg-surface-background" alt="" />
            <div className="absolute bottom-3 my-4 text-center w-full ">
                <h3 className="text-text text-2xl font-bold text-center mx-1 opacity-0 group-hover:opacity-100 not-group-hover:translate-y-[100%] duration-250 ease-in-out">{movie.title}</h3>
                <h5 className="text-muted-text text-lg font-semibold empty:hidden opacity-0 group-hover:opacity-100 not-group-hover:translate-y-[100%] duration-400 delay-50 ease-in-out">{getYear(movie.release_date)}</h5>
                <h5 className="text-soft-text text-lg font-semibold empty:hidden opacity-0 group-hover:opacity-100 not-group-hover:translate-y-[100%] duration-550 delay-100 ease-in-out"><MovieType movietype={movie.type} /></h5>
            </div>
        </Link>
    );

}