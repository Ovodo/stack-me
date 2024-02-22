"use client";

import { TwitterLogoIcon } from "@radix-ui/react-icons";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function Login() {
  async function clientLogin() {
    try {
      await signIn("affinidi", {
        callbackUrl: "http://localhost:3000",
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <main className='flex min-h-screen  flex-col items-center space-y-14 justify-center md:justify-between md:p-24'>
      <p className='text-[80px] whitespace-nowrap md:text-[120px] text-appBlue'>
        Stack Me
      </p>
      <p className='text-[20px] relative bottom-20 whitespace-nowrap md:text-[25px] text-appBlue'>
        Find your soulmate
      </p>
      <div className=' w-[75vw] md:w-[60vw] relative flex flex-col justify-center items-center rounded-t-sm h-[160px] md:bg-slate-900'>
        <p className='md:animate-bounce hidden md:flex absolute self-center top-12 md:top-5  text-2xl text-white text-center'>
          Click below to login
        </p>
        <Image
          src={"/affinidi.jpg"}
          className='absolute right-5 top-2 '
          alt='affinidi'
          width={20}
          height={20}
        />
        <button
          // onClick={async () => await getServerSession(authOptions)}
          onClick={clientLogin}
          className='font-semibold shadow-sm hover:bg-appRed hover:text-green-950 shadow-appBlue active:opacity-40 active:scale-105 duration-100 px-7 py-3 max-w-max rounded-md text-appBlue tracking-wider  bg-appOrange relative top-9 md:top- text-2xl'
        >
          Login
        </button>
      </div>
    </main>
  );
}
