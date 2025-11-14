"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const showNavbar = ["/", "/generate"].includes(pathname);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {showNavbar && (
        <nav className="bg-white w-full mx-auto flex justify-between items-center md:fixed md:top-5  md:rounded-full md:p-5 md:px-7 p-4 shadow-md z-50">
          {/* Left Section - Logo */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link href={"/"}>
                <div className="text-2xl font-bold text-black">FitTree</div>
              
            </Link>

            {/* Hamburger for Mobile */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Middle Links (Desktop) */}
          <ul className="hidden md:flex gap-10 text-black font-semibold">
            <Link href="/"><li className="hover:text-gray-600">Templates</li></Link>
            <Link href="/"><li className="hover:text-gray-600">Marketplace</li></Link>
            <Link href="/"><li className="hover:text-gray-600">Discover</li></Link>
            <Link href="/"><li className="hover:text-gray-600">Pricing</li></Link>
            <Link href="/"><li className="hover:text-gray-600">Learn</li></Link>
          </ul>

          {/* Right Buttons (Desktop) */}
          <div className="hidden md:flex gap-3">
            <button className="login bg-gray-400 px-3 py-2 rounded-lg font-bold">
              Log in
            </button>
            <button className="signup bg-gray-900 text-white font-bold px-3 py-2 rounded-full">
              Sign up 
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="absolute top-16 left-0 w-full bg-white flex flex-col items-center gap-5 py-6 shadow-lg md:hidden animate-slide-down">
              <ul className="flex flex-col justify-center items-center gap-4 text-black font-semibold text-lg">
                <Link href="/"><li onClick={() => setIsOpen(false)}>Templates</li></Link>
                <Link href="/"><li onClick={() => setIsOpen(false)}>Marketplace</li></Link>
                <Link href="/"><li onClick={() => setIsOpen(false)}>Discover</li></Link>
                <Link href="/"><li onClick={() => setIsOpen(false)}>Pricing</li></Link>
                <Link href="/"><li onClick={() => setIsOpen(false)}>Learn</li></Link>
              </ul>
              <div className="flex flex-col gap-3 w-4/5">
                <button className="login bg-gray-400 py-2 rounded-full font-bold w-full">
                  Log in
                </button>
                <button className="signup bg-gray-900 text-white font-bold py-2 rounded-full w-full">
                  Sign up free
                </button>
              </div>
            </div>
          )}
        </nav>
      )}
    </>
  );
};

export default Navbar;
