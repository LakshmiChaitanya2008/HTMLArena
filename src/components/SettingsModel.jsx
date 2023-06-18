import { Dialog } from "@headlessui/react";
import { useContext, Fragment, useState } from "react";
import { ModelContext } from "../store/ModelContext";
import { Switch } from "@headlessui/react";
import { SettingsContext } from "../store/SettingsContext";
import { CodeContext } from "../store/CodeContext";

export default function SettingsModel() {
  const { settingsOpen, setSettingsOpen } = useContext(ModelContext);
  const { setTheme, theme } = useContext(SettingsContext);
  const {
    setAutoRun,
    autoRun,
    setCssFramework,
    cssFramework,
    setFiles,
    files,
    setJsFramework,
    jsFramework,
  } = useContext(CodeContext);
  return (
    <Dialog
      open={settingsOpen}
      onClose={() => setSettingsOpen(false)}
      className="fixed z-10 inset-0 h-1/2"
    >
      <div className="flex items-center justify-center h-screen ">
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
        <div className="relative rounded-xl bg-black h-2/3 w-1/3 p-6">
          <Dialog.Panel>
            <Dialog.Title className="text-xl underline mb-4">
              Settings
            </Dialog.Title>
            <button
              onClick={() => setSettingsOpen(false)}
              className="absolute right-3 top-4 cursor-pointer text-sm"
            >
              ❌
            </button>
            <form>
              <div>
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Editor Theme:
                </label>
                <select
                  onChange={(e) => setTheme(e.target.value)}
                  value={theme}
                  className="bg-gray-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-primary focus:border-primary  w-full p-2.5 focus:outline-none"
                >
                  <option value="dark">Dark </option>
                  <option value="light">Light </option>
                </select>
              </div>
              <div class="flex items-center justify-between w-full px-2 mt-3 rounded">
                <label
                  for="bordered-checkbox-1"
                  class="w-full py-4 text-base font-medium text-white"
                >
                  Auto Run
                </label>
                <input
                  id="bordered-checkbox-1"
                  type="checkbox"
                  checked={autoRun}
                  onChange={(e) => setAutoRun(e.target.checked)}
                  name="bordered-checkbox"
                  class="w-[18px] h-[18px]  text-blue-500  rounded"
                />
              </div>
              <div class="flex items-center justify-between w-full px-2 rounded">
                <label
                  for="bordered-checkbox-1"
                  class="w-full py-4 text-base font-medium text-white"
                >
                  CSS Framework:
                </label>
                <select
                  value={cssFramework}
                  onChange={(e) => {
                    setCssFramework(e.target.value);
                    setFiles({
                      ...files,
                      "style.css": {
                        ...files["style.css"],
                        language: e.target.value,
                      },
                    });
                  }}
                  className="bg-gray-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-primary focus:border-primary w-1/2 p-2.5 focus:outline-none"
                >
                  <option value="css">CSS </option>
                  <option value="scss">SCSS </option>
                  <option value="less">Less </option>
                </select>
              </div>
              <div class="flex items-center justify-between w-full px-2 rounded">
                <label
                  for="bordered-checkbox-1"
                  class="w-full py-4 text-base font-medium text-white"
                >
                  Javascript Framework:
                </label>
                <select
                  onChange={(e) => {
                    setJsFramework(e.target.value);
                    setFiles({
                      ...files,
                      "script.js": {
                        ...files["script.js"],
                        language: e.target.value,
                      },
                    });
                  }}
                  value={jsFramework}
                  className="bg-gray-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-primary focus:border-primary w-1/2 p-2.5 focus:outline-none"
                >
                  <option value="javascript">Vannila </option>
                  <option value="typescript">Typescript</option>
                </select>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
