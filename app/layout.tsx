import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
// import { RightClickBlocker } from "@/components/RightClickBlocker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mark Lorenz Barangan - Cloud Security + Full-Stack Engineer",
  description:
    "Cloud security and full-stack engineer based in Cebu, building on AWS, Stellar, and AI/ML. Open to senior roles and high-impact projects.",
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://marklorenzbarangan.vercel.app",
  },
  openGraph: {
    title: "Mark Lorenz Barangan - Cloud Security + Full-Stack Engineer",
    description:
      "Cloud security and full-stack engineer based in Cebu, building on AWS, Stellar, and AI/ML.",
    type: "website",
    url: "https://marklorenzbarangan.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mark Lorenz Barangan - Cloud Security + Full-Stack Engineer",
    description:
      "Cloud security and full-stack engineer based in Cebu, building on AWS, Stellar, and AI/ML.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mark Lorenz Barangan",
              url: "https://marklorenzbarangan.vercel.app",
              jobTitle: "Cloud Security + Full-Stack Engineer",
              sameAs: [
                "https://github.com/l9rins/",
                "https://x.com/realmarquee_dev",
                "https://www.linkedin.com/in/l9rinsishere/",
              ],
            }),
          }}
        />
      </head>
      <body className="bg-black text-white antialiased">
        <ThemeProvider>
          <CustomCursor />
          <SmoothScroll>
            <a
              href="#work"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-lg"
            >
              Skip to content
            </a>
            <main>{children}</main>
          </SmoothScroll>
          {/* <RightClickBlocker /> */}
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
