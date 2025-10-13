import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import Headers from "./_components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "./ConvexClientProvider";
import Footer from "./_components/Footer";

const outfit = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "AI Trip Planner - Plan Your Perfect Journey",
  description: "Create unforgettable journeys with AI-powered trip planning. Discover new destinations and plan your perfect adventure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    < ClerkProvider>
      <html lang="en">
        <body
          className={`${outfit.className} font-sans bg-background text-foreground antialiased`}
        >
          <ConvexClientProvider>
            <div className="min-h-screen flex flex-col">
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
