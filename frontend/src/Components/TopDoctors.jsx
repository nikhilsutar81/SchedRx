import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContex";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center gap-8 my-16 text-gray-900 md:mx-10">
      <h1 className="text-4xl font-bold text-primary">Top Doctors to Book</h1>
      <p className="sm:w-1/2 text-center text-base text-gray-600">Browse our top-rated doctors and book your appointment today.</p>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pt-7 px-3 sm:px-0">
        {doctors.slice(0, 8).map((item, index) => (
          <div
            onClick={() => {navigate(`/appointments/${item._id}`); scrollTo(0,0)}}
            className="bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 hover:shadow-xl transition-all duration-300 shadow-md flex flex-col items-center"
            key={index}
          >
            <img className="w-28 h-28 object-cover rounded-full border-4 border-primary mt-6 mb-2 shadow" src={item.image} alt="Doctor" />
            <div className="p-4 w-full flex flex-col items-center">
              <div className={`flex items-center gap-2 text-sm font-semibold mb-2 ${item.available ? 'text-green-500' : 'text-yellow-400'}`}>
                <span className={`w-2 h-2 ${item.available ? 'bg-green-500 rounded-full' : 'bg-yellow-400 rounded-full'}`}></span>
                <span>{item.available ? 'Available' : 'Unavailable'}</span>
              </div>
              <p className="text-gray-900 text-lg font-bold text-center">{item.name}</p>
              <p className="text-primary text-sm font-medium text-center mt-1">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="bg-primary text-white px-12 py-3 rounded-full mt-10 font-semibold shadow hover:bg-indigo-700 transition-all text-lg"
      >
        View All Doctors
      </button>
    </div>
  );
};

export default TopDoctors;
