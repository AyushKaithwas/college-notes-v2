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
    <div className="flex py-4 px-8 justify-between items-center border-b-[1px] border-[#363636]">
      <div className="flex gap-4 items-center">
        <img alt={logoAlt} src={logoSrc} />
        <p className="font-black inline-block">COLLEGE NOTES</p>
      </div>
      <div className="">
        {page === "homepage" ? (
          <button className="border-[1px] bg-transparent py-1 px-5 rounded-lg">
            Log In
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
