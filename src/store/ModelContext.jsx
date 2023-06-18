import React from "react";
import { createContext } from "react";
import { useState } from "react";

export const ModelContext = createContext();

export default function ModelContextProvider({ children }) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [packagesOpen, setPackagesOpen] = useState(false);

  return (
    <ModelContext.Provider
      value={{
        setPackagesOpen,
        packagesOpen,
        settingsOpen,
        setSettingsOpen,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
}
