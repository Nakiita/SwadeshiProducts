import React from "react";
import { Icon } from "@iconify/react";

const Contact = () => {
  return (
    <section className="py-16 text-center">
      <div className="container mx-auto flex flex-wrap justify-center items-start gap-12">
        <div className="w-full max-w-lg bg-white p-12 rounded-lg shadow-md mt-[5rem]">
          <h3 className=" text-3xl font-bold flex justify-start mb-5">
            Contact Us
          </h3>
          <form
            action="https://formspree.io/f/xvgppqvv"
            method="POST"
            className="flex flex-col gap-5"
          >
            <div className="flex flex-row gap-4">
              <div>
                <label
                  className="flex justify-start text-gray-600"
                  htmlFor="first-name"
                >
                  First Name
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded"
                  type="text"
                  name="first-name"
                  id="first-name"
                  required
                  autoComplete="off"
                />
              </div>
              <div>
                <label
                  className="flex justify-start text-gray-600"
                  htmlFor="last-name"
                >
                  Last Name
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded"
                  type="text"
                  name="last-name"
                  id="last-name"
                  required
                  autoComplete="off"
                />
              </div>
            </div>
            <div>
              <label
                className="flex justify-start text-gray-600"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full p-3 border border-gray-300 rounded"
                type="email"
                name="Email"
                id="email"
                required
                autoComplete="off"
              />
            </div>
            <div>
              <label
                className="flex justify-start text-gray-600"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded"
                name="message"
                id="message"
                cols={30}
                rows={7}
                required
                autoComplete="off"
              ></textarea>
            </div>
            <input
              className="w-full p-3 cursor-pointer bg-black text-white rounded transition-all duration-200"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
        <div className="mb-[5rem] mt-[5rem] px-2">
          <img
            src="/assets/images/contact.jpg"
            alt="Contact Us"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>

      <div className="mt-12 max-w-lg mx-auto rounded-lg overflow-hidden shadow-md">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.3676941840763!2d85.3263983754673!3d27.705931376183457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190a74aa1f23%3A0x74ebef82ad0e5c15!2sSoftwarica%20College!5e0!3m2!1sen!2snp!4v1706287803309!5m2!1sen!2snp"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};

export default Contact;
