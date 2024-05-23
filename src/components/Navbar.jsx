import React, { useContext } from "react";
import { TbBuildingCastle, TbSettings } from "react-icons/tb";
import { VscExtensions } from "react-icons/vsc";
import { ModelContext } from "../store/ModelContext";
import { useSignInWithGithub, useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";

export default function Navbar() {
  const { setSettingsOpen, setPackagesOpen } = useContext(ModelContext);

  return (
    <header className="border-b border-gray-500 mb-1 body-font bg-[#232323]">
      <div className="  flex flex-wrap justify-between p-2 flex-row items-center">
        <a className="flex font-medium items-center text-white mb-0  ml-1">
          <span className="text-xl text-primary">
            <TbBuildingCastle className="inline mb-1 mr-1" />
            <span className=" text-xl">
              <span className="font-bold">HTML</span>Arena
            </span>
          </span>
        </a>

        <div>
          <button
            className="inline-flex text-white items-center border-0 py-1 px-3  rounded text-xl mt-0"
            onClick={() => setSettingsOpen(true)}
          >
            <TbSettings />
          </button>
          <button
            className="inline-flex text-white items-center border-0 py-1 px-3  rounded text-xl mt-0"
            onClick={() => setPackagesOpen(true)}
          >
            <VscExtensions />
          </button>
        </div>
      </div>
    </header>
  );
}
