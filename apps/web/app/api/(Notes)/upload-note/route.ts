import { PrismaClient } from "database";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

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
// }
export async function POST(req: NextRequest): Promise<NextResponse> {
  const res = (await req.json()) as Payload;
  console.log(res);
  const data = {
    title: "title1",
    userId: 1,
    notesLink: "https://www.google.com/",
  };

  return NextResponse.json(data, { status: 200 });
}
