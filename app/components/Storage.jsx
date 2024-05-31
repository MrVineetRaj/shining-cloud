"use client";

import React, { useContext, useEffect, useState } from "react";
import { logos } from "@/utils/data";
import { useSession } from "next-auth/react";
import { CloudContext } from "@/context/cloudContext";

const Storage = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      return;
    }
  }, [session]);

  const { storageUsed, update } = useContext(CloudContext);

  const {
    totalStorage,
    svgStorage,
    pngStorage,
    jpgStorage,
    gifStorage,
    jpgCount,
    svgCount,
    pngCount,
    gifCount,
  } = storageUsed;

  if (session) {
    return (
      <div className="flex flex-col " key={update}>
        <div className="flex gap-1 border-blue-500  border-2 items-center mb-8 rounded-lg bg-sky-200">
          <div className=" my-2 py-2 px-4  rounded-md ">
            <img
              src={session.user.image}
              w={40}
              h={40}
              className="w-[40px] h-[40px] rounded-full"
              alt=""
            />
          </div>
          <div className=" flex flex-col ">
            <span className="text-sm font-bold">{session.user.name}</span>
            <span className=" text-xs font-bold text-gray-600">
              {session.user.email}
            </span>
          </div>
        </div>
        <p className="flex gap-2 items-end">
          <span className="text-xl font-bold">
            {Number(totalStorage).toFixed(2)} MB
          </span>
          <span> used from </span>
          <span className="text-xl font-bold">50 MB</span>{" "}
        </p>

        <div className="flex bg-gray-300 mt-4 h-2.5 rounded-full overflow-x-hidden">
          <div
            className={`bg-blue-500  h-2.5 `}
            style={{ width: `${Number(gifStorage) * 2}%` }}
          ></div>
          <div
            className={`bg-red-500  h-2.5 `}
            style={{ width: `${Number(pngStorage) * 2}%` }}
          ></div>
          <div
            className={`bg-orange-500 h-2.5 `}
            style={{ width: `${Number(svgStorage) * 2}%` }}
          ></div>
          <div
            className={`bg-green-500 h-2.5 `}
            style={{ width: `${Number(jpgStorage) * 2}%` }}
          ></div>
        </div>

        <div className="flex flex-col mt-8 gap-4">
          <div className="flex gap-4 items-end">
            <span className="text-3xl p-2 rounded-full border-4 border-green-500 mt-2">
              {logos.jpg}
            </span>
            <div className="flex items-end gap-4 border-b-4 pb-2 border-green-500 ">
              <span className="text-2xl font-bold text-black">
                {Number(jpgStorage).toFixed(2)}
              </span>
              <span className="text-base font-bold text-gray-400">
                {jpgCount} files
              </span>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <span className="text-3xl p-2 rounded-full border-4 border-red-500 mt-2">
              {logos.png}
            </span>
            <div className="flex items-end gap-4 border-b-4 pb-2 border-red-500 ">
              <span className="text-2xl font-bold text-black">
                {Number(pngStorage).toFixed(2)}
              </span>
              <span className="text-base font-bold text-gray-400">
                {pngCount} files
              </span>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <span className="text-3xl p-2 rounded-full border-4 border-orange-500 mt-2">
              {logos.svg}
            </span>
            <div className="flex items-end gap-4 border-b-4 pb-2 border-orange-500 ">
              <span className="text-2xl font-bold text-black">
                {Number(svgStorage).toFixed(2)}
              </span>
              <span className="text-base font-bold text-gray-400">
                {svgCount} files
              </span>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <span className="text-3xl p-2 rounded-full border-4 border-blue-500 mt-2">
              {logos.gif}
            </span>
            <div className="flex items-end gap-4 border-b-4 pb-2 border-blue-500 ">
              <span className="text-2xl font-bold text-black">
                {Number(gifStorage).toFixed(2)}
              </span>
              <span className="text-base font-bold text-gray-400">
                {gifCount} files
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Storage;
