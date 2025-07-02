export default function MovieType({ movietype }: { movietype: string | null}) {
    if(!movietype) return "";
    const movieType = movietype === "movie" ? "فيلم" : "مسلسل";

    return <span>{movieType}</span>;
}