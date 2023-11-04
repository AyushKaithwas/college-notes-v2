import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { NoteCard } from "@/components/note-card";
import prisma from "@/lib/prisma";

interface Note {
  id: number;
  userId: string; // this is mapped to "User_id" in your Prisma schema, but in TypeScript, we use the field name as it appears in the Prisma client API
  title: string;
  desc: string | null;
  notesUpvotes: number;
  notesLink: string;
  downloads: number;
  thumbnail: string | null;
  noteSize: number;
  subject: string;
  institution: string;
  fieldOfStudy: string;
  semester: string | null;
  time: Date;
}

// This should match the `User` model in your Prisma schema,
// including the possibility of `null` for `image` and `hashedPassword`.
interface UserWithNotes {
  id: string;
  name: string;
  email: string;
  emailVerified: Date | null;
  numberOfNotes: number;
  image: string | null;
  hashedPassword: string | null;
  accountCreationTime: Date;
  notes: Note[];
}

export default async function Page(): Promise<JSX.Element> {
  const session = await getServerSession(authOptions);

  if (session?.user?.email === null) {
    redirect("/login");
  }

  const userWithNotes: UserWithNotes | null = await prisma.user.findUnique({
    where: { email: session?.user?.email },
    include: {
      notes: true, // This will include the notes for the user
    },
  });

  if (userWithNotes) {
    console.log(userWithNotes);
  } else {
    // Handle the case where no user is found
    console.log("No user found with that email");
  }
  const notesData = userWithNotes?.notes;
  const notes = notesData?.map((noteData) => (
    <NoteCard key={noteData.id} note={noteData} />
  ));

  return (
    <div className="w-[100vw] flex flex-col items-center">
      <div className="flex flex-col w-[70%] min-w-[300px] max-w-[550px] items-left justify-center py-10 text-secondary ">
        <div className="w-full flex flex-row  justify-between ems-center gap-5 border border-tertiary rounded-md p-10">
          <div className="flex flex-row gap-5 items-center">
            <Image
              alt="Upload icon"
              className="hover:scale-110 rounded-full ease-in-out duration-200"
              height={50}
              src={session?.user?.image || "/user-image-anonymous.svg"}
              width={50}
            />
            <h1 className="font-bold text-lg">{session?.user?.name}</h1>
          </div>
          {/* This will be added when ranking logic is added */}
          {/* <div className="flex flex-col items-center">
            <h1 className="font-bold text-lg">0</h1>
            <h1 className="text-secondary text-sm">Rank</h1>
          </div> */}
        </div>
        {notes}
      </div>
    </div>
  );
}
