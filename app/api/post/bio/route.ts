// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from "@/lib/mongodb";

async function handler(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("StackMe");

    // Extract user data from the request body
    const { email, bio } =await  req.json() ; // Assuming User type has a 'bio' field

    // Update the user's bio where email matches
    const result = await db.collection("users").findOneAndUpdate(
      { email: email }, // Filter to find the user with matching email
      { $set: { bio: bio } }, // Update the 'bio' field
    ); 

    if (result) {
        console.log("User bio updated:", result.value);
    }else{

        return Response.json({ message: "User not found" });
    }
    

    return Response.json({ message: "User bio updated successfully", user: result.value });
  } catch (error) {
    console.error("Error updating user bio:", error);
    return Response.json({ message: "An error occurred while updating user bio" });
  }
}

export { handler as POST};
