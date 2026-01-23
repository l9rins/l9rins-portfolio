"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroButtons() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex flex-col max-w-[80%] mx-auto sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
    >
      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 h-10 sm:h-12 px-6 sm:px-8 text-sm sm:text-base">
        View My Work
        <ArrowRight className="ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
      </Button>
      <Button
        variant="outline"
        className="border-white/20 text-white hover:bg-white/10 h-10 sm:h-12 px-6 sm:px-8 text-sm sm:text-base"
      >
        <Download className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
        Download Resume
      </Button>
    </motion.div>
  );
}