"use client";

import axios from "axios";
import { useState } from "react";

const Bio = ({ email, Bio }: { email: string; Bio: string }) => {
  const [bio, setBio] = useState("");
  const [mess, setMess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const postBio = async () => {
    setIsLoading(true);

    const data = { email, bio };
    try {
      const res = await axios.post("http://localhost:3000/api/post/bio", data);
      console.log("sucess", res.data);
      setMess("Success!!");
      setTimeout(() => {
        setMess("");
      }, 2000);
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
      setMess("Failed");
      setTimeout(() => {
        setMess("");
      }, 2000);
      setIsLoading(false);
    }
  };
  return (
    <div className='flex'>
      <label htmlFor='bio'>Bio:</label>
      <textarea
        onChange={(e) => {
          setBio(e.target.value);
        }}
        defaultValue={Bio}
        name=''
        id=''
        className='ml-2 border-2 outline-none border-gray-300 p-1'
        cols={50}
        rows={3}
      ></textarea>
      {isLoading ? (
        <button
          onClick={postBio}
          className='bg-gray-500 h-max w-max px-4 py-3 ml-2 hover:bg-gray-300 rounded-md'
        >
          {"Loading"}
        </button>
      ) : (
        <button
          onClick={postBio}
          className='bg-gray-500 h-max w-max px-4 py-3 ml-2 hover:bg-gray-300 rounded-md'
        >
          {mess != "" ? mess : "Update"}
        </button>
      )}
    </div>
  );
};

export default Bio;
