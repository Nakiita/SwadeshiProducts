import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { resetPasswordApi } from "../apis/Api";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleResetPassword = () => {
    const data = {
      password: newPassword,
    };

    resetPasswordApi(data, token)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          // Redirect to the login page after successful password reset
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Frontend Internal server error");
      });
  };

  return (
    <>
      <img
        src="./assets/images/RP.svg"
        alt="Reset Password"
        className="flex mt-[6rem] w-[15rem] ml-[35rem]"
      />
      <div className="flex mb-[5rem] justify-center">
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="max-w-md w-full p-6">
            <h1 className="text-2xl font-semibold mb-6 text-black text-center">
              Reset Your Password
            </h1>

            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  onChange={handleNewPassword}
                  type="text"
                  id="password"
                  name="password"
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                >
                  Update Password
                </button>
              </div>
            </form>

            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>
                Return to &nbsp;
                <Link to="/register" className="text-black hover:underline">
                  Login
                </Link>
              </p>
            </div>
            <p className="text-[8px] mt-5 flex items-center justify-center">
              By clicking continue, you agree to our &nbsp;{" "}
              <b>Terms of Service</b>
              &nbsp; and &nbsp;
              <b>Privacy Policy</b>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
