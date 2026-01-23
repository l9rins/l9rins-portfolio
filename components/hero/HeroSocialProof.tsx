"use client";

import { motion } from "framer-motion";
import { Star, Users, Code, Award } from "lucide-react";

export function HeroSocialProof() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-6 sm:mt-8 flex items-center justify-center lg:justify-start gap-2 sm:gap-4 flex-wrap sm:flex-nowrap"
    >
      <div className="flex items-center gap-2">
        <div className="flex -space-x-1">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-6 h-6 rounded-full border-2 border-black bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white"
            >
              {i}
            </div>
          ))}
        </div>
        <span className="text-xs sm:text-sm text-white/70">5+ years experience</span>
      </div>

      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className="h-3 w-3 sm:h-4 sm:w-4 fill-amber-400 text-amber-400"
          />
        ))}
        <span className="text-xs sm:text-sm text-white/70 ml-1">Client satisfaction</span>
      </div>
    </motion.div>
  );
}