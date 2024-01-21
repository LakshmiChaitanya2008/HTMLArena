import React from "react";
import { createContext } from "react";
import { useState } from "react";
import useLocalStorageState from "../hooks/useLocalStorageState";
export const SettingsContext = createContext();

export default function SettingsContextProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  return (
    <SettingsContext.Provider value={{ theme, setTheme }}>
      {children}
    </SettingsContext.Provider>
  );
}
