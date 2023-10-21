import type { Metadata } from "next";
import { Navbar } from "ui";

export const metadata: Metadata = {
  title: "College Notes - Login",
  description: "Login page for College Notes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <Navbar
        logoAlt="College notes logo"
        logoSrc="/logo-small.png"
        page="login"
      />
      {children}
    </>
  );
}
