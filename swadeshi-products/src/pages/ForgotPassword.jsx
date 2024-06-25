import React, { useState } from "react";
import { forgotPasswordApi } from "../apis/Api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { z } from "zod";

const ForgotPassword = () => {
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [errors, setErrors] = useState({});

  const handleForgotPasswordEmail = (e) => {
    setForgotPasswordEmail(e.target.value);
  };

  // Define the Zod validation schema
  const schema = z.object({
    email: z.string().min(1, { message: "Email is required" }),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: forgotPasswordEmail,
    };

    // Validate form data using Zod schema
    const result = schema.safeParse(data);
    if (!result.success) {
      const newErrors = {};
      result.error.errors.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    setErrors({}); // Clear errors if validation passes

    forgotPasswordApi(data)
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          // You can redirect the user to another page if needed
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.error("Forgot Password API Error:", error);
        throw error; // rethrow the error to maintain the error flow
      });
  };

  return (
    <>
      <img
        src="./assets/images/FP.svg"
        alt="forgot-password image"
        className="flex mt-[6rem] w-[15rem] ml-[35rem]"
      />
      <div className="flex mb-[5rem] justify-center">
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="max-w-md w-full p-6">
            <h1 className="text-2xl font-semibold mb-6 text-black text-center">
              Forgot Your Password?
            </h1>
            <p className="text-center">
              Please enter the email address associated with your account and we
              will email you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  onChange={handleForgotPasswordEmail}
                  value={forgotPasswordEmail}
                  type="text"
                  id="email"
                  name="email"
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                >
                  Send Request
                </button>
              </div>
            </form>

            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>
                Return to &nbsp;
                <Link to="/login" className="text-black hover:underline">
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

export default ForgotPassword;
