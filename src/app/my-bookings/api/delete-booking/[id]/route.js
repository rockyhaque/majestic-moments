import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";

export const DELETE = async (request, { params }) => {
  const db = await connectDB();
  const bookingCollection = db.collection("bookings");
  try {
    const res = await bookingCollection.deleteOne({ _id: new ObjectId(params?.id) });
    return Response.json({ message: "Booking Deleted Successfully!", response: res });
  } catch (error) {
    return Response.json({ message: "Booking Deleted Failed!" });
  }
};
