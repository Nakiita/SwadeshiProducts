import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import useHandleLogout from "../utils/handleLogout";
import getUser from "../utils/getUser";
import Search from "./Search";
import UserAvatar from "./UserAvatar";

const Navbar = () => {
  // Get user data from local storage
  const user = getUser();

  // Logout function
  const navigate = useNavigate();
  const handleLogout = useHandleLogout();
  const handleLogin = () => {
    navigate("/login");
  };

  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <nav className="bg-white fixed w-full z-20 top-0 start-0">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="../assets/images/logo.png"
            className="w-24"
            alt="Swadeshi Logo"
          />
          <span className="self-center font-bold whitespace-nowrap">
            Swadeshi <br /> Products
          </span>
        </Link>
        <div className="gap-6 ml-20 flex items-center w-full justify-between md:order-2">
          <Search />

          <ul className="flex items-center gap-10">
            <div className="flex flex-row gap-20">
              <li>
                <Link to="/">Categories</Link>
              </li>

              {user && (
                <li>
                  <Link to="/cart">
                    <FontAwesomeIcon icon={faCartShopping} />
                  </Link>
                </li>
              )}
            </div>
            {isLoginPage && (
              <>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
              </>
            )}
          </ul>

          {user ? (
            <UserAvatar user={user} handleLogout={handleLogout} />
          ) : (
            <>
              {!isLoginPage && (
                <button
                  type="button"
                  onClick={handleLogin}
                  className="text-white bg-black font-medium rounded-lg text-sm px-4 py-2 ml-4"
                >
                  Login/Register
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
