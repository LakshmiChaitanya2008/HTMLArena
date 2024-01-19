import React, { useContext, useEffect } from "react";
import { Console } from "console-feed";
import Output from "./components/Output";
import CodeInput from "./components/CodeInput";
import CodeTabs from "./components/CodeTabs";
import { CodeContext } from "./store/CodeContext";
import { PanelGroup, PanelResizeHandle, Panel } from "react-resizable-panels";
import OutputTabs from "./components/OutputTabs";
import Navbar from "./components/Navbar";
import SettingsModel from "./components/SettingsModel";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import "monaco-themes/themes/Monokai Bright.json";
import PackagesModel from "./components/PackagesModel";

const CodePenClone = () => {

  const { logs, currentRightTab, setLogs } = useContext(CodeContext);

  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      console.log(monaco);
      import("monaco-themes/themes/Monokai Bright.json")
        .then((data) => {
          monaco.editor.defineTheme("monokai-bright", data);
        })
        .then((_) => monaco.editor.setTheme("monokai-bright"));

      // monaco.editor.defineTheme("monokai-bright").then(_ => monaco.editor.setMonacoTheme("monokai-bright"));
      monaco.languages.registerCompletionItemProvider("html", {
        triggerCharacters: [">"],
        provideCompletionItems: (model, position) => {
          const codePre = model.getValueInRange({
            startLineNumber: position.lineNumber,
            startColumn: 1,
            endLineNumber: position.lineNumber,
            endColumn: position.column,
          });

          const tag = codePre.match(/.*<(\w+)>$/)?.[1];

          if (!tag) {
            return;
          }

          const word = model.getWordUntilPosition(position);

          return {
            suggestions: [
              {
                label: `</${tag}>`,
                kind: monaco.languages.CompletionItemKind.EnumMember,
                insertText: `</${tag}>`,
                range: {
                  startLineNumber: position.lineNumber,
                  endLineNumber: position.lineNumber,
                  startColumn: word.startColumn,
                  endColumn: word.endColumn,
                },
              },
            ],
          };
        },
      });
    }
  }, [monaco]);

  return (
    <><div className="hidden md:block">
      <Navbar />

      <div className="flex justify-between">
        <CodeTabs />
        <OutputTabs />
      </div>
      <PanelGroup direction="horizontal">
        <Panel minSize={20} defaultSize={50}>
          <CodeInput />
        </Panel>
        <PanelResizeHandle className="text-sm w-[2px] hover:bg-primary flex flex-col justify-center"></PanelResizeHandle>
        <Panel minSize={20} defaultSize={50}>
          <Output />
          <div className={currentRightTab === 0 ? "hidden" : "block"}>
            <button
              className="text-xs float-right mx-2 border-dotted border-black border-2  text-white p-1 rounded-lg sticky right-0"
              onClick={() => setLogs([])}
            >
              Clear Console
            </button>
            <Console
              logs={logs}
              variant="dark"
              styles={{ BASE_FONT_SIZE: "16px", LOG_BORDER: "white" }} />
          </div>
        </Panel>
      </PanelGroup>
      <SettingsModel />
      <PackagesModel />


    </div><h1 className="text-2xl font-bold text-center flex justify-center items-center h-screen">Sorry 😞, The Code Editor does not work on Mobile Devices</h1></>

  );
};

export default CodePenClone;
