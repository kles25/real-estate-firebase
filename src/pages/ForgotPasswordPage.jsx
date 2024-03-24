import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from "../firebase-config";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { collection, getDocs, query, where } from "firebase/firestore";

function ForgotPasswordPage() {
    const [email, setEmail] = useState("");

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            if (!email) {
                toast.error("Email is required.");
                return;
            }

            // Query the Firestore users collection to check if the email exists
            const usersRef = collection(db, "users");
            const usersSnapshot = await getDocs(
                query(usersRef, where("email", "==", email))
            );

            if (usersSnapshot.empty) {
                toast.error("Email not registered.");
                return;
            }

            // If the email is registered, send the password reset email
            await sendPasswordResetEmail(auth, email);
            toast.success("Check your Email for password reset");
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleResetPassword}>
                <h2>Forgot Password</h2>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Reset Password</button>
                <div className="link-back-holder">
                    <p>
                        Go Back to <Link to="/">Home</Link>
                    </p>
                    <p>
                        Go <Link to="/signin">Sign In</Link>
                    </p>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default ForgotPasswordPage;
