import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContex";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      {/* ---------------- Desktop Navbar ---------------- */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="
          flex items-center justify-between
          text-sm
          py-4 mb-5
          bg-white
          shadow-md
          rounded-xl
          px-6
          border-b border-gray-200
        "
      >
        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          className="w-32 cursor-pointer select-none"
          src={assets.logo}
          alt="App Logo"
          draggable="false"
        />

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-6 font-semibold">
          {[
            { name: "HOME", path: "/" },
            { name: "ALL DOCTORS", path: "/doctors" },
            { name: "ABOUT", path: "/about" },
            { name: "CONTACT", path: "/contact" },
          ].map((item) => (
            <NavLink key={item.name} to={item.path} className={({ isActive }) => (isActive ? "text-primary" : "") }>
              <li className="py-2 px-4 rounded-lg hover:bg-indigo-50 transition-all duration-200 cursor-pointer">{item.name}</li>
            </NavLink>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Logged In */}
          {token && userData ? (
            <div className="relative group">
              <button
                onClick={() => setShowUserMenu((p) => !p)}
                className="flex items-center gap-2 cursor-pointer rounded-full focus:outline-none"
                aria-expanded={showUserMenu}
                aria-label="User menu"
              >
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src={userData.image}
                  alt="User"
                />
                <img className="w-2.5" src={assets.dropdown_icon} alt="" />
              </button>

              {/* Dropdown: visible on hover OR when showUserMenu is true */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: showUserMenu ? 1 : 0, y: showUserMenu ? 0 : 10 }}
                transition={{ duration: 0.18 }}
                className={`absolute right-0 mt-3 z-30 ${showUserMenu ? "block" : "hidden"} group-hover:block`}
              >
                <div className="min-w-48 bg-white rounded-xl shadow-lg p-4 flex flex-col gap-3 text-gray-600">
                  <p
                    onClick={() => {
                      setShowUserMenu(false);
                      navigate("/my-profile");
                    }}
                    className="hover:text-black cursor-pointer"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => {
                      setShowUserMenu(false);
                      navigate("/my-appointments");
                    }}
                    className="hover:text-black cursor-pointer"
                  >
                    My Appointments
                  </p>
                  <p
                    onClick={() => {
                      setShowUserMenu(false);
                      logout();
                    }}
                    className="hover:text-red-600 cursor-pointer"
                  >
                    Logout
                  </p>
                </div>
              </motion.div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="
                hidden md:block
                bg-primary text-white
                px-8 py-3
                rounded-full
                font-light
                shadow
                transition-all
                hover:bg-indigo-700 hover:scale-105
                active:scale-95
              "
            >
              Create account
            </button>
          )}

          {/* Mobile Menu Icon */}
          <img
            onClick={() => setShowMenu(true)}
            className="w-6 md:hidden cursor-pointer hover:scale-110 transition-transform"
            src={assets.menu_icon}
            alt="Menu"
          />
        </div>
      </motion.header>

      {/* ---------------- Mobile Menu ---------------- */}
      <AnimatePresence>
        {showMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMenu(false)}
              className="fixed inset-0 bg-black z-20"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="
                fixed top-0 right-0 bottom-0
                w-full
                bg-white
                z-30
                rounded-l-2xl
                shadow-xl
              "
            >
              <div className="flex items-center justify-between px-6 py-6">
                <img className="w-36" src={assets.logo} alt="Logo" />
                <img
                  className="w-7 cursor-pointer"
                  onClick={() => setShowMenu(false)}
                  src={assets.cross_icon}
                  alt="Close"
                />
              </div>

              <ul className="flex flex-col gap-3 items-center mt-5 px-6 text-lg font-semibold">
                {[
                  { name: "HOME", path: "/" },
                  { name: "ALL DOCTORS", path: "/doctors" },
                  { name: "ABOUT", path: "/about" },
                  { name: "CONTACT", path: "/contact" },
                ].map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setShowMenu(false)}
                    className="w-full"
                  >
                    <p className="px-4 py-2 rounded-lg hover:bg-indigo-50 transition-all text-center">
                      {item.name}
                    </p>
                  </NavLink>
                ))}

                {token ? (
                  <p
                    onClick={logout}
                    className="px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-all w-full text-center"
                  >
                    LOGOUT
                  </p>
                ) : (
                  <NavLink
                    to="/login"
                    onClick={() => setShowMenu(false)}
                    className="w-full"
                  >
                    <p className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-indigo-700 transition-all text-center">
                      LOGIN
                    </p>
                  </NavLink>
                )}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
