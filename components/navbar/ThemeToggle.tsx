"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
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
        <Button asChild variant={"ghost"} className="p-0">
          <Moon
            onClick={() => {
              const event = new Event("darkmode");
              document.body.dispatchEvent(event);
              setTheme("dark");
            }}
            strokeWidth={1}
          />
        </Button>
      ) : (
        <Button asChild variant={"ghost"} className="p-0">
          <Sun
            onClick={() => {
              const event = new Event("lightmode");
              document.body.dispatchEvent(event);
              setTheme("light");
            }}
            strokeWidth={1}
          />
        </Button>
      )}

      {/* <Sun /> */}
    </>
  );
};
