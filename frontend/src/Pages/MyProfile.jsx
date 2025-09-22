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
    <div className="max-w-lg flex flex-col justify-center gap-2 text-sm">
      {
        isEdit 
        ? <label htmlFor="image">
           <div className="inline-block relative cursor-pointer">
            <img className="w-36 h-36 rounded-lg opacity-90" src={image ? URL.createObjectURL(image) : userData.image} alt="" />
            <img className="w-10 absolute bottom-12 right-12" src={image ? '' : assets.upload_icon} alt="" />
           </div>
           <input onChange={(e)=> setImage(e.target.files[0])} type="file" id="image" hidden />
        </label>
        : <img className="w-36 h-36 rounded-lg" src={userData.image} alt="" />
      }
      {isEdit
       ? (
        <input
          className="bg-gray-200 text-2xl font-medium max-w-60 mt-4 p-1 pl-4 rounded border border-gray-300 outline-indigo-600"
          type="text"
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className="font-medium text-3xl mt-4 text-indigo-800 ">
          {userData.name}
        </p>
      )}

      <hr className="bg-zinc-400 h-[2px] border-none" />
      <div>
        <p className="text-neutral-950 font-semibold underline mt-3">
          CONTACT INFORMATION -
        </p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium text-neutral-800 text-base">Email Id:</p>
          <p className="text-blue-600 font-medium text-base">{userData.email}</p>
          <p className="font-medium text-neutral-800 text-base">Phone:</p>
          {isEdit ? (
            <input
              className="bg-gray-200 max-w-48 p-1 pl-3 rounded border border-gray-300 outline-indigo-600"
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p className="text-blue-600 font-medium text-base">{userData.phone}</p>
          )}
          <p className="font-medium text-neutral-800 text-base">Address:</p>
          {isEdit ? (
            <input
              type="text"
              value={typeof userData.address === "object" && userData.address !== null ? `${userData.address.line1 || ""}, ${userData.address.line2 || ""}` : userData.address}
              className="bg-gray-200 max-w-52 p-1 pl-3 rounded border border-gray-300 outline-indigo-600"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, address: e.target.value }))
              }
            />
          ) : (
            <p className="text-base">
              {typeof userData.address === "object" && userData.address !== null ? (
                <>
                  {userData.address.line1}
                  <br />
                  {userData.address.line2}
                </>
              ) : (
                userData.address
              )}
            </p>
          )}
        </div>
      </div>
      <div>
        <p className="text-neutral-950 font-semibold underline mt-3">
          BASIC INFORMATION -
        </p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium text-neutral-800 text-base">Gender:</p>
          {isEdit ? (
            <select
              className="max-w-20 bg-gray-200 p-1 pl-3 rounded border border-gray-300 outline-indigo-600"
              value={userData.gender}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-base">{userData.gender}</p>
          )}

          <p className="font-medium text-neutral-800 text-base">Birthday:</p>
          {isEdit ? (
            <input
              className="bg-gray-200 max-w-28 p-1 rounded border border-gray-300 outline-indigo-600"
              type="date"
              value={userData.dob}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
            />
          ) : (
            <p className="text-base">{userData.dob}</p>
          )}
        </div>
      </div>
      <div className="mt-10">
        {isEdit ? (
          <button
            onClick={updateUserProfileData}
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
          >
            Save Information
          </button>
        ) : (
          <button
            className="border border-primary px-8 py-2 rounded-full  hover:bg-primary hover:text-white transition-all"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
