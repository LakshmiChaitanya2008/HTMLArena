import React, { useState, createContext, useContext } from "react";
import { Hook } from "console-feed";
import { compileString } from "sass";
import less from "less";
import ts from "typescript";
export const CodeContext = createContext();
import useLocalStorageState from "../hooks/useLocalStorageState";

export default function CodeContextProvider({ children }) {
  const [html, setHtml] = useState("");
  const [css, setCSS] = useState("");
  const [js, setJS] = useState("");
  const [logs, setLogs] = useState([]);
  const [iframe, setIframe] = useState(null);
  const [cssFramework, setCssFramework] = useLocalStorageState(
    "cssFramework",
    "css"
  );
  const [jsFramework, setJsFramework] = useLocalStorageState(
    "jSFramework",
    "javascript"
  );
  const [packages, setPackages] = useLocalStorageState("packages", []);

  const [files, setFiles] = useLocalStorageState("files", {
    "script.js": {
      name: "script.js",
      language: jsFramework,
      value: js,
    },
    "style.css": {
      name: "style.css",
      language: cssFramework,
      value: css,
    },
    "index.html": {
      name: "index.html",
      language: "html",
      value: html,
    },
  });

  const [currentFile, setCurrentFile] = useState("index.html");
  const [autoRun, setAutoRun] = useLocalStorageState("autoRun", false);

  const handleChange = function (value) {
    const file = files[currentFile];

    if (file.name === "index.html") {
      setHtml(value);
      setFiles({
        ...files,
        "index.html": {
          name: "index.html",
          language: "html",
          value,
        },
      });
    }

    if (file.name === "style.css") {
      setCSS(value);
      setFiles({
        ...files,
        "style.css": {
          name: "style.css",
          language: cssFramework,
          value,
        },
      });
    }
    if (file.name === "script.js") {
      setJS(value);
      setFiles({
        ...files,
        "script.js": {
          name: "script.js",
          language: jsFramework,
          value,
        },
      });
    }
  };

  const runCode = function () {
    iframe?.contentWindow?.postMessage(
      { type: "html", value: files["index.html"].value },
      "*"
    );
    if (cssFramework === "scss") {
      try {
        const cssCode = compileString(files["style.css"].value).css;
        {
          iframe?.contentWindow?.postMessage(
            { type: "css", value: cssCode },
            "*"
          );
        }
      } catch {
        iframe?.contentWindow?.postMessage(
          { type: "css", value: files["style.css"].value },
          "*"
        );
      }
    } else if (cssFramework === "less") {
      less.render(files["style.css"].value, (error, result) => {
        if (error) {
          iframe?.contentWindow?.postMessage(
            { type: "css", value: files["style.css"].value },
            "*"
          );
        } else {
          iframe?.contentWindow?.postMessage(
            { type: "css", value: result.css },
            "*"
          );
        }
      });
    } else {
      iframe?.contentWindow?.postMessage(
        { type: "css", value: files["style.css"].value },
        "*"
      );
    }

    if (jsFramework === "typescript") {
      const jsCode = ts.transpileModule(
        files["script.js"].value,
        {}
      ).outputText;
      iframe?.contentWindow?.postMessage(
        { type: "javascript", value: jsCode },
        "*"
      );
    } else {
      iframe?.contentWindow?.postMessage(
        { type: "javascript", value: files["script.js"].value },
        "*"
      );
    }

    return Hook(
      iframe.contentWindow.console,
      (log) => setLogs([...logs, log]),
      false
    );
  };
  const [currentRightTab, setCurrentRightTab] = useState(0);

  const addPackage = function (pk) {
    if (!packages.find((p) => p.name === pk.name)) {
      setPackages([...packages, pk]);
    }

    if (pk.latest.endsWith(".js")) {
      const script = iframe.contentWindow.document.createElement("script");
      script.src = pk.latest;
      script.dataset.cdnjs = true;
      iframe.contentWindow.document.body.appendChild(script);
      console.log(iframe.contentWindow.body);
    }
    if (pk.latest.endsWith(".css")) {
      const style = iframe.contentWindow.document.createElement("style");
      style.textContent = `@import url(${pk.latest});`;
      style.dataset.cdnjs = true;

      iframe.contentWindow.document.head.appendChild(style);
    }
  };

  const removePackage = function (pk) {
    setPackages(packages.filter((p) => p.name !== pk.name));

    const document = iframe.contentWindow.document;

    const script = document.querySelector(
      `script[src="${pk.latest}"][data-cdnjs]`
    );

    const style = document.querySelector(
      `style[href="${pk.latest}"][data-cdnjs]`
    );

    if (pk.latest.endsWith(".css")) {
      if (style) document.head.removeChild(style);
    }

    if (pk.latest.endsWith(".js")) {
      if (script) document.head.removeChild(script);
    }
  };

  const getAllPackages = function () {
    if (iframe) {
      iframe.addEventListener("load", () => {
        packages.forEach((pck) => {
          addPackage(pck);
        });
      });
    }
  };

  return (
    <CodeContext.Provider
      value={{
        files,
        setFiles,
        handleChange,
        logs,
        setLogs,
        currentFile,
        setCurrentFile,
        currentRightTab,
        setCurrentRightTab,
        autoRun,
        setAutoRun,
        iframe,
        setIframe,
        runCode,
        cssFramework,
        setCssFramework,
        jsFramework,
        setJsFramework,
        addPackage,
        removePackage,
        getAllPackages,
        packages,
      }}
    >
      {children}
    </CodeContext.Provider>
  );
}
