"use client";

import FileList from "./components/File/FileList";
import FolderList from "./components/Folder/FolderList";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { CloudContext } from "@/context/cloudContext";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  const { updateParentFolderId, update, files, folders } =
    useContext(CloudContext);

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    updateParentFolderId("0");
  }, []);

  return (
    <div className=" relative" key={update}>
      <div
        style={{ scrollbarWidth: "none" }}
        className=" h-[90vh] overflow-y-scroll  mx-2 "
      >
        <FolderList folderList={folders} />
        <FileList fileList={files} />
      </div>
    </div>
  );
}
