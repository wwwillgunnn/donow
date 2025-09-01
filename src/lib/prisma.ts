import { PrismaClient } from "@/generated/prisma"; // <- NOT "@prisma/client"

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error", "warn"], // or "query" while debugging
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
