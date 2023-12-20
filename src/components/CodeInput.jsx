import React, { useContext } from "react";
import Editor from "@monaco-editor/react";
import { CodeContext } from "../store/CodeContext";
import { SettingsContext } from "../store/SettingsContext";

export default function CodeInput() {
  const { currentFile, handleChange, files } = useContext(CodeContext);
  const { theme } = useContext(SettingsContext);

  console.log(theme)
  return (
    <div className="panel sidebar hover:border-r-2 hover:border-primary p-1">
      <Editor
        height="100vh"
        language={files[currentFile].language}
        defaultValue={files[currentFile].value}
        path={files[currentFile].language}
        options={{
          fontFamily: "PT Mono",
          fontSize: "16px",
        }}
        theme={"vs-" + theme}
        onChange={handleChange}
      />
    </div>
  );
}
