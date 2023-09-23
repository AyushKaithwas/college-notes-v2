// import { Card } from "ui";
import Image from "next/image";
import { Navbar } from "ui";
// import styles from "./page.module.css";

export default function Page(): JSX.Element {
  return (
    // <main className={styles.main}>
    <>
      <Navbar
        logoAlt="College Notes Logo"
        logoSrc="/logo-small.png"
        page="homepage"
      />
      <Image
        alt="Picture of the author"
        height={150}
        src="/landing-page-grid-element.svg"
        style={{ position: "absolute", top: "150px", right: "90px" }}
        width={150}
      />
      <main className="flex flex-wrap flex-col p-24 justify-center items-center min-h-[90vh]">
        <div className="group">
          <div className="relative w-48 h-48 left-1/2 top-1/2 transform -translate-x-1/2">
            <h1
              className="font-black text-8xl absolute left-1/2 top-1/2 transform -translate-x-1/2 z-20 cursor-pointer"
              data-text="REVOLUTIONISE"
              style={{
                WebkitTextStrokeWidth: "3px",
                WebkitTextStrokeColor: "white",
                WebkitTextFillColor: "transparent",
              }}
            >
              REVOLUTIONISE
            </h1>
            <Image
              alt="Picture of the author"
              className="group-hover:scale-110 duration-500 ease-in-out cursor-pointer"
              height={150}
              src="/logo.png"
              style={{
                position: "absolute",
                top: "130px",
                right: "20px",
                zIndex: 2,
              }}
              width={150}
            />
            <h1 className="font-black text-8xl absolute left-1/2 top-1/2 transform -translate-x-1/2 z-3">
              REVOLUTIONISE
            </h1>
          </div>

          <h1 className="relative font-black text-8xl my-4 z-20 cursor-pointer">
            NOTES
          </h1>
        </div>
        <p className="text-secondary my-6">
          A very efficient notes sharing platform. Share your notes and earn
          some love from your peers
        </p>
        <div className="flex gap-5 my-4">
          <button
            className="border-[1px] bg-transparent py-1 px-5 rounded-lg text-sm"
            type="submit"
          >
            Share Notes
          </button>
          <button
            className="bg-primary py-1 px-5 rounded-lg text-black text-sm"
            type="submit"
          >
            Search Notes
          </button>
        </div>
        <p className="text-secondary underline mt-20 mb-4 ">Top Contributors</p>
        <div className="flex">
          <div className="flex flex-col items-center px-6">
            <Image
              alt="Picture of the author"
              height={70}
              src="/parrot.jpg"
              style={{ clipPath: "circle()" }}
              width={70}
            />
            <p className="text-xs py-2">Parrot Foo</p>
          </div>
          <div className="flex flex-col items-center  px-6">
            <Image
              alt="Picture of the author"
              height={70}
              src="/parrot.jpg"
              style={{ clipPath: "circle()" }}
              width={70}
            />
            <p className="text-xs py-2">Parrot Foo</p>
          </div>
          <div className="flex flex-col items-center  px-6">
            <Image
              alt="Picture of the author"
              height={70}
              src="/parrot.jpg"
              style={{ clipPath: "circle()" }}
              width={70}
            />
            <p className="text-xs py-2">Parrot Foo</p>
          </div>
        </div>
      </main>
      <Image
        alt="Picture of the author"
        height={200}
        src="/landing-page-grid-element.svg"
        style={{
          position: "absolute",
          bottom: "130px",
          left: "120px",
          WebkitTransform: "scaleX(-1)",
          transform: "scaleX(-1)",
        }}
        width={200}
      />
    </>
  );
}
