"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function LoginButton({
  svgLogo,
  providerName,
}: {
  svgLogo: string;
  providerName: string;
}): JSX.Element {
  const [loading, setLoading] = useState(false);

  return (
    <button
      disabled={loading}
      onClick={() => {
        setLoading(true);
        void signIn("google");
      }}
      type="submit"
      className={`${
        loading
          ? "cursor-not-allowed bg-stone-50 dark:bg-stone-800"
          : "flex justify-center items-center w-12 h-12 p-2 border border-tertiary rounded-lg"
      }`}
    >
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Image
          alt={`${providerName} logo`}
          height={48}
          src={svgLogo}
          width={48}
        />
      )}
    </button>
  );
}
