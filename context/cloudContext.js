"use client";

import { db } from "@/Config/firebaseConfig";
import Toast from "@/app/components/Toast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";

export const CloudContext = createContext({
  files: [],
  setFiles: () => {},

  folders: [],
  setFolders: () => {},

  update: "",
  setUpdate: () => {},

  parentFolderId: "",
  setParentFolderId: () => {},

  message: "",
  setMessage: () => {},

  storage: {},
  setStorage: () => {},
});

export const CloudProvider = ({ children }) => {
  const { data: session } = useSession();
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [update, setUpdate] = useState("");
  const [parentFolderId, setParentFolderId] = useState("");
  const [message, setMessage] = useState("");
  const [storageUsed, setStorageUsed] = useState({
    totalStorage: 0,
    jpgStorage: 0,
    jpgCount: 0,
    pngStorage: 0,
    pngCount: 0,
    gifStorage: 0,
    gifCount: 0,
    svgStorage: 0,
    svgCount: 0,
  });

  const updateStorageUsed = (dupFiles) => {
    let tempJpgStorage = 0;
    let tempPngStorage = 0;
    let tempSvgStorage = 0;
    let tempGifStorage = 0;

    let tempJpgCount = 0;
    let tempSvgCount = 0;
    let tempPngCount = 0;
    let tempGifCount = 0;

    let tempTotal = 0;
    dupFiles.forEach((file) => {
      if (file.type === "png") {
        tempPngStorage += Number(file.size);
        tempPngCount += 1;
      } else if (file.type === "svg") {
        tempSvgStorage += Number(file.size);
        tempSvgCount += 1;
      } else if (file.type === "gif") {
        tempGifStorage += Number(file.size);
        tempGifCount += 1;
      } else if (file.type === "jpg") {
        tempJpgStorage += Number(file.size);
        tempJpgCount += 1;
      }
    });

     tempTotal =
      (Number(tempGifStorage) + Number(tempJpgStorage) + Number(tempPngStorage) + Number(tempSvgStorage));
    let tempStorageUsed = {
      totalStorage: tempTotal,
      jpgStorage: tempJpgStorage,
      pngStorage: tempPngStorage,
      gifStorage: tempGifStorage,
      svgStorage: tempSvgStorage,
      jpgCount: tempJpgCount,
      svgCount: tempSvgCount,
      pngCount: tempPngCount,
      gifCount: tempGifCount,
    };
    setStorageUsed(tempStorageUsed);
  };

  const getFolders = async () => {
    setFolders([]);
    let fetchedFolders = [];

    console.log("fetching....");
    const q = query(
      collection(db, "folders"),
      where("createdBy", "==", session.user.email)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      fetchedFolders.push(doc.data());
    });
    setFolders(fetchedFolders);
  };

  const getFiles = async () => {
    setFiles([]);
    let fetchedFiles = [];

    const q = query(
      collection(db, "files"),
      where("uploadedBy", "==", session.user.email)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      fetchedFiles.push(doc.data());
    });

    updateStorageUsed(fetchedFiles);
    setFiles(fetchedFiles);
  };

  useEffect(() => {
    if (session) {
      getFolders();
      getFiles();
    }
  }, [session]);

  const updateChange = (newUpdate) => setUpdate(newUpdate);

  const updateParentFolderId = (newParentFolderId) =>
    setParentFolderId(newParentFolderId);

  const updateFolders = (newFolder) => setFolders([...folders, newFolder]);
  const updateFiles = (newFile) => {
    setFiles([...files, newFile]);
    updateStorageUsed(files);
  };
  const deleteFolder = (id) => {
    let tempFolders = folders.filter((folder) => folder.id != id);
    setFolders(tempFolders);
  };
  const deleteFile = (id) => {
    let tempFiles = files.filter((file) => file.id != id);
    updateStorageUsed(tempFiles);
    setFiles(tempFiles);
  };

  const updateMessage = (newMessage) => setMessage(newMessage);

  const starMarkFolder = (id) => {
    let tempFolders = folders.map((folder) => {
      if (folder.id === id) {
        folder.stared = !folder.stared;
      }
      return folder;
    });
    setFolders(tempFolders);
  };

  const starMarkFile = (id) => {
    let tempFiles = files.map((file) => {
      if (file.id === id) {
        file.stared = !file.stared;
      }
      return file;
    });
    setFiles(tempFiles);
  };

  const handleRenameFolder = (id, name) => {
    let tempFolders = folders.map((folder) => {
      if (folder.id === id) {
        folder.name = name;
      }
      return folder;
    });
    setFolders(tempFolders);
  };
  const handleRenameFile = (id, name) => {
    let tempFiles = files.map((file) => {
      if (file.id === id) {
        file.name = name;
      }
      return file;
    });
    setFiles(tempFiles);
  };

  return (
    <CloudContext.Provider
      value={{
        folders,
        files,
        update,
        parentFolderId,
        message,
        storageUsed,
        updateFolders,
        updateFiles,
        deleteFolder,
        deleteFile,
        updateChange,
        updateParentFolderId,
        updateMessage,
        starMarkFolder,
        starMarkFile,
        handleRenameFolder,
        handleRenameFile,
      }}
    >
      {children}

      {message && <Toast msg={message} />}
    </CloudContext.Provider>
  );
};
