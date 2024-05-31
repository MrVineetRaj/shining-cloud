"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);
  return (
    <div className=" flex items-center justify-center absolute w-[100vw] h-[100vh] top-0 left-0 bg-sky-300">
      <button
        className="bg-blue-500 py-[10px] px-[30px] rounded text-white text-xl font-bold font-sans "
        onClick={() => signIn()}
      >
        Login
      </button>
    </div>
  );
};

export default Page;
