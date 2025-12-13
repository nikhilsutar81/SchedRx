import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const SpecialityMenu = () => {
  return (
    <section
      id="speciality"
      className="flex flex-col items-center gap-4 py-16 text-gray-800"
    >
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="text-3xl font-medium"
      >
        Find by Speciality
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
        className="sm:w-1/3 text-center text-sm text-gray-600"
      >
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </motion.p>

      {/* Speciality List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="
          flex sm:justify-center
          gap-5
          pt-8
          w-full
          overflow-x-auto
          px-4
          scrollbar-hide
        "
      >
        {specialityData.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <Link
              to={`/doctors/${item.speciality}`}
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
              className="
                flex flex-col items-center
                gap-2
                rounded-xl
                p-4
                bg-white
                shadow-sm
                hover:shadow-md
                transition-shadow
                cursor-pointer
              "
            >
              <img
                className="w-16 sm:w-24 select-none"
                src={item.image}
                alt={item.speciality}
                draggable="false"
              />
              <p className="text-xs sm:text-sm font-medium text-gray-700">
                {item.speciality}
              </p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default SpecialityMenu;
