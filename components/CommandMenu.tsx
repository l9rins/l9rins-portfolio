"use client";

import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import {
  Code,
  Copy,
  ExternalLink,
  Github,
  Home,
  Laptop,
  Mail,
  Moon,
  Sun,
  Twitter,
  User,
  Search,
  Briefcase
} from "lucide-react";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  // Toggle with Cmd+K
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      {/* Visual Hint for Users - Enhanced Glassmorphism & Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="fixed bottom-6 right-6 hidden md:flex items-center gap-3 px-4 py-2 bg-zinc-900/60 border border-white/10 rounded-full text-xs text-zinc-400 backdrop-blur-xl hover:bg-zinc-800/80 hover:border-white/20 transition-all cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_25px_rgba(0,0,0,0.4)] group z-50"
        onClick={() => setOpen(true)}
      >
        <span className="font-medium group-hover:text-white transition-colors">Command Menu</span>
        <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
          <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[10px] min-w-[20px] text-center border border-white/5">⌘</kbd>
          <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[10px] min-w-[20px] text-center border border-white/5">K</kbd>
        </div>
      </motion.div>

      {/* The Command Palette Modal */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg relative bg-[#09090b]/90 border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl"
            >
              <Command className="w-full bg-transparent">
                <div className="flex items-center border-b border-white/5 px-4 h-14">
                  <Search className="w-4 h-4 text-zinc-500 mr-3" />
                  <Command.Input
                    placeholder="What do you need?..."
                    className="w-full h-full bg-transparent outline-none text-white placeholder:text-zinc-600 font-medium text-sm"
                  />
                  <div className="ml-2 px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                    ESC
                  </div>
                </div>
                <Command.List className="max-h-[300px] overflow-y-auto p-2 scroll-py-2 custom-scrollbar">
                  <Command.Empty className="py-12 text-center text-sm text-zinc-500 flex flex-col items-center gap-2">
                    <span className="text-2xl text-zinc-700">?</span>
                    No results found.
                  </Command.Empty>

                  <Command.Group heading="Navigation" className="text-[10px] uppercase tracking-wider font-semibold text-zinc-600 px-2 py-2 mb-1">
                    <CommandItem icon={<Home />} label="Home" onSelect={() => runCommand(() => window.scrollTo({ top: 0, behavior: 'smooth' }))} />
                    <CommandItem icon={<Briefcase />} label="Work" onSelect={() => runCommand(() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }))} />
                    <CommandItem icon={<User />} label="About" onSelect={() => runCommand(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }))} />
                    <CommandItem icon={<Code />} label="Services" onSelect={() => runCommand(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }))} />
                    <CommandItem icon={<Mail />} label="Contact" onSelect={() => runCommand(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }))} />
                  </Command.Group>

                  <Command.Group heading="Social" className="text-[10px] uppercase tracking-wider font-semibold text-zinc-600 px-2 py-2 mb-1">
                    <CommandItem icon={<Github />} label="GitHub" onSelect={() => runCommand(() => window.open("https://github.com", "_blank"))} />
                    <CommandItem icon={<Twitter />} label="Twitter" onSelect={() => runCommand(() => window.open("https://twitter.com", "_blank"))} />
                  </Command.Group>

                  <Command.Group heading="Actions" className="text-[10px] uppercase tracking-wider font-semibold text-zinc-600 px-2 py-2 mb-1">
                    <CommandItem
                      icon={<Copy />}
                      label="Copy Portfolio URL"
                      onSelect={() => runCommand(() => {
                        navigator.clipboard.writeText(window.location.href);
                        // Ideally use a toast here
                        alert("URL copied to clipboard");
                      })}
                    />
                    <CommandItem
                      icon={<Mail />}
                      label="Copy Email Address"
                      shortcut="↵"
                      onSelect={() => runCommand(() => {
                        navigator.clipboard.writeText("hello@example.com");
                        // Ideally use a toast here
                        alert("Email copied to clipboard");
                      })}
                    />
                  </Command.Group>
                </Command.List>

                <div className="border-t border-white/5 px-4 py-2 flex items-center justify-between text-[10px] text-zinc-600 font-mono">
                  <div className="flex gap-4">
                    <span className="flex items-center gap-1">
                      <span className="text-zinc-500">↑↓</span> to navigate
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-zinc-500">↵</span> to select
                    </span>
                  </div>
                  <div>
                    Senior Portfolio v2.0
                  </div>
                </div>
              </Command>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function CommandItem({ icon, label, shortcut, onSelect }: any) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-white/5 cursor-pointer transition-all aria-selected:bg-white/10 aria-selected:text-white my-0.5"
    >
      <div className="w-8 h-8 rounded-md bg-white/5 border border-white/5 flex items-center justify-center text-zinc-500 group-hover:text-white group-hover:border-white/10 transition-colors">
        {React.cloneElement(icon, { size: 14 })}
      </div>
      <span className="font-medium">{label}</span>
      {shortcut && <span className="ml-auto text-xs text-zinc-600 font-mono border border-white/5 bg-black/20 px-1.5 py-0.5 rounded">{shortcut}</span>}
    </Command.Item>
  );
}