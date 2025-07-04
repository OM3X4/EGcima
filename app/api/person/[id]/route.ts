import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET(_req: NextRequest, { params }: any) {
    const { id: idString } = await params;
    const id = Number(await idString)

    if(isNaN(id)){
        return new NextResponse("Invalid id", {status: 400})
    }

    try {
        const actor = await prisma.actor.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                MovieActor: {
                    include: {
                        Movie: true
                    }
                },
            }
        })
        return NextResponse.json({ actor });
    } catch (error) {
        console.error("🔥 Prisma API error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, {
            status: 500
        })
    }
}