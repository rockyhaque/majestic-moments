// "use client";

import React from "react";
import ServiceCard from "../cards/ServiceCard";
import { motion } from "framer-motion";

import { getServices } from "@/services/GetServices";
import SectionHeading from "../shared/SectionHeading";



const Services = async () => {

  const {services} = await getServices();


  return (
    <section className="relative min-h-screen overflow-hidden bg-gray-950 py-16 px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-indigo-900/10 to-gray-900/30 backdrop-blur-3xl" />
      </div>

      <SectionHeading title="Our Services"/>
      <div className="relative z-10 container mx-auto">
        {/* <motion.h2
          className="text-4xl font-bold text-center text-purple-200 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Services
        </motion.h2> */}

        {/* <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {services?.map((service) => (
            <ServiceCard service={service} key={service.service_id} />
          ))}
        </motion.div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services?.map((service) => (
            <ServiceCard service={service} key={service.service_id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
