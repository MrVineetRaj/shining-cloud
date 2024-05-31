import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { FaRegStar ,FaRegTrashAlt } from "react-icons/fa";

import { GrStorage } from "react-icons/gr";


import { TbPng,TbJpg,TbSvg,TbGif } from "react-icons/tb"; 

export const menuItem = [
  {
    id: 1,
    name: "Home",
    logo: <IoHomeOutline className="text-xl" />,
  },
  {
    id: 2,
    name: "Folder",
    logo: <AiOutlineFolderOpen className="text-xl" />,
  },
  {
    id: 3,
    name: "Star",
    logo: <FaRegStar className="text-xl" />,
  },
  {
    id: 4,
    name: "Storage",
    logo: <GrStorage className="text-xl" />,
  },
];

export const logos = {
  svg: <TbSvg color="orange" />,
  png: <TbPng color="red" />,
  jpg: <TbJpg color="green"  />,
  gif: <TbGif color="blue" />,
};
