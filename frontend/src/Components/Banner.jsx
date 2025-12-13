import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContex";
import { motion } from "framer-motion";

const Banner = () => {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();

  const handleCTA = () => {
    navigate("/login");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative my-20 md:mx-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
          relative overflow-hidden
          flex items-center
          bg-primary
          rounded-2xl
          px-6 sm:px-10 md:px-14 lg:px-16
        "
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/20 pointer-events-none" />

        {/* ---------------- Left Content ---------------- */}
        <div className="relative z-10 flex-1 py-10 sm:py-14 md:py-20 lg:py-24">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
            className="
              text-white
              text-2xl sm:text-3xl md:text-4xl lg:text-5xl
              font-semibold
              leading-tight
            "
          >
            Book Appointments
            <span className="block mt-3 font-normal text-white/90">
              with 100+ Trusted Doctors
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.45, ease: "easeOut" }}
            className="mt-5 max-w-xl text-sm sm:text-base text-white/80"
          >
            Consult experienced and verified doctors anytime, anywhere.
            Hassle-free booking with instant confirmation.
          </motion.p>

          {!token && (
            <motion.button
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
              onClick={handleCTA}
              className="
                inline-flex items-center justify-center
                mt-8
                rounded-full
                bg-white
                px-8 py-3
                text-sm sm:text-base
                font-medium
                text-gray-700
                shadow-md
                transition-all duration-300
                hover:scale-105 hover:shadow-lg
                focus:outline-none focus:ring-2 focus:ring-white/70
                active:scale-95
              "
              aria-label="Create an account"
            >
              Create Account
            </motion.button>
          )}
        </div>

        {/* ---------------- Right Image ---------------- */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
          className="relative hidden md:flex md:w-1/2 lg:w-[380px] items-end justify-end"
        >
          <img
            src={assets.appointment_img}
            alt="Doctor appointment illustration"
            className="w-full max-w-md translate-y-6 select-none"
            draggable="false"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Banner;
