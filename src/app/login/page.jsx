"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import {signIn} from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import SocialSignin from "@/components/shared/SocialSignin";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams()
  const path = searchParams.get('redirect')

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email, password, redirect: true, callbackUrl: path? path : '/'
    })
    if(res.status === 200){
      router.push('/')
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800">
      <div className="w-full max-w-4xl flex rounded-xl shadow-2xl overflow-hidden bg-gray-800 bg-opacity-50 backdrop-blur-lg mt-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 relative hidden md:block"
        >
          <Image
            src="https://i.ibb.co.com/1vvt2cX/evangeline-shaw-nw-LTVwb7-Db-U-unsplash.jpg"
            alt="Majestic flower arrangement"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-8">
            <h1 className="text-4xl font-bold text-white">Majestic Moments</h1>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full md:w-1/2 p-12 flex flex-col justify-center"
        >
          <h2 className="text-3xl font-semibold text-white mb-6">
            Welcome Back
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="text-gray-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500 px-2 py-2 rounded-lg mt-2"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="text-gray-300">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500 px-2 py-2 rounded-lg mt-2"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white mt-4"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                Log In
              </button>
            </motion.div>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>
            {/* social signin component */}
            <SocialSignin />
          </div>
          <p className="mt-8 text-sm text-gray-400 text-center">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-purple-400 hover:text-purple-300"
            >
              Sign Up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
