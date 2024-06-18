import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  // get user data from local storage
  const user = JSON.parse(localStorage.getItem("user"));

  //Logout function
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <header className="fixed-top bg-white sticky">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <a className="navbar-brand text-danger fw-bold" href="/">
                            <a className="navbar-brand" href="#">
                                <img
                                    src="../assets/images/logo.png"
                                    style={{
                                        width: "100px",
                                        marginLeft: "-50px",
                                    }}
                                    alt="Swadeshi Products"
                                />

                                SwadeshiProducts

                            </a>

                        </a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="true"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div
                            className="collapse navbar-collapse justify-content-center"
                            id="navbarNav"
                        >
                            <form className="d-flex mx-auto" style={{ width: "600px" }} role="search">
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Search your favorite product..."
                                    aria-label="Search"
                                    style={{ borderRadius: "80px" }}
                                />
                            </form>
              <ul className="navbar-nav">
                <li className="nav-item" style={{ marginRight: "30px" }}>
                  <a className="nav-link active" href="/">
                    Categories
                  </a>
                </li>
                <li className="nav-item" style={{ marginRight: "30px" }}>
                  <a className="nav-link active" href="#about">
                    Contact Us
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="#facility">
                    About Us
                  </a>
                </li>
              </ul>

            </div>

          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;