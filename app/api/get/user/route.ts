// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from "@/lib/mongodb";

async function init(request: Request) {
    const email = await request.json()
    console.log(email);
    
  try {
    const client = await clientPromise;
    const db = client.db("StackMe");
    const oneUser =  await db.collection("users").findOne(email)
    console.log("users", oneUser);

    return Response.json(oneUser, { status: 200 });
  } catch (error) {
    console.error("getUsers Error:", error);

    return Response.json(
      { message: "An error occured while fetching users" },
      { status: 500 }
    );
  }
}

export { init as POST };
