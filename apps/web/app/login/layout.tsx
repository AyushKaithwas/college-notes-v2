import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "College Notes - Login",
  description: "Login page for College Notes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <>{children}</>;
}
