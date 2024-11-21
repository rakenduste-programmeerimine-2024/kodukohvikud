"use client";

import React from "react";
import Link from "next/link"; // parem SEO jaoks kuidagi ja mingi next.js-i routimise värk idk lol.

const Navbar = () => {
  return (
    <nav className="bg-transparent p-4">
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold text-red-500">
          <Link href="/">
            <img src="/logo.png" alt="Logo" className="h-16 w-16" />
          </Link>
        </div>

        <div className="flex space-x-6 justify-center flex-1">
          <Link href="/" className="bg-white text-black hover:bg-red-400 hover:text-white py-2 px-4 rounded-md">
            Kodukohvikud
          </Link>
          <Link href="/about" className="bg-white text-black hover:bg-red-400 hover:text-white py-2 px-4 rounded-md">
            Lisa oma kohvik
          </Link>
          <Link href="/services" className="bg-white text-black hover:bg-red-400 hover:text-white py-2 px-4 rounded-md">
            Kontakt
          </Link>
        </div>

        <div className="flex space-x-4">
          <Link href="/signin" className="bg-black text-white-500 hover:bg-red-400 hover:text-white py-2 px-4 rounded-md">
            Sign In
          </Link>
          <Link href="/signup" className="bg-white text-black hover:bg-red-400 hover:text-black py-2 px-4 rounded-md">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
