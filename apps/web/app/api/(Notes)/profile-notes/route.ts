/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access -- Official prisma documentation code is throwing eslint error while vercel deployment */

import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const session = await getServerSession(authOptions);
  //   const res = (await req.json()) as Payload;
  console.log(session);
  return NextResponse.json({ Response: "Recieved" }, { status: 200 });
}
