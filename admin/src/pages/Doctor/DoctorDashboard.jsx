import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../Context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../Context/AppContext";

const DoctorDashboard = () => {
  const { dToken, dashData, setDashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext);
  const {slotDateFormat} = useContext(AppContext);


  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return (
    dashData && (
      <div className="w-full max-w-6xl m-5">
        <div className="flex flex-wrap gap-5">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 shadow-lg cursor-pointer hover:scale-105 transition-all duration-300">
            <img className="w-14" src={assets.earning_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-neutral-900">
                $ {dashData.earnings}
              </p>
              <p>Earnings</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 shadow-lg cursor-pointer hover:scale-105 transition-all duration-300">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-neutral-900">
                {dashData.appointments}
              </p>
              <p>Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 shadow-lg cursor-pointer hover:scale-105 transition-all duration-300">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-neutral-900">
                {dashData.patients}
              </p>
              <p>Patient</p>
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="flex items-center gap-2.5 p-4 mt-10 rounded-t border">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Bookings</p>
          </div>

          <div className="pt-4 border border-t-0">
            {dashData.latestAppointments.map((item, index) => (
              <div
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100 "
                key={index}
              >
                <img
                  className="rounded-full w-10 h-10"
                  src={item.userData.image}
                  alt=""
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {item.userData.name}
                  </p>
                  <p className="text-gray-600">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>
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
      </div>
    )
  );
};

export default DoctorDashboard;
