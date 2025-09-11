import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../Context/DoctorContext";
import { AppContext } from "../../Context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointment = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_0.5fr_3fr_3fr_1fr_1fr] items-center py-3 px-6 border-b bg-gray-100 max-sm:hidden">
          <p className="text-neutral-900 font-medium">#</p>
          <p className="text-neutral-900 font-medium md:ml-4">Patient</p>
          <p className="text-neutral-900 font-medium">Payment</p>
          <p className="text-neutral-900 font-medium md:ml-12">Date & Time</p>
          <p className="text-neutral-900 font-medium md:ml-4">Age</p>
          <p className="text-neutral-900 font-medium">Fees</p>
          <p className="text-neutral-900 font-medium md:ml-4">Actions</p>
        </div>
        {appointments.map((item, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_0.5fr_3fr_3fr_1fr_1fr] items-center text-gray-600 py-3 px-6 border-b hover:bg-gray-100 transition-all duration-300"
            key={index}
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 h-8 rounded-full"
                src={item.userData.image}
                alt=""
              />
              <p>{item.userData.name}</p>
            </div>
            <p className="text-xs font-medium inline border border-blue-500 bg-blue-50 text-blue-500 px-4 py-1 rounded-full">
              {item.payment ? "PAID" : "CASH"}
            </p>
            <p className="md:ml-8">
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>
            <div className="flex items-center gap-2">
              <p className="max-sm:hidden md:ml-4">
                {calculateAge(item.userData.dob)}
              </p>
            </div>
            <p>${item.amount}</p>
            {item.cancelled ? (
              <p className="text-red-500 text-xs font-medium border rounded bg-red-50 p-2 text-center border-red-500">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-500 text-xs font-medium border rounded bg-green-50 p-2 text-center border-green-500">Completed</p>
            ) : (
              <div className="flex gap-1">
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt=""
                />
                <img
                  onClick={() => completeAppointment(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.tick_icon}
                  alt=""
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointment;
