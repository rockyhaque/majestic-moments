import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateBooking = ({ booking, closeModal, loadData }) => {
  
  const [eventDate, setEventDate] = useState(booking.eventDate || "");
  const [guestCount, setGuestCount] = useState(booking.guestCount || "");
  const [phone, setPhone] = useState(booking.phone || "");
  const [address, setAddress] = useState(booking.address || "");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      eventDate,
      guestCount,
      phone,
      address,
    };

    try {
      // Make the PATCH request
      const response = await axios.patch(
        `http://localhost:3000/my-bookings/api/booking/${booking._id}`,
        updatedData
      );

      if (response.status === 200) {
        toast.success("Booking updated successfully");
        loadData();
        // console.log("Booking updated successfully", response.data);
        closeModal(); 
      }
    } catch (error) {
      toast.error("Something went wrong.");
      // console.error("Error updating booking:", error);
    }
  };

  return (
    <dialog id="update_modal" className="modal">
      <motion.div
        className="modal-box bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl shadow-xl border border-purple-500"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={closeModal}
        >
          ✕
        </button>
        <h3 className="font-bold text-lg text-purple-200 mb-4">
          Update Booking
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-purple-400">Service</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full text-gray-200 backdrop-blur-lg bg-white/10"
              value={booking.serviceTitle}
              readOnly
            />
          </div>
          <div className="flex gap-3">
            <div className="form-control mb-4 w-full">
              <label className="label">
                <span className="label-text text-purple-400">Event Date</span>
              </label>
              <input
                type="date"
                className="input input-bordered w-full text-gray-200 backdrop-blur-lg bg-white/10"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </div>
            <div className="form-control mb-4 w-full">
              <label className="label">
                <span className="label-text text-purple-400">Guest Count</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full text-gray-200 backdrop-blur-lg bg-white/10"
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="form-control mb-4 w-full">
              <label className="label">
                <span className="label-text text-purple-400">Phone</span>
              </label>
              <input
                type="tel"
                className="input input-bordered w-full text-gray-200 backdrop-blur-lg bg-white/10"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-control mb-4 w-full">
              <label className="label">
                <span className="label-text text-purple-400">Address</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full text-gray-200 backdrop-blur-lg bg-white/10"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          <motion.button
            type="submit"
            className="w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Save Changes
            <ChevronRight className="ml-2" size={20} />
          </motion.button>
        </form>
      </motion.div>
    </dialog>
  );
};

export default UpdateBooking;
