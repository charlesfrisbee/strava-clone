import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/NavBar";
import { getAthlete } from "@/lib/strava";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Strava Clone",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getAthlete();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar data={data} />
        {children}
      </body>
    </html>
  );
}
