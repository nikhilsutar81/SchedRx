import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { motion, AnimatePresence } from "framer-motion";

const users = [
  {
    name: "Asha R.",
    desc: "Booked a specialist within minutes. The doctor was calm, patient, and very helpful.",
    location: "Borivali",
    image: assets.user1 || assets.profile_pic,
  },
  {
    name: "Rahul M.",
    desc: "Super smooth experience. Reminders were accurate and follow-ups became effortless.",
    location: "Dahisar",
    image: assets.user2 || assets.profile_pic,
  },
  {
    name: "Sahil S.",
    desc: "Clean interface, no confusion. Exactly what a healthcare app should feel like.",
    location: "Malad",
    image: assets.user3 || assets.profile_pic,
  },
  {
    name: "Neha P.",
    desc: "Quick bookings and zero stress. I now use this for my entire family.",
    location: "Andheri",
    image: assets.user4 || assets.profile_pic,
  },
];

const variants = {
  enter: (dir) => ({
    x: dir > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  exit: (dir) => ({
    x: dir < 0 ? 80 : -80,
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.4, ease: "easeIn" },
  }),
};

const Users = () => {
  const [[index, direction], setIndex] = useState([0, 0]);

  const paginate = (dir) => {
    setIndex(([prev]) => [(prev + dir + users.length) % users.length, dir]);
  };

  useEffect(() => {
    const id = setInterval(() => paginate(1), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Soft background fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-indigo-50/60 to-white pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-semibold text-gray-900">
            Loved by our users
          </h2>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto text-sm">
            Real experiences from patients who trusted our platform for their healthcare needs.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative flex items-center justify-center">
          {/* Left Arrow */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 -translate-x-12 p-3 rounded-full bg-white/80 backdrop-blur shadow-md hover:scale-105 transition"
            aria-label="Previous testimonial"
          >
            ‹
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => paginate(1)}
            className="absolute right-0 translate-x-12 p-3 rounded-full bg-white/80 backdrop-blur shadow-md hover:scale-105 transition"
            aria-label="Next testimonial"
          >
            ›
          </button>

          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="
                bg-white/90 backdrop-blur
                rounded-2xl
                shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)]
                p-10
                max-w-xl
                w-full
              "
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={users[index].image}
                  alt={users[index].name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">
                    {users[index].name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {users[index].location}
                  </p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed text-lg">
                “{users[index].desc}”
              </p>

              <div className="mt-6 text-yellow-400 text-sm">★★★★★</div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Users;
