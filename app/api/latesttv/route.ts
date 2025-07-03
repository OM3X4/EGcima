import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



export async function GET(
    _req: NextRequest,
) {

    try {
        const LatestTv = await prisma.movie.findMany({
            where: {
                release_date: {
                    not: null,
                    lte: new Date()
                },
                type: {
                    equals: "tv"
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

        return NextResponse.json({ LatestTv });
    } catch {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }


}