import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="footer bg-light text-dark py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <div className="d-flex align-items-center mb-4">
                            <a href="#" className="navbar-brand d-flex align-items-center">
                                <img
                                    src="../assets/images/logo.png"
                                    alt="Swadeshi Products"
                                    style={{ width: "80px" }}
                                />
                            </a>
                            <div className="ml-3">
                                <p className="mb-0">
                                    Get in Touch
                                    <br />
                                    98652146932
                                    <br />
                                    swadeshi@sp.test
                                </p>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-2">
                        <h5>About Us</h5>
                        <ul className="list-unstyled">
                            <li><a href="/" className="text-dark text-decoration-none">Home</a></li>
                            <li><a href="#about" className="text-dark text-decoration-none">About</a></li>
                            <li><a href="#categories" className="text-dark text-decoration-none">Categories</a></li>
                        </ul>
                    </div>
                    <div className="col-md-2">
                        <h5>Follow Us On</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="https://www.facebook.com" className="text-dark text-decoration-none">
                                    <FontAwesomeIcon icon={faFacebook} /> Facebook
                                </a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com" className="text-dark text-decoration-none">
                                    <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
                                </a>
                            </li>
                            <li>
                                <a href="https://www.youtube.com" className="text-dark text-decoration-none">
                                    <FontAwesomeIcon icon={faYoutube} /> YouTube
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com" className="text-dark text-decoration-none">
                                    <FontAwesomeIcon icon={faInstagram} /> Instagram
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-5 text-end">
                        <h5>Let's discover the authenticity of Swadeshi Products</h5>
                        <form className="d-flex mt-2">
                            <input
                                type="email"
                                className="form-control me-2"
                                placeholder="Drop your email here..."
                                aria-label="Email"
                            />
                            <button className="btn btn-dark" type="submit">Send email</button>
                        </form>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
