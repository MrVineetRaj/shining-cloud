"use client";

import React from "react";

import FileItem from "./FileItem";
import { logos } from "@/utils/data";

const FileList = ({ fileList }) => {
  return (
    <div className="py-4 my-4 px-2   bg-white rounded-lg">
      <h2 className="text-xl font-bold rounded-lg flex items-center justify-between">
        Recent Files{" "}
        <span className="text-sm text-blue-500 cursor-pointer">View All</span>
      </h2>

      <div className="">
        <div className="grid grid-cols-4 sm:grid-cols-11 border-b-2 border-b-gray-400">
          <span className="col-span-2 sm:col-span-6 "> Name</span>
          <span className="sm:col-span-2 hidden sm:block"> Size</span>
          <span className="sm:col-span-2 hidden sm:block"> Date</span>
        </div>
        {fileList.length == 0 && <p>Nothing To show Here</p>}
        {fileList.length != 0 &&
          fileList.map((file, index) => {
            return <FileItem key={index} file={file} logo={logos[file.type]} />;
          })}
      </div>
    </div>
  );
};

export default FileList;
