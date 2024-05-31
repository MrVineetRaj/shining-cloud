"use client"

import { CloudContext } from "@/context/cloudContext";
import React, { useContext } from "react";

const Toast = ({msg}) => {
  const {message} = useContext(CloudContext)
  
  return (
    <div className="toast  ">
      <div className="alert alert-info bg-green-500 border-2 font-bold  border-gray-400 shadow-md rounded-md text-white transition-all">
        <span>{msg}</span>
      </div>
    </div>
  );
};

export default Toast;
