import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";

const navLinks = [
    { path: "/", label: "Home" },
    { path: "/properties", label: "Properties" },
    { path: "/contactus", label: "Contact Us" },
];

const HeaderNavigation = () => {
    const [hideHeader, setHideHeader] = useState(false);
    const [showHeader, setShowHeader] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const scrollThreshold = 80;
            const scrollTop =
                document.documentElement.scrollTop || document.body.scrollTop;
            const scrollingDown = scrollTop > scrollThreshold;

            setHideHeader(scrollingDown);
            if (!scrollingDown && scrollTop > 0) {
                setShowHeader(scrollingDown);
            } else {
                setShowHeader(scrollingDown);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/signout");
    };

    return (
        <div>
            <header className={hideHeader ? "header-one hidden" : "header-one"}>
                <div className="header-holder">
                    <div className="logo-holder">
                        <Link to={"/"}>X</Link>
                    </div>
                    <div className="nav-link-holder">
                        {navLinks.map(({ path, label }, index) => (
                            <Link
                                to={path}
                                key={index}
                                className="navigations-link"
                            >
                                {label}
                            </Link>
                        ))}
                        <button onClick={toggleDropdown} className="dropbtn">
                            My Account
                        </button>
                        {showDropdown && (
                            <div className="dropdown-content">
                                {!currentUser && (
                                    <>
                                        <Link
                                            to="/signin"
                                            className="navigations-link"
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            to="/signup"
                                            className="navigations-link"
                                        >
                                            Sign Up
                                        </Link>
                                    </>
                                )}
                                {currentUser && (
                                    <>
                                        <Link
                                            to="/admin"
                                            className="navigations-link"
                                        >
                                            Admin
                                        </Link>
                                        <Link
                                            className="navigations-link"
                                            onClick={handleLogout}
                                        >
                                            Sign Out
                                        </Link>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </header>
            <header className={showHeader ? "header-two show" : "header-two"}>
                <div className="header-holder">
                    <div className="logo-holder">
                        <Link to={"/"}>X</Link>
                    </div>
                    <div className="nav-link-holder">
                        {navLinks.map(({ path, label }, index) => (
                            <Link
                                to={path}
                                key={index}
                                className="navigations-link"
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>
            </header>
        </div>
    );
};

export default HeaderNavigation;
