import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase-config";
import { Link } from "react-router-dom";

function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [resetSent, setResetSent] = useState(false);
    const [error, setError] = useState(null);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            if (!email) {
                setError("Email is required.");
                return;
            }
            await sendPasswordResetEmail(auth, email);
            setResetSent(true);
            setError(null);
        } catch (err) {
            setError(err.message);
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
                        Go <Link to="/signup">Sign Up</Link>
                    </p>
                </div>
                {error && (
                    <p
                        style={{
                            color: "red",
                            fontSize: "1.7vh",
                            fontWeight: "300",
                            marginTop: "2vh",
                        }}
                    >
                        {error}
                    </p>
                )}
                {resetSent && (
                    <p
                        style={{
                            color: "red",
                            fontSize: "1.7vh",
                            fontWeight: "300",
                            marginTop: "2vh",
                        }}
                    >
                        Password reset email sent. Check your inbox.
                    </p>
                )}
            </form>
        </div>
    );
}

export default ForgotPasswordPage;
