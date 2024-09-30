"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeading({ title }) {
  return (
    <div className="text-center py-12">
      <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>
    </div>
  );
}
