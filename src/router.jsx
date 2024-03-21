import React, { useContext, useEffect, useState } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import NotFound from "./pages/NotFound";
import UnAuthorized from "./pages/UnAuthorized";
import Home from "./pages/Home";
import HomePage from "./pages/HomePage";
import PropertyPage from "./pages/PropertyPage";
import ContactPage from "./pages/ContactPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import AdminPage from "./pages/AdminPage";
import ListUser from "./components/ListUser";
import ListProperty from "./components/ListProperty";
import AddProperty from "./components/AddProperty";
import { AuthContext } from "./context/AuthContext";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import SignoutPage from "./pages/SignoutPage";
import VerifyPage from "./pages/VerifyPage";

const TIMEOUT_DURATION = 3000;

const DelayedRoute = ({ element }) => {
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, TIMEOUT_DURATION);

        return () => clearTimeout(timer);
    }, []);

    return showLoader ? (
        <div className="default-page-container">
            <div className="text-loader">Page Loading</div>
            <div className="loader"></div>
        </div>
    ) : (
        element
    );
};

const PrivateRoute = ({ element }) => {
    const { currentUser } = useContext(AuthContext); // Access currentUser from the authentication context

    // If currentUser is null (user is not authenticated), redirect to the SigninPage
    if (!currentUser) {
        return <Navigate to="/signin" />;
    }

    // If user is authenticated, render the original element
    return element;
};

const AuthRoute = ({ element }) => {
    const { currentUser } = useContext(AuthContext); // Access currentUser from the authentication context

    // If currentUser is not null (user is authenticated), redirect to the AdminPage
    if (currentUser) {
        return <Navigate to="/admin" />;
    }

    // If user is not authenticated, render the original element
    return element;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <DelayedRoute element={<Home />} />,
        children: [
            {
                path: "/",
                element: <Navigate to="/home" />,
            },
            {
                path: "/home",
                element: <HomePage />,
            },
            {
                path: "/properties",
                element: <PropertyPage />,
            },
            {
                path: "/contactus",
                element: <ContactPage />,
            },
        ],
    },
    {
        path: "/admin",
        element: <PrivateRoute element={<AdminPage />} />,
        children: [
            {
                path: "/admin",
                element: <Navigate to="/admin/users" />,
            },
            {
                path: "/admin/users",
                element: <ListUser />,
            },
            {
                path: "/admin/properties",
                element: <ListProperty />,
            },
            {
                path: "/admin/add-properties",
                element: <AddProperty />,
            },
        ],
    },
    {
        path: "/signin",
        element: <AuthRoute element={<SigninPage />} />,
    },
    {
        path: "/signup",
        element: <AuthRoute element={<SignupPage />} />,
    },
    {
        path: "/signout",
        element: <AuthRoute element={<SignoutPage />} />,
    },
    {
        path: "/forgot-password",
        element: <AuthRoute element={<ForgotPasswordPage />} />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
    {
        path: "/unauthorized",
        element: <UnAuthorized />,
    },
]);

export default router;
