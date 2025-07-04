import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



export async function GET(_req: NextRequest, { params }: any) {
    const { id: idString } = await params;
    const id = Number(await idString)

    if (isNaN(id)) {
        console.log(idString)
        return new NextResponse("Invalid id", { status: 400 })
    }

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