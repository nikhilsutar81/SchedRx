import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const Footer = () => {
  return (
    <footer>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto w-full px-6
          flex flex-col sm:grid
          grid-cols-[3fr_1fr_1fr]
          gap-14
          my-10 mt-40
          text-sm
          bg-gradient-to-r from-indigo-50 to-white
          rounded-2xl
          p-8
          shadow-md
        "
      >
        {/* ---------------- Left Section ---------------- */}
        <motion.div variants={itemVariants}>
          <img
            className="mb-5 w-40 select-none"
            src={assets.logo}
            alt="SchedRx Logo"
            draggable="false"
          />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Seamlessly book, reschedule, and manage your doctor appointments at
            your convenience. Whether it’s a routine check-up or a specialist
            consultation, we’ve got you covered. Stay on top of your health with
            our user-friendly interface and timely reminders.
          </p>

          <div className="flex gap-4 mt-5">
            <a
              href="mailto:SchedRx@gmail.com"
              className="text-gray-500 hover:text-primary transition"
              aria-label="Email SchedRx"
            >
              <i className="fa fa-envelope text-lg"></i>
            </a>
            <a
              href="tel:+91923XXXXXXXX"
              className="text-gray-500 hover:text-primary transition"
              aria-label="Call SchedRx"
            >
              <i className="fa fa-phone text-lg"></i>
            </a>
          </div>
        </motion.div>

        {/* ---------------- Center Section ---------------- */}
        <motion.div variants={itemVariants}>
          <p className="text-lg font-semibold mb-5 text-primary">
            COMPANY
          </p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <li className="cursor-pointer hover:text-primary transition">
                Home
              </li>
            </Link>
            <Link to="/about" onClick={() => window.scrollTo(0, 0)}>
              <li className="cursor-pointer hover:text-primary transition">
                About us
              </li>
            </Link>
            <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>
              <li className="cursor-pointer hover:text-primary transition">
                Contact us
              </li>
            </Link>
          </ul>
        </motion.div>

        {/* ---------------- Right Section ---------------- */}
        <motion.div variants={itemVariants}>
          <p className="text-lg font-semibold mb-5 text-primary">
            GET IN TOUCH
          </p>
          <ul className="flex flex-col gap-3 text-gray-600">
            <li className="flex items-center gap-2">
              <i className="fa fa-phone text-primary"></i>
              +91 923XXXXXXXX
            </li>
            <li className="flex items-center gap-2">
              <i className="fa fa-envelope text-primary"></i>
              SchedRx@gmail.com
            </li>
          </ul>
        </motion.div>
      </motion.div>

      {/* ---------------- Copyright ---------------- */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <div className="max-w-7xl mx-auto w-full px-6">
          <hr className="my-2" />
          <p className="py-5 text-sm text-center text-gray-500">© 2025 SchedRx. All rights reserved.</p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
