import { connectDB } from "@/lib/connectDB";

export const GET = async (request, {params}) => {
  const db = await connectDB();
  const bookingCollection = db.collection("bookings");
  try {
    const myBookings = await bookingCollection.find({email: params?.email}).toArray();
    return Response.json({ myBookings });
  } catch (error) {
    console.log(error);
  }
};

