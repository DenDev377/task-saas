import type { Metadata } from "next";
import { Inter } from "next/font/google"; // 1. Import Inter Font
import "./globals.css";

// 2. Inisialisasi Font Inter
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Task SaaS - Antigravity",
  description: "Modern Task & Worklog Management SaaS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      {/* 3. Terapkan Font Inter, BG Neutral (#F8FAFC), dan Text Color (#0A2540) */}
      <body
        className={`${inter.className} bg-[#F8FAFC] text-[#0A2540] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
