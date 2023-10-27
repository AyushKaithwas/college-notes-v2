/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-redundant-type-constituents -- Official prisma documentation code is throwing eslint error while vercel deployment */

import { PrismaClient } from "database";

const prismaClientSingleton = (): PrismaClient => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma: PrismaClient = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
