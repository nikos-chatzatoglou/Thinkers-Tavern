"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PhilosopherCard from "../components/PhilosopherCard";
const philosophers = [
  {
    id: "socrates",
    name: "Socrates",
    period: "Classical Greece",
    description:
      "Known for the Socratic method and his contributions to ethics.",
    image: "/socrates.webp",
  },
  {
    id: "plato",
    name: "Plato",
    period: "Classical Greece",
    description:
      "Founder of the Academy and author of philosophical works on justice, beauty, and equality.",
    image: "/plato.webp",
  },
  {
    id: "aristotle",
    name: "Aristotle",
    period: "Classical Greece",
    description:
      "Founder of Western philosophy and tutor to Alexander the Great.",
    image: "/aristotle.webp",
  },
];

export default function PhilosophersPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white overflow-hidden'>
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        {mounted && (
          <>
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className='absolute rounded-full bg-white'
                style={{
                  width: Math.random() * 3 + 1,
                  height: Math.random() * 3 + 1,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 1, 0],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </>
        )}
      </div>
      <div className='relative z-10 container mx-auto px-4 py-16'>
        <motion.h1
          className='text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-center'
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Embark on a Journey of Wisdom
        </motion.h1>
        <motion.p
          className='philosophical-quote'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          "The unexamined life is not worth living." - Socrates
        </motion.p>
        <motion.p
          className='text-lg md:text-xl lg:text-2xl text-center mb-12 max-w-3xl mx-auto'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          Choose a philosopher to guide you through the realms of truth and
          enlightenment. Uncover the mysteries of existence and find the meaning
          of life.
        </motion.p>
        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          {philosophers.map((philosopher, index) => (
            <motion.div
              key={philosopher.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2 + index * 0.2 }}
            >
              <PhilosopherCard philosopher={philosopher} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
