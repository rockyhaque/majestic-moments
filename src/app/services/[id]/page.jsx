import { getServiceDetails } from "@/services/GetServices";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Details",
  description: "Event Details Page",
};

const ServiceDetailsPage = async ({ params }) => {
  const details = await getServiceDetails(params.id);
  const { _id, title, img, price, description, facility } = details?.service || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl mb-12">
          <Image src={img} alt={title} layout="fill" objectFit="cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold mb-4">Service Details</h2>
            <p className="text-xl mb-6 text-gray-300">{description}</p>

            {/* Map over the facility array */}
            <h3 className="text-2xl font-bold mb-4">Facilities</h3>
            <div className="space-y-6">
              {facility?.map((fac, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-lg p-4 rounded-lg shadow-lg"
                >
                  <div className="relative h-40 mb-4">
                    <Image
                      src={fac.img}
                      alt={fac.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{fac.name}</h4>
                  <p>{fac.details}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1 space-y-8">
            <div className="bg-gradient-to-br from-gray-900 via-purple-950 to-black rounded-xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold mb-4">Pricing</h2>
              <p className="text-4xl font-bold text-purple-400 mb-2">
                ${price?.toLocaleString()}
              </p>
              <p className="text-xl mb-6">Starting Price: 10,000</p>
              <Link href={`/checkout/${_id}`}>
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg">
                  Check Out
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
