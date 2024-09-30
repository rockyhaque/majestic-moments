"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Cake,
} from "lucide-react";
import { getServiceDetails } from "@/services/GetServices";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

// export const metadata = {
//     title: "Checkout",
//     description: "Checkout Page",
//   };

const CheckoutPage = ({ params }) => {
  const { data } = useSession();
  const [service, setService] = useState({});
  const loadService = async () => {
    const details = await getServiceDetails(params.id);
    setService(details?.service);
  };
  const { title, img, price } = service || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBooking = {
        email: data?.user?.email,
        name: data?.user?.name,
        address: e.target.address.value,
        phone: e.target.phone.value,
        eventDate: e.target.eventDate.value,
        guestCount: e.target.guestCount.value,
        specialRequests: e.target.address.value,
        serviceTitle: title,
        price: price,
        img: img,
        status: "Confirmed",
        bookedTime: new Date().toISOString()
    }
    const res = await fetch('http://localhost:3000/checkout/api/new-booking', {
        method: 'POST',
        body: JSON.stringify(newBooking),
        headers: {
            "content-type": "application/json"
        }
    })

    // console.log(res)

    if(res.status === 200){
        toast.success("Event Booked Successfully 🤩")
    } else{
        toast.error("Event Booking Failed 😥")
    }


  };

  useEffect(() => {
    loadService();
  }, [params]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900 text-gray-100 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mt-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Book Your Event
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            className="lg:col-span-2 bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    defaultValue={data?.user?.name}
                    className="w-full px-4 py-2 backdrop-blur-lg bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      defaultValue={data?.user?.email}
                      className="w-full px-4 py-2 backdrop-blur-lg bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 pl-10"
                      readOnly
                    />
                    <Mail
                      className="absolute left-3 top-2.5 text-gray-400"
                      size={20}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-1"
                  >
                    Phone
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-2 backdrop-blur-lg bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 pl-10"
                      required
                    />
                    <Phone
                      className="absolute left-3 top-2.5 text-gray-400"
                      size={20}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium mb-1"
                  >
                    Address
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="address"
                      name="address"
                      className="w-full px-4 py-2 backdrop-blur-lg bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 pl-10"
                      required
                    />
                    <MapPin
                      className="absolute left-3 top-2.5 text-gray-400"
                      size={20}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="eventDate"
                    className="block text-sm font-medium mb-1"
                  >
                    Event Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      defaultValue={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-2 backdrop-blur-lg bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 pl-10"
                    />
                    <Cake
                      className="absolute left-3 top-2.5 text-gray-400"
                      size={20}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="guestCount"
                    className="block text-sm font-medium mb-1"
                  >
                    Number of Guests
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="guestCount"
                      name="guestCount"
                      className="w-full px-4 py-2 backdrop-blur-lg bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 pl-10"
                      required
                    />
                    <Users
                      className="absolute left-3 top-2.5 text-gray-400"
                      size={20}
                    />
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="specialRequests"
                  className="block text-sm font-medium mb-1"
                >
                  Special Requests
                </label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  rows={4}
                  className="w-full px-4 py-2 backdrop-blur-lg bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                ></textarea>
              </div>

              <motion.button
                type="submit"
                className="w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Now
                <ChevronRight className="ml-2" size={20} />
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-gray-900 via-purple-950 to-black rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold mb-4">Service Summary</h2>
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-3xl font-bold text-purple-400">
                  BDT {price}
                </p>
              </div>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center">
                  <Calendar className="mr-2 text-purple-400" />
                  <span>Maximum 24 Hours</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 text-purple-400" />
                  <span>Maximum 2000 people</span>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-semibold mb-4">What&apos;s Next?</h3>
              <p className="text-sm text-gray-400">
                After submitting your booking request, our team will review the
                details and contact you within 24 hours to discuss your event
                further and finalize the arrangements.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
