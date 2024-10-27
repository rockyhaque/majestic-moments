"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();
  // console.log(session);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/service" },
    { name: "Contact", href: "/contact" },
    { name: "My Bookings", href: "/my-bookings" },
    { name: "Login", href: "/login" },
    { name: "Sign Up", href: "/signup" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="backdrop-blur-md bg-white/30 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0"
            >
              <Link href="/" className="text-2xl font-bold text-gray-800">
                {/* <Image
                  href="./images/logo.png"
                  width={30}
                  height={20}
                  alt="logo"
                /> */}
                <span>Majestic Moments</span>
              </Link>
            </motion.div>
            <div className="hidden md:block">
              <div className="ml-10 flex justify-center items-center space-x-4">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="text-gray-800 hover:bg-white/50 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                {session.data ? (
                  <div className="avatar">
                    <div className=" rounded-full">
                      <Image
                        src={session?.data?.user?.image}
                        alt={session?.data?.user?.name}
                        height={35}
                        width={35}
                      />
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}

                {session?.status === "loading" && (
                  <span className="loading loading-dots loading-xs"></span>
                )}

                {session.data ? (
                  <button
                    onClick={() => signOut()}
                    className="btn btn-sm bg-rose-500 border-0"
                  >
                    LogOut
                  </button>
                ) : (
                  <Link className="btn btn-sm" href="/login">
                    Login{" "}
                  </Link>
                )}
              </div>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-900 hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-800 font-semibold hover:bg-white/50 hover:text-gray-900 block px-3 py-2 rounded-md text-base transition-colors duration-300"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
