import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContex";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const {
    userData,
    setUserData,
    token,
    backendUrl,
    loadUserProfileData,
  } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name || "");
      formData.append("phone", userData.phone || "");
      formData.append("address", userData.address || "");
      formData.append("gender", userData.gender || "");
      formData.append("dob", userData.dob || "");

      if (image) formData.append("image", image);

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
  };

  if (!userData) return null;

  return (
    <div className="max-w-2xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-lg p-8 mt-10 mb-16">
      {/* ---------------- Profile Header ---------------- */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          {isEdit ? (
            <label htmlFor="image" className="cursor-pointer block">
              <img
                src={image ? URL.createObjectURL(image) : userData.image}
                alt="Profile"
                className="w-36 h-36 rounded-full object-cover border-4 border-primary shadow"
              />
              <img
                src={assets.upload_icon}
                alt="Upload"
                className="w-9 absolute bottom-2 right-2"
              />
              <input
                type="file"
                id="image"
                accept="image/png, image/jpeg"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
              <p className="text-xs text-gray-500 mt-2 text-center">
                JPG or PNG • Max 2MB
              </p>
            </label>
          ) : (
            <img
              src={userData.image}
              alt="Profile"
              className="w-36 h-36 rounded-full object-cover border-4 border-primary shadow"
            />
          )}
        </div>

        {isEdit ? (
          <input
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="mt-4 text-xl font-semibold bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-center outline-primary"
            placeholder="Full Name"
          />
        ) : (
          <h1 className="text-3xl font-bold text-primary mt-4">
            {userData.name}
          </h1>
        )}
      </div>

      {/* ---------------- Contact Information ---------------- */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-primary mb-4">
          Contact Information
        </h2>

        <div className="grid grid-cols-[120px_1fr] gap-y-4 text-sm sm:text-base">
          <span className="font-medium text-gray-700">Email</span>
          <span className="text-blue-600 font-medium">{userData.email}</span>

          <span className="font-medium text-gray-700">Phone</span>
          {isEdit ? (
            <input
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 outline-primary max-w-xs"
            />
          ) : (
            <span className="text-blue-600 font-medium">
              {userData.phone}
            </span>
          )}

          <span className="font-medium text-gray-700">Address</span>
          {isEdit ? (
            <input
              type="text"
              value={
                typeof userData.address === "object"
                  ? `${userData.address.line1 || ""}, ${
                      userData.address.line2 || ""
                    }`
                  : userData.address || ""
              }
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, address: e.target.value }))
              }
              className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 outline-primary max-w-xs"
            />
          ) : (
            <span>
              {typeof userData.address === "object" ? (
                <>
                  {userData.address.line1}
                  <br />
                  {userData.address.line2}
                </>
              ) : (
                userData.address
              )}
            </span>
          )}
        </div>
      </div>

      {/* ---------------- Basic Information ---------------- */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-primary mb-4">
          Basic Information
        </h2>

        <div className="grid grid-cols-[120px_1fr] gap-y-4 text-sm sm:text-base">
          <span className="font-medium text-gray-700">Gender</span>
          {isEdit ? (
            <select
              value={userData.gender || ""}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 outline-primary max-w-xs"
            >
              <option value="">Select gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          ) : (
            <span>{userData.gender}</span>
          )}

          <span className="font-medium text-gray-700">Birthday</span>
          {isEdit ? (
            <input
              type="date"
              value={userData.dob}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
              className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 outline-primary max-w-xs"
            />
          ) : (
            <span>{userData.dob}</span>
          )}
        </div>
      </div>

      {/* ---------------- Actions ---------------- */}
      <div className="flex justify-center mt-12">
        {isEdit ? (
          <button
            onClick={updateUserProfileData}
            className="bg-primary text-white px-10 py-3 rounded-full font-semibold shadow hover:bg-indigo-700 transition"
          >
            Save Changes
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="border border-primary text-primary px-10 py-3 rounded-full font-semibold shadow hover:bg-primary hover:text-white transition"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
