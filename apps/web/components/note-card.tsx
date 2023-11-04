import { ArrowBigUp, ArrowDownToLine, MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Note {
  id: number;
  userId: string;
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

export function NoteCard({ note }: { note: Note }): JSX.Element {
  const { title, desc, notesUpvotes, notesLink, thumbnail, time, downloads } =
    note;
  return (
    <div className="w-full border border-tertiary rounded-md p-10 flex flex-row gap-5">
      <Image
        alt="thumbnail"
        className="w-[200px] rounded-[0.5rem]"
        height={100}
        src={thumbnail?.toString() || "/default-thumbnail.png"}
        width={100}
      />
      <div className="flex flex-col flex-grow justify-between w-full ">
        <div className="flex flex-row items-center justify-between">
          <h1 className="font-bold text-lg">{title}</h1>
        </div>
        <p className=" text-xs">
          <strong>Description:</strong> {desc}
        </p>
        <p className=" text-xs">
          <strong>Date:</strong> {time.toLocaleDateString()}
        </p>
        <div className="flex flex-row gap-3 items-center">
          <button className="flex flex-row items-center gap-1">
            <MessageSquare size={20} />
            <p className=" text-xs">123</p>
          </button>
          <button>
            <Link
              className="flex flex-row gap-1 items-center"
              href={notesLink}
              target="_blank"
            >
              <ArrowDownToLine size={20} />
              <p className=" text-xs">{downloads}</p>
            </Link>
          </button>
          <button className="flex flex-row items-center gap-1">
            <ArrowBigUp className="-ml-1" size={25} />
            <p className=" text-xs">{notesUpvotes}</p>
          </button>
        </div>
      </div>
    </div>
  );
}