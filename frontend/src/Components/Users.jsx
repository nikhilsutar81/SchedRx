import React from "react";
import { assets } from "../assets/assets";

const sampleUsers = [
  {
    name: "Asha R.",
    desc: "Great experience — booked a specialist quickly and the doctor was very helpful.",
    location: "Bengaluru",
    image: assets.user1 || "",
  },
  {
    name: "Rahul M.",
    desc: "Easy to use and saved me a lot of time. Reminders worked perfectly.",
    location: "Mumbai",
    image: assets.user2 || "",
  },
  {
    name: "Neha S.",
    desc: "Friendly staff and simple booking flow. Highly recommended!",
    location: "Delhi",
    image: assets.user3 || "",
  },
];

const Users = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
          What our users have to say
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Real feedback from people who used our platform to find doctors and
          book appointments.
        </p>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {sampleUsers.map((u, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow-sm flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={u.image || assets.placeholder_profile}
                  alt={u.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
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
        </div>
      </div>
    </section>
  );
};

export default Users;
