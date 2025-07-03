// app/api/test/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
    _req: NextRequest,
) {
    try {
        const today = new Date();

        const actors = await prisma.movieActor.findMany({
            include: {
                Movie: true,
                Actor: true,
            },
            where: {
                order: {
                    in: [0, 1, 2],
                },
                OR: [
                    {
                        Movie: {
                            release_date: {
                                not: null,
                                lte: today,
                            },
                            type: "tv",
                        },
                    },
                    {
                        Movie: {
                            release_date: {
                                not: null,
                                lte: today,
                            },
                            runtime: {
                                gte: 45,
                            },
                        },
                    },
                ],
            },
            orderBy: [
                {
                    Movie: {
                        release_date: "desc",
                    },
                },
                {
                    order: "asc",
                },
            ],
            take: 10,
        });

        return NextResponse.json({ actors });
    } catch (error) {
        console.error("🔥 Prisma API error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
