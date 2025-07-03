// app/api/test/route.ts
import {  PrismaClient } from "@prisma/client";
import {NextRequest , NextResponse } from "next/server";


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

        return NextResponse.json({ movie });
    } catch (error) {
        console.error("🔥 Prisma API error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
