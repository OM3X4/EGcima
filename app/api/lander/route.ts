// app/api/test/route.ts
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
    _req: NextRequest,
) {
    try {
        const prisma = new PrismaClient();
        const movie = await prisma.movie.findUnique({
            // where: { id: 1316416 }, //siko siko
            // where: { id: 1197989 }, // الحريفة
            // where: { id: 202040 }, // البيت بيتي
            where: { id: 261747 }, // silk kingdom
        });
        const movie2 = await prisma.movie.findMany({
            where: {
                id: 261747
            },
            include: {
                GenreMovie: {
                    include: {
                        Genre: true
                    }
                },
                MovieActor: {
                    where: {
                        order: {
                            gte: 0
                        }
                    },
                    orderBy: {
                        order: "asc"
                    },
                    take: 5, // limit actors per movie
                    include: {
                        Actor: {
                            include: {
                                MovieActor: {
                                    orderBy: {
                                        order: "asc"
                                    },
                                    where: {
                                        order: {
                                            gte: 0
                                        }
                                    },
                                    take: 3, // limit how many movies per actor
                                    include: {
                                        Movie: {
                                            include: {
                                                GenreMovie: {
                                                    include: {
                                                        Genre: true
                                                    }
                                                },
                                                MovieActor: {
                                                    take: 3, // limit how many actors per nested movie
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
        console.log(JSON.stringify(movie2));

        return NextResponse.json({ movie });
    } catch (error) {
        console.error("🔥 Prisma API error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
