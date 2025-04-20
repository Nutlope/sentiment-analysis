import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import NavLink from "@/app/NavLink";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Together AI - Next Chat",
  description: "Quickstart for Together AI + Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-full flex-col antialiased`}
      >
        <header className="text-sm font-medium">
          <div className="mx-auto flex max-w-6xl gap-4 px-4 py-4">
            <NavLink
              className="text-gray-400 data-[active]:text-gray-900"
              href="/"
            >
              Add a review
            </NavLink>
            <NavLink
              className="text-gray-400 data-[active]:text-gray-900"
              href="/upload"
            >
              Upload a file
            </NavLink>

            <div className="ml-auto">
              <a
                href="https://github.com/samselikoff/together-nextjs-chat"
                className="text-gray-500 hover:text-gray-900"
              >
                <GitHubLogoIcon width="20" height="20" />
              </a>
            </div>
          </div>
        </header>

        <main className="flex grow flex-col">{children}</main>

        <footer className="bg-gray-50 text-sm text-gray-500">
          <div className="mx-auto max-w-6xl px-4 py-6">
            Powered by{" "}
            <Link
              className="font-medium underline underline-offset-2"
              target="_blank"
              href="https://www.together.ai/"
            >
              Together AI
            </Link>
            . View the source on{" "}
            <Link
              href="https://github.com/samselikoff/together-nextjs-chat"
              className="font-medium underline underline-offset-2"
            >
              GitHub
            </Link>
            .
          </div>
        </footer>
      </body>
    </html>
  );
}
