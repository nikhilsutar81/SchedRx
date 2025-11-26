import React from 'react';
import {assets} from '../assets/assets';

const Header = () => {
  return (
  <div className='flex flex-col md:flex-row flex-wrap bg-gradient-to-r from-indigo-500 via-primary to-indigo-400 rounded-2xl px-6 md:px-14 lg:px-24 shadow-xl mt-6 mb-10'>
      {/*------------------Left Side--------------- */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-6 py-12 m-auto md:py-[8vw] md:mb-[-30px]'>
        <p className='text-4xl md:text-5xl lg:text-6xl text-white font-extrabold leading-tight drop-shadow-lg'>Book Appointment<br />With Trusted Doctors</p>
        <div className='flex flex-col md:flex-row items-center gap-4 text-white text-base font-light'>
            <img className='w-32 rounded-xl shadow-lg' src={assets.group_profiles} alt="" />
            <p className='text-lg'>Browse our extensive list of trusted doctors and schedule your appointment hassle-free.</p>
        </div>
        <a className='flex items-center gap-2 bg-white px-10 py-4 rounded-full text-primary text-lg font-semibold shadow-lg m-auto md:m-0 hover:bg-indigo-100 hover:scale-105 transition-all duration-300' href="#speciality">
            Book Appointments <img className='w-4' src={assets.arrow_icon} alt="" />
        </a>
      </div>
      {/*------------------Right Side---------------- */}
      <div className='md:w-1/2 relative flex items-center justify-center'>
        <img className='w-full md:w-[420px] rounded-2xl shadow-lg md:absolute bottom-0 right-0' src={assets.header_img} alt="" />
      </div>
    </div>
  );
}

export default Header;
