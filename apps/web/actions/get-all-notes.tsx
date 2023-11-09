"use server";

import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { type Note } from "@/types";
import { authOptions } from "@/lib/auth";

export async function getRecentNotes(
  pageSize: number,
  page: number
): Promise<Note[] | null> {
  const recentNotes = await prisma.note.findMany({
    take: pageSize,
    skip: (page - 1) * pageSize,
    orderBy: {
      // Order by the count of upvotes in the last 7 days
      time: "desc",
    },
  });
  if (!recentNotes) {
    return null;
  }
  return recentNotes;
}

export async function getTrendingNotes(
  pageSize: number,
  page: number
): Promise<Note[] | null> {
  const notesWithMostUpvotes = await prisma.trendingNote.findMany({
    orderBy: {
      time: "desc",
    },
    take: pageSize,
    skip: (page - 1) * pageSize,
  });
  // console.log("notesWithMostUpvotes", notesWithMostUpvotes);
  if (!notesWithMostUpvotes) {
    return null;
  }
  return notesWithMostUpvotes;
}
