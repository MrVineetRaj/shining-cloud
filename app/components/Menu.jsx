"use client";

import React, { useContext, useState } from "react";
import { menuItem } from "@/utils/data";
import { useRouter } from "next/navigation";
import { CloudContext } from "@/context/cloudContext";

const Menu = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const { updateMessage } = useContext(CloudContext);
  const handleNavigation = (index) => {
    updateMessage("Redirecting ...");
    setTimeout(() => {
      updateMessage("");
    }, 2000);
    if (index === 0) {
      router.push("/");
    } else if (index === 1) {
      router.push("/folder/root/0");
    } else if (index === 2) {
      router.push("/favorite");
    } else if (index === 3) {
      router.push("/storage");
    }
    setActiveIndex(index);
  };
  return (
    <div className="flex flex-col gap-2 mt-8 ">
      {menuItem.map((item, index) => {
        return (
          <div
            key={index}
            className={`flex items-center justify-center md:justify-start gap-2  border-b-blue-500  hover:border-b-2 rounded  p-2 transition-all active:scale-90 font-bold ${
              index === 3 ? "lg:hidden" : null
            } 
            ${
              activeIndex === index
                ? "bg-orange-500 text-white border-b-2"
                : null
            }`}
            onClick={() => {
              handleNavigation(index);
            }}
          >
            {item.logo}
            <p className="hidden md:block">{item.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
