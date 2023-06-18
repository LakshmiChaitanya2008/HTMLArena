import React, { useContext } from "react";
import { FaCss3, FaHtml5, FaJs, FaJsSquare, FaSass } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { CodeContext } from "../store/CodeContext";
export default function CodeTabs() {
  const { setCurrentFile, currentFile, cssFramework, jsFramework } =
    useContext(CodeContext);

  return (
    <div className="flex">
      <button
        className={`bg-primary my-2 mr-1 ml-3 px-3 rounded-lg text-black  ${
          currentFile === "index.html" ? " bg-yellow-500" : ""
        }`}
        onClick={() => setCurrentFile("index.html")}
      >
        <FaHtml5 className="inline" /> HTML
      </button>
      <button
        onClick={() => setCurrentFile("style.css")}
        className={`bg-primary my-2 mx-1 px-3 rounded-lg text-black  ${
          currentFile === "style.css" ? " bg-yellow-500" : ""
        }`}
      >
        {cssFramework === "css" ? (
          <FaCss3 className="inline mr-2" />
        ) : cssFramework === "scss" ? (
          <FaSass className="inline mr-2" />
        ) : cssFramework === "less" ? (
          <FaCss3 className="inline mr-2" />
        ) : (
          ""
        )}
        {cssFramework.toUpperCase()}
      </button>
      <button
        onClick={() => setCurrentFile("script.js")}
        className={`bg-primary my-2 mx-1 px-3 rounded-lg capitalize  text-black  ${
          currentFile === "script.js" ? " bg-yellow-500" : ""
        }`}
      >
        {jsFramework === "javascript" ? (
          <FaJsSquare className="inline mr-2" />
        ) : jsFramework === "typescript" ? (
          <SiTypescript className="inline mr-2" />
        ) : jsFramework === "less" ? (
          <FaJsSquare className="inline mr-2" />
        ) : (
          ""
        )}
        {jsFramework}
      </button>
    </div>
  );
}
