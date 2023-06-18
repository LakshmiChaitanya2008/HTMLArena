import { Dialog } from "@headlessui/react";
import { useContext, useState } from "react";
import { ModelContext } from "../store/ModelContext";
import axios from "axios";
import {
  FaPlusCircle,
  FaPlus,
  FaPlusSquare,
  FaTrash,
  FaTrashAlt,
} from "react-icons/fa";
import { CodeContext } from "../store/CodeContext";
export default function PackagesModel() {
  const { setPackagesOpen, packagesOpen } = useContext(ModelContext);
  const { addPackage, packages, removePackage } = useContext(CodeContext);

  const [input, setInput] = useState("");
  const [packagesAPI, setPackagesAPI] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);

  const searchPackages = async function (e) {
    e.preventDefault();
    const { data } = await axios.get(
      "https://api.cdnjs.com/libraries?search=" + input
    );

    setPackagesAPI(data.results.slice(0, 10));
  };
  return (
    <Dialog
      open={packagesOpen}
      onClose={() => setPackagesOpen(false)}
      className="fixed z-10 inset-0 h-1/2"
    >
      <div className="flex font-mono items-center justify-center h-screen ">
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
        <div className="relative rounded-xl bg-black h-2/3 w-1/2 p-6 overflow-y-auto">
          <Dialog.Panel>
            <Dialog.Title
              className={`inline text-xl mb-4 cursor-pointer ${
                currentTab === 0 ? "underline" : ""
              }`}
              onClick={() => setCurrentTab(0)}
            >
              Packages
            </Dialog.Title>
            <Dialog.Title
              className={`inline text-xl cursor-pointer mb-4 mx-4 ${
                currentTab === 1 ? "underline" : ""
              }`}
              onClick={() => setCurrentTab(1)}
            >
              Active ({packages.length})
            </Dialog.Title>
            <button
              onClick={() => setPackagesOpen(false)}
              className="absolute right-3 top-4 cursor-pointer text-sm"
            >
              ❌
            </button>
            {currentTab === 0 ? (
              <>
                <form onSubmit={searchPackages}>
                  <input
                    type="text"
                    className="w-full py-1 px-3 mt-4 rounded bg-opacity-50 bg-gray-600"
                    placeholder="Search by name or paste URL"
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      searchPackages();
                    }}
                  />
                </form>

                <div>
                  {packagesAPI.map((p) => (
                    <div
                      key={p.name}
                      className="p-2 border flex justify-between border-gray-600 rounded-lg my-3"
                    >
                      <span>{p.name}</span>
                      <button onClick={() => addPackage(p)}>
                        <FaPlus className="text-white text-2xl" />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div>
                <div className="p-2 border   border-gray-600 rounded-lg my-3">
                  {packages.map((p) => (
                    <div key={p.name} className="justify-between flex">
                      <span>{p.name}</span>
                      <button onClick={() => removePackage(p)}>
                        <FaTrashAlt className="text-red-600 text-base" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
