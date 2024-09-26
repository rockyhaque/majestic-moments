"use client";

import { useState, useEffect, useRef } from "react";
import AnimatedGlassButton from "../shared/AnimatedGlassButton";
import CosmicPulseButton from "../shared/CosmicPulseButton";
import { CheckCircle } from "lucide-react";

export default function HeroSection() {
  const [activeImage, setActiveImage] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % 3); // Assuming 3 images previously
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const parallaxStyle = (depth) => ({
    transform: `translate(${mousePosition.x / depth}px, ${
      mousePosition.y / depth
    }px)`,
  });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gray-900 text-white"
    >
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
            <h1 className=" text-2xl font-bold">Majestic Moments</h1>
          <h1 className="mb-4 text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
 
            <span className="block mt-2 text-purple-400 animate-pulse">
              Your Premier Event Booking Service
            </span>
          </h1>
          <p className="mt-6 text-xl sm:text-2xl md:text-3xl font-light">
            Crafting Unforgettable Experiences with Seamless Event Planning
          </p>
           {/* Bullet points with icons */}
           <ul className="mt-8 flex justify-center items-center gap-6">
            <li className="flex justify-center items-center">
              <CheckCircle className="w-6 h-6 text-purple-400 mr-2" />
              <span>Expert Event Planning</span>
            </li>
            <li className="flex justify-center items-center">
              <CheckCircle className="w-6 h-6 text-purple-400 mr-2" />
              <span>Customized Packages</span>
            </li>
            <li className="flex justify-center items-center">
              <CheckCircle className="w-6 h-6 text-purple-400 mr-2" />
              <span>24/7 Support</span>
            </li>
          </ul>
          <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <AnimatedGlassButton>Book Now!</AnimatedGlassButton>
            <button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 hover:border border-white text-white hover:rounded-full hover:text-gray-300 transition-colors duration-300"
            >
              Our Services
            </button>
          </div>
        </div>
      </div>

      {/* Animated elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-64 h-64 rounded-full bg-purple-500 opacity-10 blur-3xl"
          style={{
            ...parallaxStyle(20),
            top: "10%",
            left: "5%",
            animation: "pulse 8s infinite alternate",
          }}
        />
        <div
          className="absolute w-96 h-96 rounded-full bg-pink-500 opacity-10 blur-3xl"
          style={{
            ...parallaxStyle(30),
            bottom: "5%",
            right: "10%",
            animation: "pulse 12s infinite alternate-reverse",
          }}
        />
        <div
          className="absolute w-48 h-48 rounded-full bg-indigo-500 opacity-10 blur-3xl"
          style={{
            ...parallaxStyle(25),
            top: "40%",
            right: "25%",
            animation: "pulse 10s infinite alternate",
          }}
        />
      </div>
    </section>
  );
}
