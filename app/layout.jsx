import { Great_Vibes } from "@next/font/google";
import { Open_Sans } from "@next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--open-sans",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const greatVibes = Great_Vibes({
  variable: "--great-vibes",
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${greatVibes.variable} ${openSans.variable}`}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="font-open-sans">
        <main className="mx-auto py-16 w-[min(95%,800px)] h-full flex items-center justify-center lg:py-24 text-amber-900">
          {children}
        </main>
      </body>
    </html>
  );
}
