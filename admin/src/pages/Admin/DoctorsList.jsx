import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../Context/AdminContext';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorsList = () => {
  const { doctors, getAllDoctors, aToken, changeAvailability, url } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  const removeDoctor = async (doctorId) => {
    if (window.confirm("Are you sure you want to remove this doctor?")) {
      try {
        const response = await axios.post(`${url}/api/admin/remove-doctor`, { id: doctorId }, {
          headers: { token: aToken },
        });
        if (response.data.success) {
          toast.success(response.data.message);
          await getAllDoctors(); // Refresh the list
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Error removing doctor");
      }
    }
  };

  return (
    <div className='w-full max-w-6xl m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          doctors.map((item, index) => (
             <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden group relative' key={index}>
              <img onClick={() => removeDoctor(item._id)} className='absolute right-2 top-2 w-6 cursor-pointer' src={assets.cross_icon} alt="Remove" />
              <img className='bg-indigo-50' src={item.image} alt="" />
              <div className='p-4'>
              <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
              <p className='text-zinc-600 text-sm'>{item.speciality}</p>
              <div className='mt-2 flex items-center gap-1 text-sm'>
                <input onChange={() => changeAvailability(item._id)} type="checkbox" checked={item.available} />
                <p>Available</p>
              </div>

              </div>
             </div>
          ))
        }
      </div>
    </div>
  );
};

export default DoctorsList;
