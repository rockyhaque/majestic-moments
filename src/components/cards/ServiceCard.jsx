"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";

export default function ServiceCard({ service }) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["17.5deg", "-17.5deg"]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-17.5deg", "17.5deg"]
  );

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;
      x.set(xPct);
      y.set(yPct);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full max-w-sm mx-auto bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 rounded-xl shadow-xl overflow-hidden cursor-pointer transition-all duration-300 ease-out hover:scale-105"
    >
      {/* Image Container with fixed aspect ratio */}
      <div className="relative aspect-[4/3] w-full h-auto overflow-hidden">
        <Image
          src={service?.img}
          alt={service?.title}
          fill
          className="transition-transform duration-300 ease-out hover:scale-110 object-cover"
        />
      </div>

      <div className="p-6 relative">
        <motion.div
          animate={isHovered ? { y: -5 } : { y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute -top-6 left-6 bg-gradient-to-r from-purple-900 to-pink-700 text-white text-sm font-bold py-2 px-4 rounded-full shadow-lg"
        >
          {service?.service_id}
        </motion.div>
        <h3 className="text-2xl font-bold text-white mb-2">{service?.title}</h3>
        <p className="text-purple-300 mb-4 font-semibold">{service?.price} BDT</p>

        <Link href={`/services/${service?._id}`}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 hover:from-purple-700 hover:to-pink-700"
          >
            Details
          </motion.button>
        </Link>
      </div>

      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 pointer-events-none"
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
