import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserApi } from "../../apis/Api";
import getUser from "../../utils/getUser";
import { toast } from "react-toastify";

const UserProfile = () => {
  const navigate = useNavigate();
  const fetchedUser = getUser();

  // Initial user state setup from fetched user
  const [user, setUser] = useState({
    id: fetchedUser._id,
    UserName: fetchedUser.UserName,
    email: fetchedUser.email,
    phoneNumber: fetchedUser.phoneNumber,
    address: fetchedUser.address,
  });

  // State for profile picture and its preview
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("UserName", user.UserName);
    formData.append("email", user.email);
    formData.append("phoneNumber", user.phoneNumber);
    formData.append("address", user.address);

    // Append profile picture if it exists
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    try {
      const res = await updateUserApi(user.id, formData);
      if (res.data.success) {
        toast.success("Profile updated successfully!");
        navigate("/user-dashboard"); // Adjust the path as necessary
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile. Internal Server Error!");
    }
  };

  return (
    <>
      <div className="bg-gray-50 flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
          <div className="flex flex-col items-center pb-4">
            <label
              htmlFor="profileImage"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              User Image
            </label>
            <input
              id="profileImage"
              type="file"
              onChange={handleImageUpload}
              className="block w-full mb-4 p-2 border rounded cursor-pointer"
              accept="image/*"
            />
            {previewImage && (
              <img
                src={previewImage}
                className="w-24 h-24 rounded-full mt-2"
                alt="Profile Preview"
              />
            )}
            <h2 className="mt-2 text-xl font-semibold text-gray-800">
              User Information
            </h2>
          </div>

          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="UserName"
                value={user.UserName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={user.address}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="bg-gray-200 text-gray-800 rounded py-2 px-4 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
