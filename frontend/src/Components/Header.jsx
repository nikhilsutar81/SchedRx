import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <section className="relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
          flex flex-col md:flex-row flex-wrap
          bg-primary
          rounded-2xl
          px-6 md:px-10 lg:px-20
          overflow-hidden
        "
      >
        {/* ---------------- Left Side ---------------- */}
        <div
          className="
            md:w-1/2
            flex flex-col items-start justify-center
            gap-5
            py-10
            m-auto
            md:py-[10vw]
            md:mb-[-30px]
            relative z-10
          "
        >
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
            className="
              text-3xl md:text-4xl lg:text-5xl
              text-white
              font-semibold
              leading-tight
            "
          >
            Book Appointment
            <br />
            <span className="text-white/95">
              With Trusted Doctors
            </span>
          </motion.h1>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.45, ease: "easeOut" }}
            className="
              flex flex-col md:flex-row
              items-start md:items-center
              gap-3
              text-white/90
              text-sm
              font-light
            "
          >
            <img
              className="w-28"
              src={assets.group_profiles}
              alt="Trusted doctors"
              draggable="false"
            />
            <p className="text-base max-w-md">
              Simply browse through our extensive list of trusted doctors,
              <br className="hidden sm:block" />
              schedule your appointment hassle-free.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.a
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
            href="#speciality"
            className="
              inline-flex items-center gap-2
              bg-white
              px-8 py-3
              rounded-full
              text-gray-700
              text-sm font-medium
              shadow-md
              m-auto md:m-0
              transition-all duration-300
              hover:scale-105 hover:shadow-lg
              focus:outline-none focus:ring-2 focus:ring-white/70
              active:scale-95
            "
            aria-label="Book appointments"
          >
            Book Appointments
            <img
              className="w-3"
              src={assets.arrow_icon}
              alt=""
              aria-hidden="true"
            />
          </motion.a>
        </div>

        {/* ---------------- Right Side ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
          className="md:w-1/2 relative"
        >
          <img
            className="
              w-full
              md:absolute
              bottom-0
              h-auto
              rounded-2xl
              select-none
            "
            src={assets.header_img}
            alt="Doctor consultation illustration"
            draggable="false"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Header;
