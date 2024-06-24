import React, { useState } from "react";
import { forgotPasswordApi } from "../apis/Api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  const handleForgotPasswordEmail = (e) => {
    setForgotPasswordEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: forgotPasswordEmail,
    };

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
      <div className="flex h-screen mb-[5rem] mt-[10rem] justify-center">
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="max-w-md w-full p-6">
            <h1 className="text-2xl font-semibold mb-6 text-black text-center">
              Forgot Your Password?
            </h1>
            <p className="text-center">
              Please enter the email address associated with your account and We
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
                  type="text"
                  id="email"
                  name="email"
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
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
      {/* <section class="row min-vh-100 align-items-center">
        <div class="container py-5 d-flex justify-content-center">
          <div class="col col-md-10 col-sm-12 col-lg-8">
            <div class="card d-flex align-items-center shadow-lg">
              <div class="row">
                <div class="col-md-6 col-lg-6 order-md-1 order-lg-1 mb-4">
                  <img
                    src="https://i.pinimg.com/564x/0e/a5/4e/0ea54e5a470405dfdf3d98bf543460e5.jpg"
                    alt="login image"
                    class="img-fluid"
                    style={{ marginTop: 20 }}
                  />
                </div>

                <div class="col-md-6 col-lg-6 order-lg-3 d-flex align-items-center">
                  <div class="card-body p-5 p-lg-5 text-black">
                    <form>
                      <div class="mb-4 d-flex justify-content-center">
                        <i class="fas fa-cubes fa-2x me-2"></i>
                      </div>
                      <h3 class="fw-bold mb-3 pb-3 d-flex justify-content-center">
                       Reset Your Password
                      </h3>
                      <p className="text-center">
                        Please enter the email address associated with your
                        account and We will email you a link to reset your
                        password.
                      </p>
                     
                      <div class="form-outline mb-4">
                        <label class="form-label">Email address</label>
                        <input
                          value={forgotPasswordEmail}
                          onChange={handleForgotPasswordEmail}
                          type="email"
                          class="form-control form-control-lg border-2 border-black"
                        />
                      </div>
                      <div class="pt-1 mb-4 d-flex text-center justify-content-center">
                        <button
                          onClick={handleSubmit}
                          className="btn w-50 mb-2 btn btn-dark"
                          type="button"
                        >
                          Send Request
                        </button>
                      </div>
                      <p class="mb-5 pb-lg-2 d-flex justify-content-center">
                        Back to
                        <a
                          href="/login"
                          class="text-decoration-none text-black fw-semibold"
                        >
                          Login
                        </a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default ForgetPassword;
