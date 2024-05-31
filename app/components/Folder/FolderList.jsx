"use client";
import React, { useContext, useState } from "react";
import FolderItem from "./FolderItem";

import { useRouter } from "next/navigation";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CloudContext } from "@/context/cloudContext";

const FolderList = ({ folderList }) => {
  const [showEditOption, setShowEditOption] = useState(false);
  const [activeFolderIndex, setActiveFolderIndex] = useState(0);
  const router = useRouter();

  const { updateMessage } = useContext(CloudContext);


  const openFolder = (folder) => {
    updateMessage("Redirecting to folder....")
    setTimeout(() => {
      updateMessage("");
    }, 2000);
    router.push(`/folder/${folder.name}/${folder.id}`);
  };

  return (
    <div className="py-4 px-2   bg-white rounded-lg mt-2">
      <h2 className="text-xl font-bold rounded-lg flex items-center justify-between">
        Recent Folders{" "}
        <span className="text-sm text-blue-500 cursor-pointer">View All</span>
      </h2>

      {folderList.length == 0 && <p>Nothing To show Here</p>}

      <div className="grid grid-cols-1  sm:grid-cols-4  lg:grid-cols-5 xl:grid-cols-7 mt-4 sm:gap-4 lg:gap-8  gap-1 justify-center cont-center">
        {folderList.length != 0 &&
          folderList.map((folder, index) => {
            return (
              <div
                key={index}
                className="relative  flex flex-row-reverse items-center justify-between sm:grid sm:grid-cols-1 sm:p-0 hover:shadow-gray-300 hover:shadow-lg sm:hover:scale-105 transition-all sm:border-2 "
              >
                <span className="sm:absolute sm:top-4 sm:right-0 sm:flex cursor-pointer sm:flex-row-reverse ">
                  <BsThreeDotsVertical
                    className=" hover:bg-gray-300 rounded-full text-[25px] p-1 transition-all"
                    onClick={() => {
                      setShowEditOption(!showEditOption);
                      setActiveFolderIndex(index);
                    }}
                  />
                </span>
                <FolderItem
                  folder={folder}
                  openFolder={openFolder}
                  showEditOption={showEditOption}
                  activeFolderIndex={activeFolderIndex}
                  index={index}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default FolderList;
