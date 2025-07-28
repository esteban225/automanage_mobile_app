import React, { createContext, useContext, useState } from "react";
import { themes } from "./themes";

export type ThemeName = keyof typeof themes;

const ThemeContext = createContext({
  theme: themes.default,
  setThemeByName: (name: ThemeName) => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeName, setThemeName] = useState<ThemeName>("default");

  const setThemeByName = (name: ThemeName) => {
    setThemeName(name);
  };

  return (
    <ThemeContext.Provider value={{ theme: themes[themeName], setThemeByName }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
