import React from "react";
import ArticleItem from "@/components/ArticleItem";
import { downloadImage } from "@/helper/functions";
import { getServerAuthSession } from "@/server/auth";
import axios from "axios";
import { User } from "next-auth";
import { baseUrl } from "@/config";

const postUser = async (data: User) => {
  try {
    const res = await axios.post(`${baseUrl}/api/post/user`, data);
    console.log("sucess", res.data);
  } catch (error) {
    console.log("error", error);
  }
};
const allUsers = async () => {
  try {
    const res = await axios.get(`${baseUrl}/api/users`);
    console.log("allUsers", res.data);
    return res.data;
  } catch (error: any) {
    console.log("error", error.response.status);
  }
};

const Page = async () => {
  const session = await getServerAuthSession();
  if (session) {
    postUser(session.user as User);
  }
  const feed = await allUsers();

  downloadImage(session?.user?.picture, `${session?.user?.email}.jpg`);

  return (
    <main className='flex max-h-screen overflow-scroll scrollbar-hide relative  flex-col items-center justify-start px-10 py-5'>
      <section
        id='TOP'
        className='w-full mb-10 border-b mt-10 pb-1 flex border-appBlue justify-around'
      >
        <h4 className='text-2xl text-appBlue font-semibold'>Find Your Match</h4>
      </section>
      <div className='w-full'>
        {feed
          .filter((user: User) => session?.user.gender != user.gender)
          .map((item: any, index: number) => {
            return <ArticleItem key={index.toString()} article={item} />;
          })}
      </div>
    </main>
  );
};

export default Page;
