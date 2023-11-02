import Image from "next/image";
import { getServerSession } from "next-auth";
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
        <div className="w-full border border-tertiary rounded-md p-10">
          <h1>ejl</h1>
          <h1>ejl</h1>
          <h1>ejl</h1>
          <h1>ejl</h1>
          <h1>ejl</h1>
          <h1>ejl</h1>
        </div>
      </div>
    </div>
  );
}
