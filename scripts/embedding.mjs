import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";

const prisma = new PrismaClient();

const movies = await prisma.movie.findMany({
    orderBy: {
        release_date: "desc",
    },

    take: 1000,
    where: {
        release_date: {
            not: null,
            lte: new Date(),
        },
        NOT: {
            title: null,
            overview: null,
            title: "",
            overview: "",
        },
        OR: [
            {
                runtime: {
                    gte: 45
                }
            },
            {
                type: "tv"
            }
        ]
    },
    include: {
        GenreMovie: {
            include: { Genre: true },
        },
        MovieActor: {
            where: {
                order: { gte: 0 },
            },
            orderBy: {
                order: "asc",
            },
            include: {
                Actor: {
                    include: {
                        MovieActor: {
                            orderBy: {
                                order: "asc",
                            },
                            where: {
                                order: {
                                    gte: 0,
                                },
                            },
                            take: 3,
                            include: {
                                Movie: {
                                    include: {
                                        GenreMovie: {
                                            include: { Genre: true },
                                        },
                                        MovieActor: {
                                            take: 3,
                                            include: {
                                                Actor: {
                                                    include: {
                                                        MovieActor: {
                                                            take: 3,
                                                            where: {
                                                                order: { gte: 0 },
                                                            },
                                                            orderBy: {
                                                                order: "asc",
                                                            },
                                                            include: {
                                                                Movie: {
                                                                    include: {
                                                                        GenreMovie: {
                                                                            include: { Genre: true },
                                                                        },
                                                                        MovieActor: {
                                                                            take: 3,
                                                                            include: {
                                                                                Actor: true,
                                                                            },
                                                                        },
                                                                    },
                                                                },
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        ProviderMovie: {
            include: { Platform: true },
        },
        CompanyMovie: {
            include: { ProductionCompany: true },
        },
        Image: true,
    },
});

// let embedding_text = "";

// const movie_overview = movie.overview;
// const movie_title = movie.title;
// const movie_genres = movie.GenreMovie.map((genre) => genre.Genre.name);
// const movie_release_date = movie.release_date;
// const movie_cast = movie.MovieActor;

// const movie_director = movie_cast.filter((actor) => actor.name === "Director");
// const movie_writer = movie_cast.filter((actor) => actor.name === "Writer");

// embedding_text = `title: ${movie_title}, overview: ${movie_overview}, genres: ${movie_genres.join(", ")}, release_date: ${movie_release_date}, type: ${movie.type === "tv" ? "Tv Series" : "Movie"
//     }, ${movie.type === "tv"
//         ? movie.episodes > 0
//             ? "episodes: " + movie.episodes
//             : ""
//         : movie.runtime > 0
//             ? "runtime: " + movie.runtime
//             : ""
//     }, ${movie_director.length > 0 ? "director: " + movie_director[0].Actor.name + ", " : ""}${movie_writer.length > 0 ? "writer: " + movie_writer[0].Actor.name + ", " : ""
//     }actors:\n`;

// const movie_stars = movie_cast.filter((actor) => actor.order >= 0 && actor.order <= 3);
// for (const movie_actor of movie_stars) {
//     embedding_text += `${movie_actor.Actor.name} : `;

//     for (const inner_actor_movie of movie_actor.Actor.MovieActor.filter(
//         (a) => a.order >= 0 && a.order <= 3 && a.Movie.id !== movie.id
//     )) {
//         embedding_text += `acted in ${inner_actor_movie.Movie.title}: ${inner_actor_movie.Movie.overview}, genres: ${inner_actor_movie.Movie.GenreMovie.map(
//             (g) => g.Genre.name
//         ).join(",")}`;

//         const inner_movie_stars = inner_actor_movie.Movie.MovieActor.filter(
//             (a) => a.order >= 0 && a.order <= 3
//         );

//         if (inner_movie_stars.length > 0) {
//             embedding_text += `, actors: ${inner_movie_stars.map((a) => a.Actor.name).join(",")}`;
//         }

//         // 2nd Layer: dive into actors of this movie
//         for (const second_layer_actor of inner_movie_stars) {
//             embedding_text += `\n  ${second_layer_actor.Actor.name} : `;
//             for (const second_layer_movie of second_layer_actor.Actor.MovieActor.filter(
//                 (ma) =>
//                     ma.order >= 0 &&
//                     ma.order <= 3 &&
//                     ma.Movie.id !== movie.id &&
//                     ma.Movie.id !== inner_actor_movie.Movie.id
//             )) {
//                 embedding_text += `acted in ${second_layer_movie.Movie.title}: ${second_layer_movie.Movie.overview}, genres: ${second_layer_movie.Movie.GenreMovie.map(
//                     (g) => g.Genre.name
//                 ).join(",")}`;
//                 const second_layer_movie_stars = second_layer_movie.Movie.MovieActor.filter(
//                     (a) => a.order >= 0 && a.order <= 3
//                 );
//                 if (second_layer_movie_stars.length > 0) {
//                     embedding_text += `, actors: ${second_layer_movie_stars.map((a) => a.Actor.name).join(",")}`;
//                 }
//                 embedding_text += "\n";
//             }
//         }

//         embedding_text += "\n";
//     }

//     embedding_text += "\n";
// }

const movie = movies[0];

const results = movies.map((movie) => {
    const result = {
    title: movie.title,
    overview: movie.overview,
    genres: movie.GenreMovie.map(g => g.Genre.name),
    release_date: movie.release_date.toISOString(),
    type: movie.type === "tv" ? "Tv Series" : "Movie",
    episodes: movie.episodes,
    actors: movie.MovieActor
        .filter(ma => ma.order >= 0 && ma.order <= 3)
        .map(ma => ({
            name: ma.Actor.name,
            related_movies: ma.Actor.MovieActor
                .filter(other => other.order >= 0 && other.Movie.id !== movie.id)
                .map(other => ({
                    title: other.Movie.title,
                    overview: other.Movie.overview,
                    genres: other.Movie.GenreMovie.map(g => g.Genre.name),
                    actors: other.Movie.MovieActor
                        .filter(a => a.order >= 0 && a.order <= 3)
                        .map(a => a.Actor.name)
                }))
        }))
    }
    return {input: JSON.stringify(result) , movie_id: movie.id};
})
// const result = {
//     title: movie.title,
//     overview: movie.overview,
//     genres: movie.GenreMovie.map(g => g.Genre.name),
//     release_date: movie.release_date.toISOString(),
//     type: movie.type === "tv" ? "Tv Series" : "Movie",
//     episodes: movie.episodes,
//     actors: movie.MovieActor
//         .filter(ma => ma.order >= 0 && ma.order <= 3)
//         .map(ma => ({
//             name: ma.Actor.name,
//             related_movies: ma.Actor.MovieActor
//                 .filter(other => other.order >= 0 && other.Movie.id !== movie.id)
//                 .map(other => ({
//                     title: other.Movie.title,
//                     overview: other.Movie.overview,
//                     genres: other.Movie.GenreMovie.map(g => g.Genre.name),
//                     actors: other.Movie.MovieActor
//                         .filter(a => a.order >= 0 && a.order <= 3)
//                         .map(a => a.Actor.name)
//                 }))
//         }))
// }

const lines = results.map(obj => JSON.stringify(obj)).join("\n");
await fs.writeFile("embedding_input.jsonl", lines, "utf8");
console.log("Done");
