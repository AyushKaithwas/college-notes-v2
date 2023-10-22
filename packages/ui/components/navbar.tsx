import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../apps/web/lib/auth";
import SignOut from "./sign-out-button";
export async function Navbar({
  logoSrc,
  logoAlt,
  page,
}: {
  logoSrc: string;
  logoAlt: string;
  page: string;
}): Promise<JSX.Element> {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div className="flex h-[8vh] justify-between px-10 py-8 items-center border-b-[1px] border-[#363636]">
      <Link href="/">
        <div className="flex gap-4 items-center">
          <img alt={logoAlt} src={logoSrc} />
          <p className="font-black inline-block">COLLEGE NOTES</p>
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
          <Link
            className="border-[1px] bg-transparent py-2 px-5 rounded-lg"
            href="/login"
          >
            Log In
          </Link>
        )}
      </div>
    </div>
  );
}
