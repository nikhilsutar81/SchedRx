import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm bg-gradient-to-r from-indigo-50 to-white rounded-xl p-8 shadow-md'>

        {/*-------------------------Left Section -----------------------------------*/}

        <div>
         <img className='mb-5 w-40' src={assets.logo} alt="" />
         <p className='w-full md:w-2/3 text-gray-600 leading-6'>Seamlessly book, reschedule, and manage your doctor appointments at your convenience. Whether it's a routine check-up or a specialist consultation, weve got you covered. Stay on top of your health with our user-friendly interface and timely reminders.</p>
         <div className='flex gap-3 mt-4'>
           <a href='mailto:SchedRx@gmail.com' className='text-gray-500 hover:text-primary transition'><i className='fa fa-envelope'></i></a>
           <a href='tel:+91923XXXXXXXX' className='text-gray-500 hover:text-primary transition'><i className='fa fa-phone'></i></a>
         </div>
        </div>

        {/*-------------------------Center Section-----------------------------------*/}

        <div>
          <p className='text-xl font-semibold mb-5 text-primary'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <Link to='/' onClick={() => window.scrollTo(0, 0)}><li className='cursor-pointer hover:text-primary transition'>Home</li></Link>
            <Link to='/about' onClick={() => window.scrollTo(0, 0)}><li className='cursor-pointer hover:text-primary transition'>About us</li></Link>
            <Link to='/contact' onClick={() => window.scrollTo(0, 0)}><li className='cursor-pointer hover:text-primary transition'>Contact us</li></Link>
          </ul>
        </div>

        {/*-------------------------Right Section-----------------------------------*/}

        <div>
          <p className='text-xl font-semibold mb-5 text-primary'> GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li className='flex items-center gap-2'><i className='fa fa-phone text-primary'></i> +91 923XXXXXXXX</li>
            <li className='flex items-center gap-2'><i className='fa fa-envelope text-primary'></i> SchedRx@gmail.com</li>
          </ul>
        </div>

      </div>
        {/*-------------------------Copyright Text-----------------------------------*/}

      <div>
        <hr className='my-2'/>
        <p className='py-5 text-sm text-center text-gray-500'>Copyright 2025 @ SchedRx - All Right Reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
