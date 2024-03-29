"use client";
import React from "react";
import useFonts from "@/hooks/useFonts";
import { motion } from "framer-motion";
import { ScaleLoader } from "react-spinners";
import AddButton from "@/components/button/AddButton";

const Loading = () => {
  const { Jim } = useFonts();

  return (
    <main className='flex min-h-screen overflow-hidden relative  bg-gradient-to-b from-gray-800 to-gray-200 flex-col items-center justify-center p-24'>
      <ScaleLoader color='#264653' />
      <motion.h1
        initial={{ x: -1000 }}
        animate={{ x: 0 }}
        transition={{
          duration: 5,
          type: "tween",
          repeat: 5,
          repeatType: "mirror",
        }}
        style={Jim.style}
        className='text-appBlue text-[150px]  leading-[225px]'
      >
        Stack Me
      </motion.h1>
      <div className='animate-pulse absolute top-2 left-2 opacity-50 max-w-max max-h-max bg-white rounded-full'>
        <AddButton path='/' />
      </div>
      <div className='animate-pulse absolute top-2 right-2 opacity-50 max-w-max max-h-max bg-white rounded-full'>
        <AddButton path='/' />
      </div>
      <div className='animate-pulse absolute bottom-2 right-2 opacity-50 max-w-max max-h-max bg-white rounded-full'>
        <AddButton path='/' />
      </div>
      <div className='animate-pulse absolute bottom-2 left-2 opacity-50 max-w-max max-h-max bg-white rounded-full'>
        <AddButton path='/' />
      </div>
    </main>
  );
};

export default Loading;
