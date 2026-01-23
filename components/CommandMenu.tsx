"use client";

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
  User
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
      {/* Visual Hint for Users */}
      <div className="fixed bottom-4 right-4 hidden md:flex items-center gap-2 px-3 py-1.5 bg-zinc-900/90 border border-white/10 rounded-lg text-xs text-zinc-500 backdrop-blur-md z-50 pointer-events-none">
        <span>Press</span>
        <kbd className="bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300 font-mono">⌘</kbd>
        <kbd className="bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300 font-mono">K</kbd>
      </div>

      {/* The Command Palette Modal */}
      {open && (
        <div className="fixed inset-0 z-[99] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0A0A0A] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <Command className="w-full bg-transparent">
              <div className="flex items-center border-b border-white/10 px-4">
                <Command.Input
                  placeholder="Type a command or search..."
                  className="w-full h-14 bg-transparent outline-none text-white placeholder:text-zinc-500 font-mono text-sm"
                />
              </div>
              <Command.List className="max-h-[300px] overflow-y-auto p-2 scroll-py-2">
                <Command.Empty className="p-4 text-center text-sm text-zinc-500">
                  No results found.
                </Command.Empty>

                <Command.Group heading="Navigation" className="text-xs font-medium text-zinc-500 px-2 py-1.5 mb-1">
                  <CommandItem icon={<Home />} label="Home" onSelect={() => runCommand(() => router.push("/"))} />
                  <CommandItem icon={<User />} label="About" onSelect={() => runCommand(() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' }))} />
                  <CommandItem icon={<Code />} label="Projects" onSelect={() => runCommand(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }))} />
                </Command.Group>

                <Command.Group heading="Social" className="text-xs font-medium text-zinc-500 px-2 py-1.5 mb-1">
                  <CommandItem icon={<Github />} label="GitHub" onSelect={() => runCommand(() => window.open("https://github.com", "_blank"))} />
                  <CommandItem icon={<Twitter />} label="Twitter" onSelect={() => runCommand(() => window.open("https://twitter.com", "_blank"))} />
                </Command.Group>

                <Command.Group heading="Actions" className="text-xs font-medium text-zinc-500 px-2 py-1.5 mb-1">
                  <CommandItem
                    icon={<Mail />}
                    label="Copy Email"
                    shortcut="↵"
                    onSelect={() => runCommand(() => {
                        navigator.clipboard.writeText("hello@example.com");
                        // Simple feedback
                        const notification = document.createElement('div');
                        notification.textContent = 'Email copied!';
                        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg z-[100]';
                        document.body.appendChild(notification);
                        setTimeout(() => document.body.removeChild(notification), 2000);
                    })}
                  />
                </Command.Group>
              </Command.List>
            </Command>
          </div>
          {/* Overlay click to close */}
          <div className="absolute inset-0 -z-10" onClick={() => setOpen(false)} />
        </div>
      )}
    </>
  );
}

function CommandItem({ icon, label, shortcut, onSelect }: any) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-white/5 cursor-pointer transition-colors aria-selected:bg-white/10 aria-selected:text-white"
    >
      <div className="w-4 h-4">{icon}</div>
      <span>{label}</span>
      {shortcut && <span className="ml-auto text-xs text-zinc-600 font-mono">{shortcut}</span>}
    </Command.Item>
  );
}