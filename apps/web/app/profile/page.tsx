import Image from "next/image";
import { getServerSession } from "next-auth";
import { MessageSquare, ArrowDownToLine, ArrowBigUp } from "lucide-react";
import { authOptions } from "@/lib/auth";

export default async function Page(): Promise<JSX.Element> {
  const session = await getServerSession(authOptions);

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
        <div className="w-full border border-tertiary rounded-md p-10 flex flex-row gap-5">
          <Image
            alt="thumbnail"
            className="rounded-[0.5rem]"
            height={100}
            src="https://storage.googleapis.com/college-user-resources/e8ee8f90-fec6-4cc1-8b49-fb8a2fc8b82f.png"
            width={100}
          />
          <div className="flex flex-col flex-grow justify-between w-full ">
            <div className="flex flex-row items-center justify-between">
              <h1 className="font-bold">Engineering Mathematics</h1>
              <div className="flex flex-row gap-3 items-center">
                <button>
                  <MessageSquare size={20} />
                </button>
                <button>
                  <ArrowDownToLine size={20} />
                </button>
                <button>
                  <ArrowBigUp className="-ml-1" size={25} />
                </button>
              </div>
            </div>
            <p className=" text-xs">
              <strong>Description:</strong> This is my midsem notes by Pradeep
              sir. Very awesome writing and clean images.Please upvote. very
              very needed. Money. send UPI for full version. Telegram me :-
              http://tel.me/?username=tanish
            </p>
            <p className=" text-xs">
              <strong>Date:</strong> 10th June. 2023
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
