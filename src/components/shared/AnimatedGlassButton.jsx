"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function AnimatedGlassButton({ children, onClick, className = '' }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      className={`relative overflow-hidden px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 ${className}`}
      style={{
        background: 'rgba(139, 92, 246, 0.2)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.8 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
          opacity: 0,
        }}
        animate={{
          opacity: isHovered ? [0, 1, 0] : 0,
          scale: isHovered ? [0.5, 1.5] : 1,
        }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <motion.span
        className="relative z-10"
        animate={{
          y: isHovered ? [-1, 1] : 0,
        }}
        transition={{ duration: 0.15, repeat: Infinity, repeatType: 'reverse' }}
      >
        {children}
      </motion.span>
    </motion.button>
  )
}
