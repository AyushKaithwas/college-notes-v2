"use client";

import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../apps/web/lib/auth";
import { useSession } from "next-auth/react";
import SignOut from "./sign-out-button";
import { Button } from "./primary-button";
export function Navbar({
  logoSrc,
  logoAlt,
  page,
}: {
  logoSrc: string;
  logoAlt: string;
  page: string;
}): JSX.Element {
  const { data: session } = useSession();
  // console.log(session);
  return (
    <div className="flex h-[8vh] justify-between px-10 py-8 items-center border-b-[1px] border-[#363636]">
      <Link href="/">
        <div className="flex gap-4 items-center">
          <img alt={logoAlt} src={logoSrc} />
          <p className="font-black inline-block hover:scale-110 ease-in-out duration-200">
            COLLEGE NOTES
          </p>
        </div>
      </Link>
      <div className="">
        {session ? (
          <>
            <div className="flex flex-row gap-5 justify-center items-center">
              <button>
                <Link href="/upload-notes">
                  <Image
                    src="/upload-icon.svg"
                    alt="Upload icon"
                    height={20}
                    width={20}
                  />
                </Link>
              </button>
              <SignOut>
                <Image
                  className="rounded-full"
                  src={session?.user?.image || "/user-image-anonymous.svg"}
                  alt="Upload icon"
                  height={25}
                  width={25}
                />
              </SignOut>
            </div>
          </>
        ) : (
          <Link href="/login">
            <Button className="rounded-lg" variant="outline" size="lg">
              Log In
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
