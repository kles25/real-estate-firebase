import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        const redirectTimeout = setTimeout(() => {
            // Redirect to the home page after 5 seconds
            navigate("/");
        }, 2000); // 5 seconds

        return () => clearTimeout(redirectTimeout);
    }, []);

    return <div>Page Not Found Error 404</div>;
}

export default NotFound;
