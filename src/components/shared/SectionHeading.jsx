"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeading({ title, subtitle }) {
  return (
    <div className="text-center py-12">
      <motion.h2
        className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {title}
      </motion.h2>
      <motion.p
        className="text-xl text-gray-600 dark:text-gray-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {subtitle}
      </motion.p>
    </div>
  );
}
