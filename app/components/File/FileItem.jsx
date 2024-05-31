"use client";

import { CloudContext } from "@/context/cloudContext";
import React, { useContext, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { FaRegStar, FaStar } from "react-icons/fa";

import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/Config/firebaseConfig";

const FileItem = ({ file, logo }) => {
  const [showEditOption, setShowEditOption] = useState();
  const { updateMessage, update, updateChange, deleteFile, starMarkFile } =
    useContext(CloudContext);

  const handleDelete = async (file) => {
    updateMessage("Deleting file...");
    let tempId = file.id;
    try {
      await deleteDoc(doc(db, "files", file.id));
      updateMessage("File Deleted Successfully");
      setTimeout(() => {
        updateMessage("");
      }, 3000);

      deleteFile(tempId);
      updateChange(update + 1);
    } catch (error) {
      updateMessage("Error Deleting file");
      console.log("Error removing Folder: ", error);
    }
  };

  const handleStar = async (file) => {
    updateMessage("Adding File to favorite...");
    try {
      const fileRef = doc(db, "files", file.id);
      await updateDoc(fileRef, {
        stared: !file.stared,
      });

      starMarkFile(file.id);
      updateChange(update + 1);

      updateMessage("Folder File to favorite");
      setTimeout(() => {
        updateMessage("");
      }, 3000);
    } catch (error) {
      updateMessage("Error Adding File to favorite");
      console.log("Error updating document: ", error);
    }
  };

  return (
    <div className=" my-1 py-1 px-2  hover:shadow-md transition-all sm:grid flex justify-between  sm:grid-cols-11 items-center rounded-md gap-1 cursor-pointer hover:py-2 relative">
      <div className=" flex items-center gap-4 col-span-3 sm:col-span-6">
        <span className="text-2xl">{logo}</span>
        <a className="line-clamp-1" href={file.image} target="_blank">
          {" "}
          {file.name}
        </a>
      </div>
      <span className="sm:col-span-2 text-xs text-black hidden sm:block">
        {file.size}
      </span>
      <span className="sm:col-span-2 text-xs text-black hidden sm:block">
        {file.date}
      </span>
      <span className="col-span-1 text-xs text-black">
        <BsThreeDotsVertical
          className="hover:bg-gray-200 p-2 text-[30px] rounded-full"
          onClick={() => {
            setShowEditOption(!showEditOption);
          }}
        />
      </span>

      {showEditOption && (
        <span className="flex gap-3 text-lg absolute -top-4 right-1 bg-white p-2 border-2">
          <FaTrashAlt
            className="text-red-500 cursor-pointer active:scale-125 transition-all"
            onClick={() => {
              handleDelete(file);
            }}
          />
          
          {file.stared ? (
            <FaStar
              className="text-yellow-500 cursor-pointer active:scale-125 transition-all"
              onClick={() => {
                handleStar(file);
              }}
            />
          ) : (
            <FaRegStar
              className="text-yellow-500 cursor-pointer active:scale-125 transition-all"
              onClick={() => {
                handleStar(file);
              }}
            />
          )}
        </span>
      )}
    </div>
  );
};

export default FileItem;
