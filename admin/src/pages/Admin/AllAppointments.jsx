import React from 'react';
import {useContext,useEffect} from 'react';
import { AdminContext } from '../../Context/AdminContext';
import { AppContext } from '../../Context/AppContext';
import { assets } from '../../assets/assets';

const AddAppointments = () => {

  const {aToken, appointments, getAllAppointments, cancelAppointment} = useContext(AdminContext);
  const {calculateAge, slotDateFormat} = useContext(AppContext);

  useEffect(() => {
   if(aToken){
     getAllAppointments();
   }
  },[aToken]);

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        <div className='flex flex-wrap justify-between max-sm:hidden max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center py-3 px-6 border-b bg-gray-100'>
          <p className='text-neutral-900 font-medium'>#</p>
          <p className='text-neutral-900 font-medium md:ml-4'> Patient</p>
          <p className='text-neutral-900 font-medium'>Age</p>
          <p className='text-neutral-900 font-medium'>Date & Time</p>
          <p className='text-neutral-900 font-medium md:ml-10'>Doctor</p>
          <p className='text-neutral-900 font-medium'>Fees</p>
          <p className='text-neutral-900 font-medium md:ml-4'>Actions</p>
        </div>
        {
          appointments.map((item,index)=>(
            <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-600 py-3 px-6 border-b hover:bg-gray-100 transition-all duration-300' key={index}>
             <p className='max-sm:hidden'>{index+1}</p>
             <div className='flex items-center gap-2'>
              <img className='w-8 h-8 rounded-full' src={item.userData.image} alt="" />
              <p>{item.userData.name}</p>
             </div>
             <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
             <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
             <div className='flex items-center gap-2'>
              <img className='w-8 h-8 rounded-full bg-indigo-500' src={item.docData.image} alt="" />
              <p>{item.docData.name}</p>
             </div>
             <p>${item.amount}</p>
             {
              item.cancelled
              ? <p className='text-red-500 p-1 font-light text-sm border border-red-500 bg-red-50 rounded flex justify-center'>Cancelled</p>
              : item.isCompleted
                ? <p className='text-green-500 p-1 font-light text-sm border border-green-500 bg-green-50 rounded flex justify-center'>Completed</p> 
                : <img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
             }
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default AddAppointments;
