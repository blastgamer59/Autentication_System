"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Header } from "@/components/ui/Header";
import { HeroSection } from "@/components/ui/HeroSection";
import { TechStackSection } from "@/components/ui/TechStackSection";
import { Footer } from "@/components/ui/Footer";
import { ProgressBar } from "@/components/ui/progress-bar";

export default function Home() {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  
  const { theme, resolvedTheme, isThemeLoaded } = useTheme();
  const isDark = resolvedTheme === "dark";

  const navigateTo = (path: string) => {
    setIsNavigating(true);
    const themeParam = `theme=${theme}`;
    setTimeout(() => {
      window.location.href = `${path}?${themeParam}`;
    }, 500);
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("User signed out");
    
    navigateTo("http://localhost:3000");
  };

  // Show loading until theme is properly loaded
  if (!isThemeLoaded || isNavigating) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}>
        <ProgressBar isLoading={true} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? "dark bg-gray-900" : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
    }`}>
      <ProgressBar isLoading={isNavigating} />
      
      <Header onSignOut={handleSignOut} isSigningOut={isSigningOut} />
      <main className={isDark ? "bg-gray-900" : ""}>
        <HeroSection />
        <TechStackSection />
      </main>
      <Footer />
    </div>
  );
}