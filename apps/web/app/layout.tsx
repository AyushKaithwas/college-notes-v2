import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import { SessionProvider } from "ui";
import { authOptions } from "@/lib/auth";
import { EdgeStoreProvider } from "@/lib/edgestore";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "College Notes",
  description:
    "A very efficient notes sharing platform. Share your notes and earn some love from your peers",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={inter.className}>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </body>
      </SessionProvider>
    </html>
  );
}
