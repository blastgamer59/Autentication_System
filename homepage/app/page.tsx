"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Header } from "@/components/ui/Header";
import { HeroSection } from "@/components/ui/HeroSection";
import { TechStackSection } from "@/components/ui/TechStackSection";
import { Footer } from "@/components/ui/Footer";

export default function Home() {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("User signed out");
    setIsSigningOut(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "dark bg-gray-900" : "bg-gradient-to-br from-blue-50 via-white to-purple-50"}`}>
      <Header onSignOut={handleSignOut} isSigningOut={isSigningOut} />
      <main className={isDark ? "bg-gray-900" : ""}>
        <HeroSection />
        <TechStackSection />
      </main>
      <Footer />
    </div>
  );
}