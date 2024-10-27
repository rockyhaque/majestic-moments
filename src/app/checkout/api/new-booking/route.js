import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const booking = await request.json();
  const db = await connectDB();
  const bookingCollection = db.collection("bookings");
  try {
    const newBooking = await bookingCollection.insertOne(booking);
    return NextResponse.json(
      { message: "Event Booked Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Event Booking Failed!" }, { status: 400 });
  }
};
