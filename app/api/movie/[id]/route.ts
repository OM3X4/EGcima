import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



export async function GET(_req: NextRequest, context: any) {
    const { params } = context as { params: { id: string } };
    const id = params.id;
    try {
        const movie = await prisma.movie.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                GenreMovie: {
                    include: {
                        Genre: true
                    }
                },
                MovieActor: {
                    include: {
                        Actor: true
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
        return NextResponse.json({ movie });
    } catch (error) {
        console.error("🔥 Prisma API error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, {
            status: 500
        })
    }
}