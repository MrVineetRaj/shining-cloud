"use client";
import FileList from "@/app/components/File/FileList";
import FolderList from "@/app/components/Folder/FolderList";
import { CloudContext } from "@/context/cloudContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const StarMarked = () => {
  const { data: session } = useSession();
  const router = useRouter();
  if (!session) {
    router.push("/login");
  } else if (session) {
    const folderName = "Favorite";
    
    const { update, files, folders} =
      useContext(CloudContext);
    const [internalFolders, setInternalFolders] = useState([]);
    const [internalFiles, setInternalFiles] = useState([]);

    const getFolders = () => {
      
      let tempInternalFolders = folders.filter(
        (folder) => folder.stared == true
      );
      setInternalFolders(tempInternalFolders);
    };

    const getFiles = async () => {
      let tempInternalFiles = files.filter(
        (file) => file.stared == true
      );

      setInternalFiles(tempInternalFiles);
    };


    useEffect(() => {
        getFolders();
        getFiles();
    }, [session, update]);

    const openFolder = (index, folder) => {
      
      router.push(`/folder/${folder.name}/${folder.id}`);
    };

    return (
      <div className="mx-1 sm:mx-2 mt-4  sm:p-4">
        <h1 className="text-2xl font-bold pb-2 border-b-2 border-b-gray-60">
          {folderName}
        </h1>

        {internalFiles.length == 0 && internalFolders.length == 0 && (
          <p className="font-bold text-xl mt-4 text-gray-600">
            Nothing To show Here
          </p>
        )}
        {internalFolders.length != 0 && (
          <FolderList folderList={internalFolders} />
        )}
        {internalFiles.length != 0 && <FileList fileList={internalFiles} />}
      </div>
    );
  }
};

export default StarMarked;
