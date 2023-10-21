import Link from "next/link";

export function Navbar({
  logoSrc,
  logoAlt,
  page,
}: {
  logoSrc: string;
  logoAlt: string;
  page: string;
}): JSX.Element {
  return (
    <div className="flex h-[8vh] justify-between px-10 py-8 items-center border-b-[1px] border-[#363636]">
      <Link href="/">
        <div className="flex gap-4 items-center">
          <img alt={logoAlt} src={logoSrc} />
          <p className="font-black inline-block">COLLEGE NOTES</p>
        </div>
      </Link>
      <div className="">
        {page === "homepage" ? (
          <Link
            className="border-[1px] bg-transparent py-2 px-5 rounded-lg"
            href="/login"
          >
            Log In
          </Link>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
