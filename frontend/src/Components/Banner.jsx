import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContex";

const Banner = () => {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();

  const handleCTA = () => {
    navigate("/login");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative my-20 md:mx-10">
      <div
        className="
          relative overflow-hidden
          flex items-center
          bg-primary
          rounded-2xl
          px-6 sm:px-10 md:px-14 lg:px-16
        "
      >
        {/* Gradient Overlay (Depth & Premium Feel) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/20 pointer-events-none" />

        {/* ---------------- Left Content ---------------- */}
        <div className="relative z-10 flex-1 py-10 sm:py-14 md:py-20 lg:py-24">
          <h1
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
          </h1>

          <p className="mt-5 max-w-xl text-sm sm:text-base text-white/80">
            Consult experienced and verified doctors anytime, anywhere.
            Hassle-free booking with instant confirmation.
          </p>

          {!token && (
            <button
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
            </button>
          )}
        </div>

        {/* ---------------- Right Image ---------------- */}
        <div className="relative hidden md:flex md:w-1/2 lg:w-[380px] items-end justify-end">
          <img
            src={assets.appointment_img}
            alt="Doctor appointment illustration"
            className="
              w-full max-w-md
              translate-y-6
              select-none
            "
            draggable="false"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
