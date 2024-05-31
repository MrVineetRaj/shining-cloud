import React, { useContext, useState } from "react";
import { FcFolder } from "react-icons/fc";

import { FaTrashAlt } from "react-icons/fa";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/Config/firebaseConfig";
import { CloudContext } from "@/context/cloudContext";

import { FaRegStar, FaStar } from "react-icons/fa";

const FolderItem = ({
  folder,
  openFolder,
  showEditOption,
  activeFolderIndex,
  index,
}) => {
  const { updateMessage, update, updateChange, deleteFolder, starMarkFolder } =
    useContext(CloudContext);

  const handleDelete = async (folder) => {
    updateMessage("Deleting Folder...");
    let tempId = folder.id;
    try {
      await deleteDoc(doc(db, "folders", folder.id));
      updateMessage("Folder Deleted Successfully");
      setTimeout(() => {
        updateMessage("");
      }, 3000);

      deleteFolder(tempId);
      updateChange(update + 1);
    } catch (error) {
      updateMessage("Error Deleting Folder");
      console.log("Error removing Folder: ", error);
    }
  };

  const handleStar = async (folder) => {
    try {
      const folderRef = doc(db, "folders", folder.id);
      await updateDoc(folderRef, {
        stared: !folder.stared,
      });

      starMarkFolder(folder.id);
      updateChange(update + 1);

      updateMessage("Folder Added to favorite");
      setTimeout(() => {
        updateMessage("");
      }, 3000);
    } catch (error) {
      console.log("Error updating document: ", error);
    }
  };

  return (
    <>
      <div
        className="  flex sm:flex-col items-center gap-2 p-2  rounded-md  transition-all cursor-pointer w-[100%]"
        onClick={() => {
          openFolder(folder);
        }}
      >
        <FcFolder className="text-[30px] col-span-1  sm:text-[35px] " />
        <span className=" text-sm col-span-2 sm:text-base sm:text-center line-clamp-1 sm:line-clamp-2">
          {folder.name}
        </span>
      </div>
      {showEditOption && activeFolderIndex === index && (
        <span className="flex gap-3 text-lg absolute -top-4 right-1 bg-white p-2 border-2">
          <FaTrashAlt className="text-red-500 cursor-pointer active:scale-125 transition-all" onClick={()=>{handleDelete(folder)}}/>
          
          {folder.stared ? (
            <FaStar
              className="text-yellow-500 cursor-pointer active:scale-125 transition-all"
              onClick={() => {
                handleStar(folder);
              }}
            />
          ) : (
            <FaRegStar
              className="text-yellow-500 cursor-pointer active:scale-125 transition-all"
              onClick={() => {
                handleStar(folder);
              }}
            />
          )}
        </span>
      )}
    </>
  );
};

export default FolderItem;
