"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isThemeLoaded: boolean;
  resolvedTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);
  
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Update URL with current theme
  const updateUrlWithTheme = (newTheme: Theme) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('theme', newTheme);
    
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Load theme from URL parameters or localStorage
  useEffect(() => {
    const urlTheme = searchParams.get('theme') as Theme;
    const savedTheme = localStorage.getItem("theme") as Theme;
    
    let initialTheme: Theme = "system";
    
   
    if (urlTheme && ['light', 'dark', 'system'].includes(urlTheme)) {
      initialTheme = urlTheme;
    } else if (savedTheme) {
      initialTheme = savedTheme;
    }
    
    setThemeState(initialTheme);
    
    // If URL doesn't have theme but we have one, update URL
    if (!urlTheme && savedTheme) {
      updateUrlWithTheme(savedTheme);
    }
    
    setIsThemeLoaded(true);
  }, [searchParams]);

  // Apply theme changes and sync with URL
  useEffect(() => {
    if (!isThemeLoaded) return;

    const root = window.document.documentElement;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    
    let actualTheme: "light" | "dark";
    
    if (theme === "system") {
      actualTheme = systemTheme;
    } else {
      actualTheme = theme;
    }

    setResolvedTheme(actualTheme);

    // Apply theme class immediately
    root.classList.remove("light", "dark");
    root.classList.add(actualTheme);
    
    // Store theme preference in localStorage
    localStorage.setItem("theme", theme);
    
    // Update URL parameter
    updateUrlWithTheme(theme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        const newSystemTheme = mediaQuery.matches ? "dark" : "light";
        setResolvedTheme(newSystemTheme);
        root.classList.remove("light", "dark");
        root.classList.add(newSystemTheme);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, isThemeLoaded]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState(prev => {
      if (prev === "light") return "dark";
      if (prev === "dark") return "system";
      return "light";
    });
  };

  const contextValue: ThemeContextType = {
    theme,
    toggleTheme,
    setTheme,
    isThemeLoaded,
    resolvedTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}