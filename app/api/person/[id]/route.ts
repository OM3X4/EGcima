import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET(_req: NextRequest, context: any) {
    const { params } = context as { params: { id: string } };
    const id = params.id;
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