import type { Metadata } from "next";
import { Inter } from "next/font/google"; // 1. Import Inter Font
import "./globals.css";
import NextAuthProvider from "@/components/NextAuthProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Task SaaS",
  description: "Modern Task & Worklog Management SaaS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>

      <body
        className={`${inter.className} bg-[#F8FAFC] text-[#0A2540] antialiased`}
      >
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
