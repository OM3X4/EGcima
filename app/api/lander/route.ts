// app/api/test/route.ts
import { PrismaClient } from "@prisma/client";

export async function GET() {
    try {
        const prisma = new PrismaClient();
        const movie = await prisma.movie.findUnique({
            // where: { id: 1316416 }, //siko siko
            // where: { id: 1197989 }, // الحريفة
            where: { id: 202040 }, // البيت بيتي
            // where: { id: 261747 }, // silk kingdom
        });

        return Response.json({ movie });
    } catch (error) {
        console.error("🔥 Prisma API error:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
