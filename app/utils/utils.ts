import type { Movie } from "@prisma/client";

export function getImageUrl(path: string | null, isVertical = false): string {
    if (!path) return isVertical ? "/VPlaceholder.jpg" : "/HPlaceholder.jpg";

    return path.startsWith("/")
        ? `https://image.tmdb.org/t/p/w1280${path}`
        : path;
}

export function getRunTimeorEpisodes(movie: Movie): string | undefined {
    if (movie.type === "movie") return movie.runtime + " دقيقة";
    else if (movie.episodes) return movie.episodes + " حلقات";
}

export function getYear(dateInput: string | Date | null) {
    if(!dateInput) return ""
    const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    return date.getFullYear();
}