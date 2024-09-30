"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, FilePenLine, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  const session = useSession();
  const loadData = async () => {
    const res = await fetch(
      `http://localhost:3000/my-bookings/api/${session?.data?.user?.email}`
    );
    const data = await res.json();
    console.log(data);
    setBookings(data.myBookings);
  };

  useEffect(() => {
    loadData();
  }, [session]);

  const handleViewBooking = (id) => {
    console.log(`View booking ${id}`);
    // Implement view booking logic here
  };

  const handleCancelBooking = async (id) => {
    const deleted = await fetch(
      `http://localhost:3000/my-bookings/api/delete-booking/${id}`,
      {
        method: "DELETE",
      }
    );

    const result = await deleted.json();

    if (result.response?.deletedCount > 0) {
      toast.success("Booking Deleted Successfully!");
      loadData();
    } else {
      toast.error("Booking Deleted Failed!");
    }
    console.log(deleted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900 text-gray-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className="text-4xl font-bold mb-12 py-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mt-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Bookings
        </motion.h1>

        <motion.div
          className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden border border-purple-500"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-purple-900 bg-opacity-70">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">
                    Booked Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-700">
                {bookings.map((booking) => (
                  <motion.tr
                    key={booking.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-purple-800 hover:bg-opacity-30 transition-colors duration-150 ease-in-out"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-purple-100">
                        {booking?.serviceTitle}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm flex items-center text-purple-200">
                        <Calendar className="mr-2 h-4 w-4 text-purple-400" />
                        {booking?.eventDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm flex items-center text-purple-200">
                        <Clock className="mr-2 h-4 w-4 text-purple-400" />
                        {new Date(booking.bookedTime).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          }
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          booking.status === "Confirmed"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm flex items-center text-purple-200">
                        <span className="mr-2 text-purple-400">BDT</span>
                        {booking?.price}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewBooking(booking._id)}
                        className="text-purple-400 hover:text-purple-300 mr-4 transition-colors duration-150 ease-in-out"
                      >
                        <FilePenLine className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleCancelBooking(booking._id)}
                        className="text-red-400 hover:text-red-300 transition-colors duration-150 ease-in-out"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {bookings.length === 0 && (
          <motion.p
            className="text-center text-purple-300 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            You have no bookings yet.
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
