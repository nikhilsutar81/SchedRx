import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContex";

const Banner = () => {

    const {token} = useContext(AppContext);
    const navigate = useNavigate();

  return (
  <div className="flex bg-gradient-to-r from-indigo-500 via-primary to-indigo-400 rounded-2xl px-6 sm:px-14 md:px-20 lg:px-24 my-20 md:mx-10 shadow-xl">

      {/*------------ Left Side-------- */}

      <div className="flex-1 py-12 sm:py-16 md:py-20 lg:py-24 lg:pl-5 flex flex-col justify-center">
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg">
            <p>Book Appointment</p>
            <p className="mt-4">With 100+ Trusted Doctors</p>
        </div>
        {
          !token && <button onClick={()=>{navigate('/login'); scrollTo(0,0)}} className="bg-white text-lg text-primary px-10 py-4 rounded-full mt-8 font-semibold shadow-lg hover:bg-indigo-100 hover:scale-105 transition-all duration-300">Create Account</button>
        }
      </div>

      {/*-------------- Right Side--------- */}

      <div className="md:block md:w-1/2 lg:w-[370px] relative items-center justify-center" style={{display: 'none', '@media (min-width: 768px)': {display: 'flex'}}}>
        <img className="w-full max-w-md rounded-2xl shadow-lg md:absolute bottom-0 right-0" src={assets.appointment_img} alt="" />
      </div>

    </div>
  );
};

export default Banner;
