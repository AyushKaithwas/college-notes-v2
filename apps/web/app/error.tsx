"use client"; // Error components must be Client Components

import { useEffect } from "react";
import Image from "next/image";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): React.ReactElement {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="w-full max-w-[400px] flex flex-col items-center justify-center text-center border border-primary rounded-2xl mx-2">
        <h1 className="font-black text-[4rem]">ERROR</h1>
        <button
          className="inline-flex w-[90%] items-center justify-center text-black font-bold text-sm py-2 px-5 bg-primary rounded-2xl hover:bg-hover hover:text-white"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
        <Image
          alt="Logo"
          className="my-5"
          height={200}
          priority
          src="/college-notes-book.png"
          width={200}
        />
        <p className="font-semibold text-sm">
          &quot;Anyone who has never made a mistake has never tried anything
          new&quot;
        </p>
        <div className="border border-disabled rounded-full px-2 py-1 m-4">
          <div className="flex border border-disabled rounded-full px-3 justify-center items-center">
            <h1 className="font-bold">ALBERT EINSTEIN</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
