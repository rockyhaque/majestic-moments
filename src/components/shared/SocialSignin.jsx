"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SocialSignin = () => {
  const router = useRouter();
  const session = useSession();
  const handleSocialLogin = (provider) => {
    const res = signIn(provider);
  };
  if (session.status === "authenticated") {
    router.push("/");
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <button onClick={() => handleSocialLogin("google")} className="w-full">
        <motion.div
          className="mt-6 w-full"
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-full bg-gray-700 border border-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:shadow-md transition duration-300 flex items-center justify-center">
            <FaGoogle className="mr-2 text-green-400" />
            Continue with Google
          </div>
        </motion.div>
      </button>
      <button onClick={() => handleSocialLogin("github")} className="w-full">
        <motion.div
          className="mt-6 w-full"
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-full bg-gray-700 border border-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:shadow-md transition duration-300 flex items-center justify-center">
            <FaGithub className="mr-2 text-sky-400" />
            Continue with Github
          </div>
        </motion.div>
      </button>
    </div>
  );
};

export default SocialSignin;
