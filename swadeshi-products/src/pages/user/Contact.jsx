import React from "react";
import NavbarLogin from "../../components/Navbar";
import Footer from "../../components/Footer";

const Contact = () => {
  return (
    <>
      <NavbarLogin />
      <div class="container contact-section">
        <div class="row" style={{ marginTop: "180px" }}>
          <div class="col-md-6">
            <h2>Contact Us</h2>
            <form>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="firstName">First name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="firstName"
                    placeholder="Jane"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="lastName">Last name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="lastName"
                    placeholder="Smitherton"
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="emailAddress">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="emailAddress"
                  placeholder="email@janesfakedomain.net"
                />
              </div>
              <div class="form-group">
                <label for="message">Your message</label>
                <textarea
                  class="form-control"
                  id="message"
                  rows="4"
                  placeholder="Enter your question or message"
                ></textarea>
              </div>

              <button className="btn w-25 mb-2 btn btn-dark" type="button">
                Submit
              </button>
            </form>
            <div class="chat mt-4">
              <img src="" alt="Chat Icon" />
              <span>Chat with super admin.</span>
            </div>
          </div>
          <div class="col-md-6">
            <img src="../assets/images/contact.jpg" alt="Nepali Handicrafts" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Contact;
