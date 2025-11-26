import React from 'react';
import { specialityData } from '../assets/assets';
import {Link } from 'react-router-dom';

const SpecialityMenu = () => {
  return (
  <div className='flex flex-col items-center gap-6 py-16 text-gray-800' id='speciality'>
      <h1 className='text-4xl font-bold text-primary mb-2'>Find by Speciality</h1>
      <p className='sm:w-1/2 text-center text-base text-gray-600'>Browse our list of trusted doctors by speciality and book your appointment with ease.</p>
      <div className='flex sm:justify-center gap-6 pt-7 w-full overflow-x-auto pb-2'>
        {specialityData.map((item,index)=>(
            <Link onClick={()=>scrollTo(0,0)} className='flex flex-col items-center text-sm cursor-pointer flex-shrink-0 bg-white rounded-xl shadow-lg p-5 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border border-gray-100 min-w-[120px]' key={index} to={`/doctors/${item.speciality}`}>
            <img className='w-16 sm:w-24 mb-3 rounded-full border-2 border-primary shadow' src={item.image} alt="" />
            <p className='font-semibold text-primary'>{item.speciality}</p>
            </Link>
        ))}
      </div>
    </div>
  );
}

export default SpecialityMenu;
