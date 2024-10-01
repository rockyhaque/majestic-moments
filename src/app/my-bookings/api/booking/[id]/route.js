import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";

export const DELETE = async (request, { params }) => {
  const db = await connectDB();
  const bookingCollection = db.collection("bookings");
  try {
    const res = await bookingCollection.deleteOne({
      _id: new ObjectId(params?.id),
    });
    return Response.json({
      message: "Booking Deleted Successfully!",
      response: res,
    });
  } catch (error) {
    return Response.json({ message: "Booking Deleted Failed!" });
  }
};

export const PATCH = async (request, { params }) => {
  const updatedDoc = await request.json();
  const db = await connectDB();
  const bookingCollection = db.collection("bookings");
  try {
    const res = await bookingCollection.updateOne(
      { _id: new ObjectId(params?.id) },
      {
        $set: {
          ...updatedDoc,
        },
      },
      {
        upset: true,
      }
    );
    return Response.json({
      message: "Booking Updated Successfully!",
      response: res,
    });
  } catch (error) {
    return Response.json({ message: "Booking Updated Failed!" });
  }
};

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const bookingCollection = db.collection("bookings");
  try {
    const res = await bookingCollection.findOne({
      _id: new ObjectId(params?.id),
    });
    return Response.json({ message: "Booking Found", response: res });
  } catch (error) {
    return Response.json({ message: "Booking Not Found" });
  }
};
