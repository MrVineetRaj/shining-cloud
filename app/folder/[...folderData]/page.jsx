"use client";
import FileList from "@/app/components/File/FileList";
import FolderList from "@/app/components/Folder/FolderList";
import { CloudContext } from "@/context/cloudContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const Page = ({ params }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { updateMessage } = useContext(CloudContext);

  const { update, files, folders, parentFolderId, updateParentFolderId } =
    useContext(CloudContext);

  const folderName = params.folderData[0].split("%20").join(" ");
  const folderId = params.folderData[1];

  const [internalFolders, setInternalFolders] = useState([]);
  const [internalFiles, setInternalFiles] = useState([]);

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  useEffect(() => {
    updateParentFolderId(folderId);
  }, [folderId]);

  useEffect(() => {
    if (session && parentFolderId == folderId) {
      getFolders();
      getFiles();
    }
  }, [session, parentFolderId, update]);

  const getFolders = () => {
    let tempInternalFolders = folders.filter(
      (folder) => folder.parentId == parentFolderId
    );
    setInternalFolders(tempInternalFolders);
  };

  const getFiles = async () => {
    let tempInternalFiles = files.filter(
      (file) => file.parentFolder == parentFolderId
    );

    setInternalFiles(tempInternalFiles);
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
};

export default Page;
