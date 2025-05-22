"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setmounted] = useState(false);
  useEffect(() => {
    setmounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <>
      {theme == "light" ? (
        <Moon onClick={() => setTheme("dark")} />
      ) : (
        <Sun onClick={() => setTheme("light")} />
      )}

      {/* <Sun /> */}
    </>
  );
};
