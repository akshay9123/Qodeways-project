'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "Blog App",
//   description: "Generated by create next app",
// };

const menus = [
  {
    label:"Home",
    href:"/",
    button:false
  },
  {
    label:"Contact-us",
    href:"/contact",
    button:false
  },
  {
    label:"Login",
    href:"/login",
    button:false
  },
  {
    label:"Signup",
    href:"/signup",
    button:true
  }
]

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Navbar */}
        <nav className="px-6 md:px-[10%] bg-white shadow-lg sticky top-0 left-0 w-full py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Qodeways</h1>

          {/* Hamburger Menu Button (Visible on Mobile) */}
          <button
            className="md:hidden text-3xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            {menus.map((item, index) => (
              <Link
                href={item.href}
                className={`${item.button ? "bg-violet-500 px-6 py-2 rounded text-white" : ""} font-medium`}
                key={index}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-lg absolute top-16 left-0 w-full flex flex-col items-center gap-4 py-4">
            {menus.map((item, index) => (
              <Link
                href={item.href}
                className={`${item.button ? "bg-violet-500 px-6 py-2 rounded text-white" : ""} font-medium`}
                key={index}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}

        {/* Main Content */}
        <section className="px-6 md:px-[10%] py-10">{children}</section>

        {/* Footer */}
        <footer className="bg-gray-950 min-h-[300px] flex items-center justify-center text-white text-lg md:text-3xl text-center p-6">
          This is Footer
        </footer>
      </body>
    </html>
  );
}
