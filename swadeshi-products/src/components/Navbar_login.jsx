import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const NavbarLogin = () => {
    // Get user data from local storage
    const user = JSON.parse(localStorage.getItem("user"));

    // Logout function
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
                        <Link className="navbar-brand d-flex align-items-center" to="/">
                            <img
                                src="../assets/images/logo.png"
                                style={{ width: "100px" }}
                                alt="Swadeshi Products"
                            />
                            <div>
                                <span className="d-block" style={{ fontWeight: "bold", fontSize: "18px" }}>Swadeshi</span>
                                <span className="d-block" style={{ fontWeight: "bold", fontSize: "18px" }}>Products</span>
                            </div>
                        </Link>
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
                                <li className="nav-item" style={{ marginRight: "80px" }}>
                                    <a className="nav-link active" href="/">
                                        Categories
                                    </a>
                                </li>
                                {user && (
                                    <li className="nav-item" style={{ marginRight: "80px" }}>
                                        <a className="nav-link active" href="/cart">
                                            <FontAwesomeIcon icon={faCartShopping} />
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>

                        <form className="d-flex gap-2">
                            {user ? (
                                <div className="dropdown">
                                    <button
                                        className="btn btn-dark dropdown-toggle"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        {user.UserName}
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link className="dropdown-item" to="profile">
                                                Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/history">
                                                Order History
                                            </Link>
                                        </li>
                                        <li>
                                            <button onClick={handleLogout} className="dropdown-item">
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <button
                                    className="btn btn-dark"
                                    onClick={handleLogin}
                                    style={{ borderRadius: "20px", padding: "10px 20px" }}
                                >
                                    Login / Register
                                </button>
                            )}
                        </form>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default NavbarLogin;
