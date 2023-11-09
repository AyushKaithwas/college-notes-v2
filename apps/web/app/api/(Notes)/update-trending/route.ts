import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(): Promise<NextResponse> {
  const currentDate = new Date();
  const sevenDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 7));
  const notesWithMostUpvotes = await prisma.note
    .findMany({
      where: {
        upvotes: {
          some: {
            createdAt: {
              gte: sevenDaysAgo,
            },
          },
        },
      },
      include: {
        _count: {
          select: {
            upvotes: {
              where: {
                createdAt: {
                  gte: sevenDaysAgo,
                },
              },
            },
          },
        },
      },
      orderBy: {
        upvotes: {
          _count: "desc",
        },
      },
    })
    .catch((err) => {
      console.log(err);
      return NextResponse.json(
        { Error: "Unable to filter trending notes" },
        { status: 400 }
      );
    });

  const notesWithMostUpvotesNewSchema = notesWithMostUpvotes.map(
    ({ noOfUpvotes, _count, ...rest }) => ({
      noOfUpvotes: _count.upvotes,
      ...rest,
    })
  );

  const result = await prisma.trendingNote
    .createMany({
      data: notesWithMostUpvotesNewSchema,
    })
    .catch((err) => {
      console.log(err);
      return NextResponse.json(
        { Error: "Unable to update Trending Notes table" },
        { status: 400 }
      );
    });

  // console.log(result);

  return NextResponse.json(
    { Success: "Trending Notes table updated successfully" },
    { status: 200 }
  );
}
