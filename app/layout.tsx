import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import AuthProvider from "./_components/AuthProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: 'swap',
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
    <html lang="en" className={roboto.variable}>
      <body className="font-sans bg-background text-foreground antialiased">
        <AuthProvider>
          <Provider>
            {children}
          </Provider>
        </AuthProvider>
      </body>
    </html>
  );
}
