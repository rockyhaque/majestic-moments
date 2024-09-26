"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CosmicPulseButton({ children, onClick, className = '' }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className={`relative overflow-hidden px-8 py-4 rounded-full text-white font-bold text-lg ${className}`}
      style={{
        background: 'linear-gradient(45deg, #3b0764, #4c1d95)',
        boxShadow: '0 0 15px rgba(139, 92, 246, 0.5)',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, rgba(139, 92, 246, 0) 70%)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={isHovered ? { scale: [1, 1.5, 1], opacity: [0, 1, 0] } : { scale: 0, opacity: 0 }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
      >
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={isHovered ? {
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              x: [0, (index % 2 === 0 ? 50 : -50) * Math.cos(index * Math.PI / 3)],
              y: [0, 50 * Math.sin(index * Math.PI / 3)],
            } : {}}
            transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
          />
        ))}
      </motion.div>
      <motion.span
        className="relative z-10 inline-block"
        animate={isHovered ? {
          textShadow: [
            "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #8b5cf6, 0 0 35px #8b5cf6",
            "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #8b5cf6, 0 0 35px #8b5cf6, 0 0 40px #8b5cf6",
          ]
        } : {}}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
