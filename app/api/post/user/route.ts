// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from "@/lib/mongodb";
import { User } from 'next-auth';



 async function handler(req: Request,) {
    try {
      const client = await clientPromise;
      const db = client.db("StackMe");

      // Extract user data from the request body
      const userData: User = await req.json()

       // Check if user with the same email already exists
    const existingUser = await db.collection("users").findOne({ email: userData.email });
    if (existingUser) {
      return Response.json({ message: "User already exists" },{status:409});
    }

      // Insert the user into the database
      const result = await db.collection("users").insertOne(userData);

      console.log("User inserted:", result.insertedId);

      return Response.json({ message: "User inserted successfully" },{status:200});
    } catch (error) {
      console.error("Error inserting user:", error);
      return Response.json({ message: "An error occurred while inserting user" },{status:500});
    }
}


export { handler as POST };

