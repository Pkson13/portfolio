"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

const ThemeColorMeta = () => {
  const { theme } = useTheme();

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", theme === "dark" ? "#0d0d0d" : "#ffffff");
    }
  }, [theme]);

  return null;
};

export default ThemeColorMeta;
