"use client";
import React, { useContext, useRef, useState } from "react";
import { FcFolder } from "react-icons/fc";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/Config/firebaseConfig";
import { useSession } from "next-auth/react";

import { CloudContext } from "@/context/cloudContext";

const CreateFolder = () => {
  const { data: session } = useSession();

  const folderNameRef = useRef();

  const [folderName, setFolderName] = useState("");
  
  
  const {  updateMessage ,parentFolderId,update, updateChange,updateFolders} = useContext(CloudContext);

  const onCreate = async (event) => {
    updateMessage("Creating Folder...");
    const docId = Date.now().toString();
    try {
      const newDoc = {
        name: folderName,
        createdBy: session.user.email,
        id: docId,
        parentId: parentFolderId,
        stared:false,
      };
      await setDoc(doc(db, "folders", docId), newDoc);

      updateFolders(newDoc);
      updateMessage(`Folder is created!`);
      setTimeout(() => {
        updateMessage("");
      }, 3000);
      
      updateChange(update + 1);
    } catch (e) {
      updateMessage("Error creating folder");
      console.error("Error adding document: ", e);
    }
    setFolderName("");
    folderNameRef.current.value = "";
  };

  return (
    <div>
      <dialog
        id="my_modal_2"
        className="bg-white rounded-3xl shadow-2xl shadow-gray-600"
      >
        <form
          method="dialog"
          className="modal-backdrop p-6 flex flex-col items-center "
        >
          <legend>
            <FcFolder className="text-[100px]" />
          </legend>
          <input
            type="text"
            placeholder="Folder Name"
            className="py-2 px-4 border-2 outline-none my-4 bg-transparent text-black"
            onChange={(event) => {
              setFolderName(event.target.value);
            }}
            ref={folderNameRef}
          />
          <div className="flex justify-around gap-4">
            <button
              onClick={() => onCreate()}
              className="bg-blue-500 text-white font-bold py-2 px-6 rounded-md"
            >
              Create
            </button>
            <button className="bg-red-500 text-white font-bold py-2 px-6 rounded-md">
              close
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default CreateFolder;
