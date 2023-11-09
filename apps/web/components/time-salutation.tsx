"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Greetings } from "@/lib/greetings";

export function Salutation(): JSX.Element {
  const { data: session } = useSession();
  let name = "User";
  if (session?.user?.name) {
    name = session.user.name;
  }
  const [time, setTime] = useState("");
  const [salutation, setSalutation] = useState("");

  useEffect(() => {
    const [timeNow, salutationNow]: [string, string] = Greetings();
    setTime(timeNow);
    setSalutation(salutationNow);
  }, []);

  return (
    <div className="pb-5 pl-3 ">
      <h1 className="font-bold text-[2.6rem] py-1">{time}</h1>
      <p className=" text-2xl">
        <strong>{salutation}</strong>, {name}
      </p>
    </div>
  );
}
