import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { AllNotes } from "@/components/all-notes";
import { getTrendingNotes } from "@/actions/get-all-notes";

const pageSize = 12;

export default async function Notes(): Promise<JSX.Element> {
  const notesData = await getTrendingNotes(pageSize, 1);
  // console.log("notesData", notesData);

  return (
    <div className="w-[100vw] flex flex-col items-center">
      <AllNotes notes={notesData} />
    </div>
  );
}
