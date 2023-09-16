import { PrismaClient } from "database";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(): Promise<NextResponse>{
  const users = await prisma.user.findMany()

  return NextResponse.json({users})
}
