import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContex";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
 
  const {userData,setUserData,token, backendUrl,loadUserProfileData} = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
     try {
      const formData = new FormData();
      formData.append('name',userData.name);
      formData.append('phone',userData.phone);
      formData.append('address',userData.address);
      formData.append('gender',userData.gender);
      formData.append('dob',userData.dob);

      image && formData.append('image', image);

      const {data} = await axios.post(backendUrl + '/api/user/update-profile',formData,{headers:{token}})

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      }
      else{
        toast.error(data.message);
      }

     } catch (error) {
      console.log(error);
      toast.error(error.message);
     }
  }

  return userData && (
    <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8 flex flex-col gap-8 mt-10 mb-10 border border-gray-100">
      <div className="flex flex-col items-center gap-2">
        <div className="relative group">
          {isEdit ? (
            <label htmlFor="image">
              <div className="inline-block relative cursor-pointer group">
                <img className="w-36 h-36 rounded-full border-4 border-primary shadow-lg object-cover group-hover:opacity-80 transition" src={image ? URL.createObjectURL(image) : userData.image} alt="Profile" />
                <img className="w-10 absolute bottom-2 right-2" src={image ? '' : assets.upload_icon} alt="Upload" />
              </div>
              <input onChange={(e)=> setImage(e.target.files[0])} type="file" id="image" accept="image/png, image/jpeg" hidden />
              <p className="text-xs text-gray-500 mt-2 text-center">Max size: 2MB. Allowed formats: JPG, PNG.</p>
            </label>
          ) : (
            <img className="w-36 h-36 rounded-full border-4 border-primary shadow-lg object-cover" src={userData.image} alt="Profile" />
          )}
        </div>
        {isEdit ? (
          <input
            className="bg-gray-100 text-2xl font-semibold max-w-xs mt-4 p-2 pl-4 rounded-lg border border-gray-300 outline-primary text-center"
            type="text"
            value={userData.name}
            onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Full Name"
          />
        ) : (
          <p className="font-bold text-3xl mt-4 text-primary text-center">{userData.name}</p>
        )}
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <p className="text-lg font-semibold text-primary mb-2">Contact Information</p>
          <div className="grid grid-cols-[120px_1fr] gap-y-3 gap-x-4 text-base">
            <span className="font-medium text-gray-700">Email:</span>
            <span className="text-blue-600 font-medium">{userData.email}</span>
            <span className="font-medium text-gray-700">Phone:</span>
            {isEdit ? (
              <input
                className="bg-gray-100 p-2 rounded-lg border border-gray-300 outline-primary max-w-xs"
                type="text"
                value={userData.phone}
                onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            ) : (
              <span className="text-blue-600 font-medium">{userData.phone}</span>
            )}
            <span className="font-medium text-gray-700">Address:</span>
            {isEdit ? (
              <input
                type="text"
                value={typeof userData.address === "object" && userData.address !== null ? `${userData.address.line1 || ""}, ${userData.address.line2 || ""}` : userData.address}
                className="bg-gray-100 p-2 rounded-lg border border-gray-300 outline-primary max-w-xs"
                onChange={(e) => setUserData((prev) => ({ ...prev, address: e.target.value }))}
              />
            ) : (
              <span>
                {typeof userData.address === "object" && userData.address !== null ? (
                  <>
                    {userData.address.line1}<br />{userData.address.line2}
                  </>
                ) : (
                  userData.address
                )}
              </span>
            )}
          </div>
        </div>

        <div>
          <p className="text-lg font-semibold text-primary mb-2">Basic Information</p>
          <div className="grid grid-cols-[120px_1fr] gap-y-3 gap-x-4 text-base">
            <span className="font-medium text-gray-700">Gender:</span>
            {isEdit ? (
              <select
                className="bg-gray-100 p-2 rounded-lg border border-gray-300 outline-primary max-w-xs"
                value={userData.gender || ""}
                onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <span>{userData.gender}</span>
            )}
            <span className="font-medium text-gray-700">Birthday:</span>
            {isEdit ? (
              <input
                className="bg-gray-100 p-2 rounded-lg border border-gray-300 outline-primary max-w-xs"
                type="date"
                value={userData.dob}
                onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
              />
            ) : (
              <span>{userData.dob}</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        {isEdit ? (
          <button
            onClick={updateUserProfileData}
            className="bg-primary text-white px-10 py-3 rounded-full font-semibold shadow hover:bg-indigo-700 transition-all text-lg"
          >
            Save Information
          </button>
        ) : (
          <button
            className="bg-white border border-primary px-10 py-3 rounded-full font-semibold text-primary shadow hover:bg-primary hover:text-white transition-all text-lg"
            onClick={() => setIsEdit(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
