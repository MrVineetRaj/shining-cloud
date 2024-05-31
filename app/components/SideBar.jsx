"use client";
import { signOut, useSession } from "next-auth/react";

import React from "react";
import { TiFolderAdd, TiCloudStorage } from "react-icons/ti";
import { IoIosAddCircleOutline } from "react-icons/io";
import Menu from "./Menu";
import CreateFolder from "./CreateFolder";
import AddFile from "./AddFile";

import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";

import { HiOutlineLogout } from "react-icons/hi";

const SideBar = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className={` h-[100%]  relative transition-all`}>
        <div className={`logo flex items-center gap-1 sm:gap-2 `}>
          <TiCloudStorage className="text-2xl" />
          <span className={`hidden md:block text-blue-500 text-2xl font-bold`}>
            ShiningCloud
          </span>
        </div>
        <p
          className={` flex items-center gap-4 p-2 text-base font-bold bg-blue-500 rounded text-white md:px-4 mt-4 hover:bg-blue-600 hover:scale-105 transition-all`}
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          <span className="hidden md:block">Add New File</span>{" "}
          <IoIosAddCircleOutline className="text-3xl" />
        </p>
        <p
          className={` flex items-center gap-4 p-2 text-base font-bold bg-sky-400 rounded text-white md:px-4 mt-4 hover:bg-sky-500 hover:scale-105 transition-all`}
          onClick={() => document.getElementById("my_modal_2").showModal()}
        >
          <span className="hidden md:block">New Folder</span>{" "}
          <TiFolderAdd className="text-3xl" />
        </p>

        <Menu />
        <p
          className={` flex items-center gap-4 p-2 text-base font-bold bg-red-500 rounded text-white md:px-4 mt-4 hover:bg-red-600 hover:scale-105 transition-all`}
          onClick={() => signOut()}
        >
          <span className="hidden md:block">Logout</span>{" "}
          <HiOutlineLogout className="text-3xl" />
        </p>
        <AddFile />
        <CreateFolder />
      </div>
    );
  }
};

export default SideBar;
