import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        {/*-------------------------Left Section -----------------------------------*/}

        <div>
         <img className='mb-5 w-40' src={assets.logo} alt="" />
         <p className='w-full md:w-2/3 text-gray-600 leading-6'>Seamlessly book, reschedule, and manage your doctor appointments at your convenience. Whether it's a routine check-up or a specialist consultation, we’ve got you covered. Stay on top of your health with our user-friendly interface and timely reminders.</p>

        </div>

        {/*-------------------------Center Section-----------------------------------*/}

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About us </li>
            <li>Contact us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/*-------------------------Right Section-----------------------------------*/}

        <div>
          <p className='text-xl font-medium mb-5'> GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+91 923XXXXXXXX</li>
            <li>Prescripto@gmail.com</li>
          </ul>
        </div>

      </div>
        {/*-------------------------Copyright Text-----------------------------------*/}

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2024 @ Prescripto - All Right Reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
