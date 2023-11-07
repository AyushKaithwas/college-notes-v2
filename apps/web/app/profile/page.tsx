import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { ProfileNotes } from "@/components/profile-notes";
import { getUsersNotes } from "@/actions/get-user-and-notes";

const page = 1;
const pageSize = 12;

export default async function Page(): Promise<JSX.Element> {
  const session = await getServerSession(authOptions);

  if (session?.user?.email === null) {
    redirect("/login");
  }
  const initialNotes = await getUsersNotes(pageSize, 1);

  // const notes = notesData?.map((noteData) => (
  //   <NoteCard key={noteData.id} note={noteData} />
  // ));

  return (
    <div className="w-[100vw] flex flex-col items-center">
      {initialNotes ? (
        <ProfileNotes notes={initialNotes} />
      ) : (
        <div>No Notes Uploaded</div>
      )}
    </div>
  );
}
