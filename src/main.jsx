import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import CodeContextProvider from "./store/CodeContext.jsx";
import ModelContextProvider from "./store/ModelContext.jsx";
import SettingsContextProvider from "./store/SettingsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ModelContextProvider>
    <CodeContextProvider>
      <SettingsContextProvider>
        <App />
      </SettingsContextProvider>
    </CodeContextProvider>
  </ModelContextProvider>
);
