import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET(){

    try {
        const LatestMovies = await prisma.movie.findMany({
            where: {
                release_date: {
                    not: null,
                    lte: new Date()
                },
                type: {
                    equals: "movie"
                },
                runtime: {
                    gte: 45
                },
                poster_path: {
                    not: null
                }
            },
            orderBy: {
                release_date: "desc"
            },
            take: 5
        })

        return NextResponse.json({ LatestMovies });
    }catch {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }


}