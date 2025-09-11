import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../Context/DoctorContext";
import axios from 'axios';
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, getProfileData, setProfileData, profileData, backendUrl } = useContext(DoctorContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {

      const updatedData = {
         fees: Number(profileData.fees),
         available: profileData.available
      }

      const { data } = await axios.post(backendUrl + "/api/doctor/update-profile",updatedData,{ headers: { dToken } });

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  },[dToken]);

  return (
    profileData && (
      <div className="w-full max-w-6xl m-5">
        <div className="flex flex-col gap-4 m-5">
          <div>
            <img
              className="bg-primary w-full sm:max-w-64 rounded-lg"
              src={profileData.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-stone-400 rounded-lg p-8 py-7 bg-white">
            {/*--------------------Doc Info: Name, Degree, Experience--------------------*/}

            <p className="flex gap-2 items-center text-3xl font-medium text-neutral-900">
              {profileData.name}
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-900">
              <p>
                {profileData.degree} - {profileData.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full border-black">
                {profileData.experience}
              </button>
            </div>

            {/*------------------------Doctor About-----------------------*/}
            <div>
              <p className="flex items-center gap-1 text-md font-medium text-neutral-800 mt-3">
                About:
              </p>
              <p className="text-sm text-gray-800 max-w-[700px] mt-1">
                {profileData.about}
              </p>
            </div>

            <p className="flex items-center gap-1 text-md font-medium text-neutral-800 mt-4">
              Appointment Fee:
              <span className="text-gray-800">
                $ 
                {isEdit ? (
                  <input
                    type="number"
                     className="bg-gray-200 font-medium max-w-14 pl-2 border border-gray-300 rounded outline-indigo-600"
                    min='20'
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }))
                    }
                    value={profileData.fees}
                  />
                ) : (
                  profileData.fees
                )}
              </span>
            </p>

            <div className="flex gap-4 py-2 mt-4">
              <p className="text-lg font-medium text-neutral-800 ">Address:</p>
              <p className="text-sm">
                {profileData.address.line1} <br /> {profileData.address.line2}
              </p>
            </div>

            <div className="flex gap-1 pt-2">
              <input
                onChange={()=> isEdit && setProfileData(prev => ({...prev, available: !prev.available}))}
                checked={profileData.available}
                type="checkbox"
                name=""
                id=""
              />
              <label htmlFor="">Available</label>
            </div>
             
             {
               isEdit 
               ? <button onClick={updateProfile} className="px-6 py-2 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all">Save</button>
               : <button onClick={() => setIsEdit(true)} className="px-6 py-2 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all">Edit</button>
             }
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
