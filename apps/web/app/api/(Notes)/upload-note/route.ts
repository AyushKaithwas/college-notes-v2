/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access -- Official prisma documentation code is throwing eslint error while vercel deployment */

import { type NextRequest, NextResponse } from "next/server";
import axios, { type AxiosResponse } from "axios";
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

interface ApiResponse {
  url: string;
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
    thumbnail: "",
  };

  await prisma.note
    .create({
      data: noteDataDb,
    })
    .then(async (note) => {
      console.log("note", note);
      console.log(process.env.PDF_TO_IMG_URL);
      if (process.env.PDF_TO_IMG_URL) {
        console.log("Entered if block");
        // Use the function:
        await makeRequest<ApiResponse>(
          process.env.PDF_TO_IMG_URL,
          noteDataDb.notesLink,
          1
        )
          .then((res3) => {
            console.log(res3);
          })
          .catch((err) => {
            console.log(err);
          });
        // // .then((res3) => {
        // //   console.log("entered ");
        // //   console.log("res3", res3);
        // //   if (res3?.data.url) {
        // //     const thumbnail = res3.data.url;
        // //     console.log("thumbnail", thumbnail);
        // //     prisma.note
        // //       .update({
        // //         where: {
        // //           id: note.id,
        // //         },
        // //         data: {
        // //           thumbnail,
        // //         },
        // //       })
        // //       .catch((err) => {
        // //         console.log(err);
        // //       });
        // //   }
        // //   console.log("Success");
        // // })
        // .catch((err) => {
        //   console.log(err);
        //   console.log("Reached max retries. Giving up.");
        // });
      }
      return NextResponse.json(note.id, { status: 200 });
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

const MAX_RETRIES = 5;

const makeRequest = async <T>(
  url: string,
  pdfUrl: string,
  attempt = 1
): Promise<AxiosResponse<T> | undefined> => {
  try {
    console.log("Entered makeRequest");
    return await axios.post<T>(url, { pdfUrl });
  } catch (err) {
    if (attempt < MAX_RETRIES) {
      console.log(`Attempt ${attempt} failed. Retrying...`);
      return makeRequest(url, pdfUrl, attempt + 1);
    }
    console.log(err);
    return undefined;
  }
};
