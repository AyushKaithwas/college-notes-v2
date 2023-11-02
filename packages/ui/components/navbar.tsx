"use client";

import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../apps/web/lib/auth";
import { useSession } from "next-auth/react";
import SignOut from "./sign-out-button";
import { Button } from "./primary-button";
import { ProfileButton } from "./profile-button";
export function Navbar({
  logoSrc,
  logoAlt,
}: {
  logoSrc: string;
  logoAlt: string;
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
                    className="hover:scale-125 rounded-md ease-in-out duration-200"
                  />
                </Link>
              </button>
              <ProfileButton />
            </div>
          </>
        ) : (
          <Link href="/login">
            <Button className="rounded-[0.75rem]" variant="outline">
              Log In
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
