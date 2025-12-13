import React, { useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const sampleUsers = [
  {
    name: "Asha R.",
    desc: "Great experience — booked a specialist quickly and the doctor was very helpful.",
    location: "Borivali",
    image: assets.user1 || assets.profile_pic,
  },
  {
    name: "Rahul M.",
    desc: "Easy to use and saved me a lot of time. Reminders worked perfectly.",
    location: "Dahisar",
    image: assets.user2 || assets.profile_pic,
  },
  {
    name: "Sahil S.",
    desc: "Friendly staff and simple booking flow. Highly recommended!",
    location: "Malad",
    image: assets.user3 || assets.profile_pic,
  },
  {
    name: "Neha P.",
    desc: "Quick booking and helpful reminders — made follow-ups easy.",
    location: "Andheri",
    image: assets.user4 || assets.profile_pic,
  },
];

const Users = () => {
  const containerRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(window.innerWidth >= 768 ? 3 : 1);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    function handleResize() {
      setVisibleCount(window.innerWidth >= 768 ? 3 : 1);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, sampleUsers.length - visibleCount);

  useEffect(() => {
    // adjust index if visibleCount changed
    if (index > maxIndex) setIndex(0);
    // autoplay
    const id = setInterval(() => {
      setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(id);
  }, [visibleCount, maxIndex]);

  const prev = () => setIndex((p) => (p <= 0 ? maxIndex : p - 1));
  const next = () => setIndex((p) => (p >= maxIndex ? 0 : p + 1));

  const slideWidthPercent = 100 / visibleCount; // each slide's width in percent

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-medium">What our users have to say</h2>
            <p className="sm:w-1/3 text-sm text-gray-600">Real feedback from people who used our platform to find doctors and book appointments.</p>
          </div>
          <div className="flex items-center gap-2">
            <button aria-label="Previous testimonials" onClick={prev} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              ‹
            </button>
            <button aria-label="Next testimonials" onClick={next} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              ›
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <motion.div
            ref={containerRef}
            className="flex gap-4"
            animate={{ x: `-${index * slideWidthPercent}%` }}
            transition={{ type: "tween", duration: 0.7 }}
            style={{ width: `${(sampleUsers.length * 100) / visibleCount}%` }}
          >
            {sampleUsers.map((u, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm flex flex-col gap-4" style={{ minWidth: `${slideWidthPercent}%` }}>
                <div className="flex items-center gap-4">
                  <img src={u.image} alt={u.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold">{u.name}</p>
                    <p className="text-sm text-gray-500">{u.location}</p>
                  </div>
                </div>

                <p className="text-gray-700">“{u.desc}”</p>

                <div className="mt-auto flex items-center justify-end">
                  <div className="text-yellow-400">★★★★★</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Users;
