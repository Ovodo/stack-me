import { User } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ArticleItem = ({ article }: { article: User }) => {
  function calculateAge(birthdate: any) {
    // Split the birthdate string into year, month, and day
    const [year, month, day] = birthdate.split("-").map(Number);

    // Get the current date
    const currentDate = new Date();

    // Calculate the difference in years between the current year and the birth year
    let age = currentDate.getFullYear() - year;

    // Adjust the age if the current date hasn't passed the birth month and day yet
    if (
      currentDate.getMonth() < month - 1 ||
      (currentDate.getMonth() === month - 1 && currentDate.getDate() < day)
    ) {
      age--;
    }

    return age;
  }

  const age = calculateAge(article.age);
  return (
    <div className='w-[95%] my-5 relative shadow-sm shadow-appBlue bg-appCream p-5 h-[300px] space-x-10 rounded-sm flex items-center border-black'>
      {/* <Link className='cursor-pointer' href={article.url}> */}
      <div className='relative w-[250px] h-[200px]'>
        <Image
          className='rounded-sm object-cover '
          fill
          alt='article_image'
          src={`/profile/${article?.email}.jpg`}
        />
      </div>
      {/* </Link> */}
      <div className='flex w-full text-black relative space-y-5 items-start flex-col'>
        {/* <Link className='cursor-pointer' href={article.url}> */}
        <h4 className='font-semibold capitalize  text-xl'>{article.name} </h4>
        {/* </Link> */}
        <p className=' self-start'>{`${age} Yrs`}</p>
        <p className=' self-start'>{article.bio}</p>
        <p className='font-semibold'>{`${article.country}, ${article.city}`}</p>
        <p className='font-semibold'>{`${article.number}`}</p>
        <p className='font-semibold'>{`${article.email}`}</p>
      </div>
    </div>
  );
};

export default ArticleItem;
