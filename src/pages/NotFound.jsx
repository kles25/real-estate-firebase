import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
    // Use useEffect to navigate to the home page after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            // Navigate to the home page after 3 seconds
            navigate("/");
        }, 3000); // 3 seconds delay

        // Cleanup function to clear the timer if component unmounts before 3 seconds
        return () => clearTimeout(timer);
    }, []); // Empty dependency array ensures the effect runs only once

    // Render a loader or message during the 3-second delay
    return (
        <div className="default-page-container">
            <div className="text-loader">
                Page Not Found, Redirecting to Home
            </div>
            <div className="loader"></div>
        </div>
    );
}

export default NotFound;
