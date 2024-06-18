import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    <section class="vh-100">
      <div class="container py-5 d-flex justify-content-center">
        <div className="col col-md-10 col-sm-12 col-lg-5">
          <div
            class="card d-flex align-items-center shadow-lg"
            style={{
              background: "linear-gradient(to top, #ffffff, #61C0BF)",
            }}
          >
            <div class="col-md-6 col-lg-9 d-flex align-items-center">
              <div class="card-body p-8 p-lg-5 text-black">
                <form>
                  <div class=" mb-9 pb-10 ">
                    <i class="fas fa-cubes fa-2x me-2 d-flex justify-content-center"></i>
                  </div>
                  <h3 class="fw-bold mb-3 pb-3 d-flex justify-content-center">
                    Forgot Password?
                  </h3>
                  <div class="form-outline mb-4">
                    <label class="form-label">Enter New Password</label>
                    <input
                      value={newPassword}
                      onChange={handleNewPassword}
                      type="email"
                      class="form-control form-control-lg border-2 border-black"
                    />
                  </div>
                  <div class="pt-1 mb-4 d-flex text-center justify-content-center">
                    <button
                      onClick={handleResetPassword}
                      className="btn w-50 mb-2 btn btn-dark"
                      type="button"
                    >
                      Reset Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;