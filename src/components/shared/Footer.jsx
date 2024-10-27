'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const footerRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const parallaxStyle = (depth) => ({
    transform: `translate(${mousePosition.x / depth}px, ${mousePosition.y / depth}px)`
  })

  return (
    <footer ref={footerRef} className="relative bg-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 to-gray-900/50 backdrop-blur-sm"></div>
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Majestic Moments</h3>
            <p className="text-gray-300">Crafting unforgettable experiences with seamless event planning.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-purple-400 transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-purple-400 transition-colors">Our Services</Link></li>
              <li><Link href="/portfolio" className="hover:text-purple-400 transition-colors">Event Portfolio</Link></li>
              <li><Link href="/contact" className="hover:text-purple-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li>123 Event Street, Dhaka, BD</li>
              <li>Phone: +880 1742460399</li>
              <li>Email: info@majesticmoments.com</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-purple-400 transition-colors"><Facebook /></Link>
              <Link href="#" className="hover:text-purple-400 transition-colors"><Twitter /></Link>
              <Link href="#" className="hover:text-purple-400 transition-colors"><Instagram /></Link>
              <Link href="#" className="hover:text-purple-400 transition-colors"><Linkedin /></Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Majestic Moments. All rights reserved.</p>
        </div>
      </div>

      {/* Animated elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute w-64 h-64 rounded-full bg-purple-500 opacity-10 blur-3xl"
          style={{
            ...parallaxStyle(30),
            top: '-10%',
            left: '-5%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute w-96 h-96 rounded-full bg-pink-500 opacity-10 blur-3xl"
          style={{
            ...parallaxStyle(40),
            bottom: '-20%',
            right: '-10%',
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -60, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 pointer-events-none">
        
        <motion.div 
          className="absolute w-16 h-16 text-pink-400"
          style={{...parallaxStyle(25), bottom: '8%', right: '10%'}}
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.46a1 1 0 0 1 1.42-1.42 3 3 0 0 0 4.24 0 1 1 0 0 1 1.42 1.42 5 5 0 0 1-7.08 0zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
          </svg>
        </motion.div>
      </div>
    </footer>
  )
}
