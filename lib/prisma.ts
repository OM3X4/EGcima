import { PrismaClient } from "@prisma/client";

// Create a global object to hold the Prisma instance (only in dev)
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({})

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma