import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../components/Footer';
import NavbarLogin from '../../components/Navbar_login';

const HomePage = () => {
    return (
        <>
            <NavbarLogin />
            <div className="container mt-5">
                {/* Top Section */}
                <div className="row">
                    <div className="col-md-4">
                        <div className="card" style={{ marginTop: '140px' }}>
                            <img
                                src="../assets/images/made-in-nepal.jpg"
                                className="card-img-top"
                                alt="Made in Nepal"
                                style={{ height: '400px', objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card" style={{ marginTop: '115px' }}>
                            <img
                                src="../assets/images/ssss.png"
                                className="card-img-top"
                                alt="Swadeshi Collection"
                                style={{ height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Discover Authenticity Section */}
                <h3 className="mt-5 mb-3">Discover Authenticity</h3>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card mb-4">
                            <img
                                src="../assets/images/dhaka.jpg"
                                className="card-img-top"
                                alt="Dhaka"
                                style={{ height: '300px', objectFit: 'cover' }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">Dhaka</h5>
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="card-text mb-0">Rs. 1300</p>
                                    <div>
                                        <FontAwesomeIcon icon={faShoppingCart} className="me-5" />
                                        <FontAwesomeIcon icon={faShoppingBag} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-4">
                            <img
                                src="../assets/images/singing-bowl.jpg"
                                className="card-img-top"
                                alt="Singing Bowl"
                                style={{ height: '300px', objectFit: 'cover' }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">Singing Bowl</h5>
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="card-text mb-0">Rs. 3000</p>
                                    <div>
                                        <FontAwesomeIcon icon={faShoppingCart} className="me-5" />
                                        <FontAwesomeIcon icon={faShoppingBag} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-4">
                            <img
                                src="../assets/images/pottery-set.jpg"
                                className="card-img-top"
                                alt="Pottery Set"
                                style={{ height: '300px', objectFit: 'cover' }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">Pottery Set</h5>
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="card-text mb-0">Rs. 1500</p>
                                    <div>
                                        <FontAwesomeIcon icon={faShoppingCart} className="me-5" />
                                        <FontAwesomeIcon icon={faShoppingBag} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default HomePage;
