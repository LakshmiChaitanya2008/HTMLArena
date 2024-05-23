import React, { useState } from "react";
import { auth, firestore } from "../lib/firebase"; // Import your Firebase configuration
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, setDoc } from "firebase/firestore";

export default function CreateArena() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const userId = useAuthState(auth)[0];

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await setDoc(doc(firestore, "projects", title), {
        title,
        description,
        userId: userId?.uid,
        createdAt: new Date(),
      });

      // Clear form fields after submission
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error creating arena:", error);
    }
  };

  return (
    <div>
      <section className="">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl ">
                Create An Arena
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium "
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium"
                  >
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border text-black h-36  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full  bg-primary focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center text-black"
                >
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
