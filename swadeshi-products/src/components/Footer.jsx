import React from "react";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-footer-pattern">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <img
                src="../assets/images/logo.png"
                alt="Swadeshi Products"
                className="w-[15rem]"
              />
            </Link>
          </div>
          <div className="grid grid-cols-2 w-full gap-8 sm:gap-6 sm:grid-cols-3 mx-10">
            <div>
              <h2 className="mb-6 text-sm font-bold text-gray-900 uppercase">
                Get In Touch
              </h2>
              <ul className="text-gray-500  font-medium">
                <li className="mb-4">98542168932</li>
                <li>swadeshi@sp.test</li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-bold text-gray-900 uppercase">
                About us
              </h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <Link to="/" className="hover:underline ">
                    Home
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/about" className="hover:underline">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="hover:underline">
                    Categories
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-bold text-gray-900 uppercase">
                Follow Us On
              </h2>
              <ul className="text-gray-500  font-medium">
                <li className="mb-4">
                  <Link
                    to="https://www.facebook.com"
                    className="hover:underline"
                  >
                    Facebook
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="https://www.linkedin.com"
                    className="hover:underline"
                  >
                    Linked In
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="https://www.youtube.com"
                    className="hover:underline"
                  >
                    YouTube
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://www.intagram.com"
                    className="hover:underline"
                  >
                    Instragram
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h1 className="mb-6 text-sm font-bold text-gray-900 uppercase">
              Let’s discover the authenticity of Swadeshi Products
            </h1>
            <form className="flex flex-row gap-4">
              <div className="relative">
                <input
                  type="email"
                  className="rounded-full block w-[20rem] p-4 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder="Drop your email....."
                  required
                />
              </div>
              <button
                type="submit"
                className="text-white w-[7rem] bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
              >
                Send Email
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
