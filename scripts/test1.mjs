import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const movies = await prisma.movie.findMany();
    console.log(movies);
}

main();