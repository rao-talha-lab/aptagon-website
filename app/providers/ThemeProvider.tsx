"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [isMounted, setIsMounted] = useState(false);

  const applyTheme = (newTheme: Theme) => {
    const html = document.documentElement;

    // View Transition API support check (Chrome/Edge/Safari)
    // if (document.startViewTransition) {
    //   document.startViewTransition(() => {
    //     if (newTheme === "dark") {
    //       html.classList.add("dark");
    //     } else {
    //       html.classList.remove("dark");
    //     }
    //   });
    // } else {
    //   // Fallback for other browsers
    //   if (newTheme === "dark") {
    //     html.classList.add("dark");
    //   } else {
    //     html.classList.remove("dark");
    //   }
    // }
    try {
      if ("startViewTransition" in document) {
        document.startViewTransition(() => {
          html.classList.toggle("dark", newTheme === "dark");
        });
      } else {
        html.classList.toggle("dark", newTheme === "dark");
      }
    } catch {
      html.classList.toggle("dark", newTheme === "dark");
    }
  };

  useEffect(() => {
    setIsMounted(true);
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = prefersDark ? "dark" : "light";
      setTheme(initialTheme);
      applyTheme(initialTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  // Prevent hydration flash
  if (!isMounted) return <div className="opacity-0">{children}</div>;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="transition-all duration-700 ease-in-out">
         {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) return { theme: "light" as Theme, toggleTheme: () => {} };
  return context;
}