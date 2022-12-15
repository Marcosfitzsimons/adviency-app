import { Great_Vibes } from "@next/font/google";
import { Lato } from "@next/font/google";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  weight: ["300", "400"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  weight: "400",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${greatVibes.variable} ${lato.variable}`}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="font-lato">{children}</body>
    </html>
  );
}
