import {NextRequest ,  NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



export async function GET(
    _req: NextRequest,
) {

    try {
        const highestRevenue = await prisma.movie.findMany({
            where: {
                release_date: {
                    not: null,
                    lte: new Date()
                },
                type: {
                    equals: "movie"
                },
                poster_path: {
                    not: null
                }
            },
            orderBy: {
                revenue: "desc"
            },
            take: 3
        })

        return NextResponse.json({ highestRevenue });
    } catch {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }


}