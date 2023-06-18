import React, { useContext } from "react";
import { FaTerminal } from "react-icons/fa";
import { GoBrowser, GoPlay } from "react-icons/go";
import { CodeContext } from "../store/CodeContext";

export default function OutputTabs() {
  const { setCurrentRightTab, currentRightTab, runCode } =
    useContext(CodeContext);

  return (
    <div className="flex justify-between gap-3">
      <button
        onClick={() => runCode()}
        className={`bg-primary text-black my-2 px-3 rounded-lg`}
      >
        <GoPlay className="inline" /> Run
      </button>
      <button
        onClick={() => setCurrentRightTab(0)}
        className={`bg-primary text-black my-2 px-3 rounded-lg  ${
          currentRightTab === 0 ? "bg-yellow-500" : ""
        }`}
      >
        <GoBrowser className="inline" /> Output
      </button>
      <button
        onClick={() => setCurrentRightTab(1)}
        className={`bg-primary text-black my-2 px-3 rounded-lg  ${
          currentRightTab === 1 ? "bg-yellow-500" : ""
        }`}
      >
        <FaTerminal className="inline" /> Console
      </button>
    </div>
  );
}
