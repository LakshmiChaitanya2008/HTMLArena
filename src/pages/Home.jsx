import React, { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { app, auth } from "../lib/firebase";
import { Link } from "react-router-dom";
import { getFirestore, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { CodeContext } from "../store/CodeContext";

export default function Home() {
  const a = useAuthState(auth)[0];
  const { setCurrentArena } = useContext(CodeContext);
  const [value, loading, error] = useCollection(
    collection(getFirestore(app), "projects"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  return (
    <div className="m-10">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Hello, {a?.displayName} 👋</h1>

        <Link to={"/create"}>
          <button className="px-3 py-2 rounded-md bg-primary text-black">
            Create Arena
          </button>
        </Link>
      </div>

      <div>
        {value?.docs
          .filter((doc) => doc.data().userId === a?.uid)
          .map((la) => (
            <div className="max-w-sm space-y-2 my-9 bg-[#4c4e42] shadow-xl p-5 rounded-lg">
              <Link
                to={`/arena/${la.id}`}
                onClick={() => {
                  la.id;
                }}
              >
                <h2 className="text-xl font-bold font-serif  cursor-pointer">
                  {la.data().title}
                </h2>
              </Link>
              <p className="text-gray-400">{la.data().description}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
