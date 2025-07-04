import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



export async function GET(
    _req: NextRequest,
    { params } : any
) {

    const { query } = await params;



    try {
        const results = await prisma.$queryRaw`
        WITH ranked_movies AS (
        SELECT
            id,
            title AS label,
            'movie' AS type,
            similarity(title, ${query}) AS sim,
            CASE
            WHEN title = ${query} THEN 100
            WHEN title ILIKE ${query + '%'} THEN 90
            WHEN title ILIKE ${'%' + query + '%'} THEN 80
            ELSE 70 + similarity(title, ${query}) * 30
            END AS rank_score
        FROM "Movie"
        WHERE title % ${query} OR title ILIKE ${'%' + query + '%'}
        ),
        ranked_actors AS (
        SELECT
            id,
            name AS label,
            'actor' AS type,
            similarity(name, ${query}) AS sim,
            CASE
            WHEN name = ${query} THEN 100
            WHEN name ILIKE ${query + '%'} THEN 90
            WHEN name ILIKE ${'%' + query + '%'} THEN 80
            ELSE 70 + similarity(name, ${query}) * 30
            END AS rank_score
        FROM "Actor"
        WHERE name % ${query} OR name ILIKE ${'%' + query + '%'}
        )
        SELECT *
        FROM (
        SELECT * FROM ranked_movies
        UNION ALL
        SELECT * FROM ranked_actors
        ) AS all_results
        ORDER BY rank_score DESC
        LIMIT 10;
        `;
        const movies = await prisma.movie.findMany({
            where:{
                id: {
                    in: (results as any).filter((result: any) => result.type === 'movie').map((result: any) => result.id)
                }
            },
            include: {
                GenreMovie: {
                    include: {
                        Genre: true
                    }
                },
                MovieActor: {
                    include: {
                        Actor: {
                            include: {
                                MovieActor: {
                                    include: {
                                        Movie: {
                                            include: {
                                                MovieActor: {
                                                    include: {
                                                        Actor: true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                ProviderMovie: {
                    include: {
                        Platform: true
                    }
                },
                CompanyMovie: {
                    include: {
                        ProductionCompany: true
                    }
                },
                Image: true
            }
        })
        const actors = await prisma.actor.findMany({
            where:{
                id: {
                    in: (results as any).filter((result: any) => result.type === 'actor').map((result: any) => result.id)
                }
            }
        })


        return NextResponse.json({ results , movies , actors });
    } catch {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }


}