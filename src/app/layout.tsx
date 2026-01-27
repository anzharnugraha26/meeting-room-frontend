import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MeetSpace | Modern Meeting Rooms",
  description: "Book your perfect meeting space with real-time availability",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-50 antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <footer className="bg-gray-900 text-white py-8 mt-12">
            <div className="max-w-7xl mx-auto px-4 md:px-8 text-center text-gray-400">
              <p>© {new Date().getFullYear()} MeetSpace. All rights reserved.</p>
              <p className="mt-2 text-sm">Designed for seamless collaboration</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}