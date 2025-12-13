import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContex";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <section className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="text-3xl font-medium"
      >
        Top Doctors to Book
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="sm:w-1/3 text-center text-sm text-gray-600"
      >
        Simply browse through our extensive list of trusted doctors.
      </motion.p>

      {/* Doctors Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="
          w-full
          grid grid-cols-auto
          gap-4 gap-y-6
          pt-6
          px-3 sm:px-0
        "
      >
        {doctors.slice(0, 10).map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              navigate(`/appointments/${item._id}`);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="
              cursor-pointer
              rounded-2xl
              border border-blue-100
              bg-white
              overflow-hidden
              transition-shadow
              hover:shadow-lg
            "
          >
            {/* Image */}
            <div className="bg-blue-50">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-auto object-cover select-none"
                draggable="false"
              />
            </div>

            {/* Info */}
            <div className="p-4 space-y-1">
              {/* Availability */}
              <div
                className={`flex items-center gap-2 text-sm font-medium ${
                  item.available ? "text-green-600" : "text-yellow-500"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    item.available ? "bg-green-500" : "bg-yellow-400"
                  }`}
                />
                {item.available ? "Available" : "Unavailable"}
              </div>

              <p className="text-gray-900 text-lg font-medium">
                {item.name}
              </p>
              <p className="text-gray-600 text-sm">
                {item.speciality}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.button
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        onClick={() => {
          navigate("/doctors");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="
          bg-blue-50
          text-gray-700
          px-12 py-3
          rounded-full
          mt-10
          font-medium
          transition-all
          hover:bg-blue-100 hover:scale-105
          active:scale-95
        "
      >
        View All Doctors
      </motion.button>
    </section>
  );
};

export default TopDoctors;
