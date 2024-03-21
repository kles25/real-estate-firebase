import React, { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { AuthContext } from "../context/AuthContext";

const navLinks = [
    { path: "/admin/users", label: "Users" },
    { path: "/admin/properties", label: "Properties" },
];

function AdminPage() {
    const [activeLink, setActiveLink] = useState("/admin"); // Set the default active link
    const handleNavClick = (link) => {
        setActiveLink(link);
    };
    const [showProfileIcon, setShowProfileIcon] = useState(false);
    const handleIcon = () => setShowProfileIcon(!showProfileIcon);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/signout");
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-holder">
                <div className="pages-row">
                    <div className="pages-col-2">
                        <div className="dashboard-nav">
                            <div className="db-logo-holder">
                                <Link to="/">X</Link>
                            </div>
                            <div className="db-logo-nav">
                                {navLinks.map(({ path, label }, index) => (
                                    <Link
                                        to={path}
                                        key={index}
                                        className={`navigations-link ${
                                            activeLink === path ? "active" : ""
                                        }`}
                                        onClick={() => handleNavClick(path)}
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="pages-col-10">
                        <div className="pages-row">
                            <div className="pages-col-12">
                                <div className="dashboard-header">
                                    <PersonIcon onClick={handleIcon} />
                                    <div
                                        className={
                                            showProfileIcon
                                                ? "icon-dropdown active"
                                                : "icon-dropdown"
                                        }
                                    >
                                        <Link className="profile-links" to="">
                                            <AccountCircleIcon />
                                            <p>{currentUser.displayName}</p>
                                        </Link>
                                        <Link className="profile-links" to="/">
                                            <HomeIcon />
                                            <p>Homepage</p>
                                        </Link>
                                        <Link className="profile-links">
                                            <ExitToAppIcon />
                                            <p onClick={handleLogout}>
                                                Log Out
                                            </p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="pages-col-12">
                                <div className="dashboard-content">
                                    <Outlet />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
