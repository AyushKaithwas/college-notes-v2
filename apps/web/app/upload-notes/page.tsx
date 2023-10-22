"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function UploadPage(): JSX.Element {
  const { data: session } = useSession();
  if (!session) {
    redirect("/login");
  }
  const [time, setTime] = useState("");
  const [salutation, setSalutation] = useState("");

  useEffect(() => {
    const date = new Date();
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = dayNames[date.getDay()];

    const day = date.getDate();
    let suffix = "th";
    if (day === 1 || (day > 20 && day % 10 === 1)) {
      suffix = "st";
    } else if (day === 2 || (day > 20 && day % 10 === 2)) {
      suffix = "nd";
    } else if (day === 3 || (day > 20 && day % 10 === 3)) {
      suffix = "rd";
    }

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthName = monthNames[date.getMonth()];

    const hours = date.getHours();
    let timeOfDay;
    if (hours < 12) {
      timeOfDay = "Good Morning";
    } else if (hours < 18) {
      timeOfDay = "Good Afternoon";
    } else {
      timeOfDay = "Good Evening";
    }
    setTime(`${dayName}, ${monthName} ${day}${suffix}`);
    setSalutation(timeOfDay);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center py-10 text-secondary">
      <div>
        <h1 className="font-black text-3xl">{time}</h1>
        <p>
          <strong>{salutation}</strong>, {session.user?.name}
        </p>
      </div>
    </div>
  );
}
