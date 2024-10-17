import  { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./Providers/ThemeProvider.jsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SkyCast",
  description: "A weather app built with Next.js and TailwindCSS",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
    <head>
    <link rel="icon" sizes="16x16" href="/favicon.ico" />
    <title>SkyCast</title>
    </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
