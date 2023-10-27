/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access -- Official prisma documentation code is throwing eslint error while vercel deployment */

import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// interface Payload {
//   title: string;
// }

// export async function POST(): Promise<NextResponse> {
//   // const res = (await req.json()) as Payload;
//   const data = {
//     title: "title1",
//     userId: 1,
//     notesLink: "https://www.google.com/",
//   };
//   await prisma.note
//     .create({
//       data,
//     })
//     .then((note) => {
//       return NextResponse.json(note.id);
//       // return res.status(201).send(document[0].id);
//     })
//     .catch((err) => {
//       throw err;
//     });
//   return NextResponse.json(data, { status: 200 });

interface Payload {
  title: string;
  description: string;
  institution: string;
  fieldOfStudy: string;
  semester: string;
  subject: string;
  size: number;
  url: string;
  userEmail: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const res = (await req.json()) as Payload;
  const user = await prisma.user.findUnique({
    where: {
      email: res.userEmail,
    },
  });
  if (!user) {
    return NextResponse.json(
      { Error: "User does not exist, login or register" },
      { status: 400 }
    );
  }
  const noteDataDb = {
    userId: user.id,
    title: res.title,
    desc: res.description,
    institution: res.institution,
    fieldOfStudy: res.fieldOfStudy,
    semester: res.semester,
    subject: res.subject,
    noteSize: res.size,
    notesLink: res.url,
  };

  await prisma.note
    .create({
      data: noteDataDb,
    })
    .then((note) => {
      return NextResponse.json(note.id, { status: 200 });
      // return res.status(201).send(document[0].id);
    })
    .catch((err) => {
      console.log(err);
      return NextResponse.json(
        { Error: "Upload failed, try again" },
        { status: 400 }
      );
    });
  return NextResponse.json({ Response: "Recieved" }, { status: 200 });
}
