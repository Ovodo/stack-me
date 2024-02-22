// "use client";

import { getServerAuthSession } from "@/server/auth";
import { Session, User } from "next-auth";
import { baseUrl } from "@/config";
import Bio from "@/components/Bio";
import axios from "axios";

const getUser = async (email: string) => {
  try {
    const res = await axios.post(`${baseUrl}/api/get/user`, {
      email,
    });
    console.log("sucess", res.data);
    return res.data;
  } catch (error) {
    console.log("error", error);
  }
};

export default async function Home() {
  const session = (await getServerAuthSession()) as Session;

  const user = (await getUser(session?.user.email)) as User;

  return (
    <main className='flex min-h-screen relative  flex-col items-start justify-start p-10'>
      <h4 className='text-xl font-bold self-start'>My Profile</h4>
      <section className='mt-10 flex flex-col h-[80vh] justify-around'>
        <div className='flex'>
          <label htmlFor='name'>Name:</label>
          <input
            readOnly
            id='name'
            className='px-4 capitalize ml-1'
            value={user.name}
          />
        </div>
        <div className='flex'>
          <label htmlFor='email'>Email:</label>
          <input
            readOnly
            id='email'
            className='pl-4  ml-1'
            value={user.email}
          />
        </div>
        <div className='flex'>
          <label htmlFor='address'>Address:</label>
          <input
            readOnly
            id='address'
            className='px-4 capitalize ml-1'
            value={user.address}
          />
        </div>
        <div className='flex'>
          <label htmlFor='city'>City:</label>
          <input
            readOnly
            id='city'
            className='px-4 capitalize ml-1'
            value={user.city}
          />
        </div>
        <div className='flex'>
          <label htmlFor='gender'>Gender:</label>
          <input
            readOnly
            id='gender'
            className='px-4 capitalize ml-1'
            value={user.gender}
          />
        </div>
        <div className='flex'>
          <label htmlFor='number'>Number:</label>
          <input
            readOnly
            id='number'
            className='px-4 capitalize ml-1'
            value={user.number}
          />
        </div>
        <div className='flex'>
          <label htmlFor='number'>Number:</label>
          <input
            readOnly
            id='Birthdate'
            className='px-4  ml-1'
            value={user.age}
          />
        </div>
        <Bio Bio={user.bio as string} email={user.email} />
      </section>
    </main>
  );
}
