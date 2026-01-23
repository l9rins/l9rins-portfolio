"use client";

import { motion } from "framer-motion";

export function HeroDescription() {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="text-base sm:text-lg lg:text-xl text-white/70 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0"
    >
      Design Engineer & Full-Stack Developer crafting innovative digital experiences.
      Passionate about creating seamless user experiences and pushing the boundaries of web technology.
    </motion.p>
  );
}