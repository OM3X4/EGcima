import type { Movie } from "@prisma/client";

export function getImageUrl(path: string | null, isVertical = false): string {
    if (!path) return isVertical ? "/Images/VPlaceholder.jpg" : "/Images/HPlaceholder.jpg";

    return path.startsWith("/")
        ? `https://image.tmdb.org/t/p/w1280${path}`
        : path;
}

export function getRunTimeorEpisodes(movie: Movie): string | undefined {
    if (movie.type === "movie") return movie.runtime + " دقيقة";
    else if (movie.episodes) return movie.episodes + " حلقات";
}

export function getYear(dateInput: string | Date | null) {
    if (!dateInput) return ""
    const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    return date.getFullYear();
}

export function formatRevenue(number: number | null) {
    if (!number) return "0";
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getOldestRevenueUpdated(highestRevenue: Movie[]) {
    return highestRevenue.reduce(
        (prev: Movie, curr: Movie) =>
            (prev.revenue_last_update ?? 0) > (curr.revenue_last_update ?? 0) ? prev : curr
    ).revenue_last_update
}

export function uniqueBy<T>(array: T[], key: keyof T): T[] {
    const seen = new Set();
    return array.filter((item) => {
        const value = item[key];
        if (seen.has(value)) return false;
        seen.add(value);
        return true;
    });
}

export function departmentFormatter(department: string | null) {
    if(!department) return "";
    const entoar: Record<string, string> = {
        "Acting": "تمثيل",
        "Writing": "كتابة",
        "Production": "انتاج",
        "Directing": "توجيه",
        "Sound": "صوت",
        "Camera": "كاميرا",
        "Costume & Make-Up": "ماكياج",
        "Visual Effects": "مؤثرات بصرية",
        "Lighting": "إضاءة",
        "Editing": "مونتاج",
    }


    return entoar[department] || "";
}