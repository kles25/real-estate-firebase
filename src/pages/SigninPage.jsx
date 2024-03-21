import React, { useState } from "react";
import { auth } from "../firebase-config";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";

const SigninPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const { user } = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            await updateProfile(user, {
                displayName: displayName,
            });

            toast.success("Sign in successful!");
            navigate("/verify");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSignIn}>
                <h2>Sign In</h2>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign In</button>
                <div
                    className="link-back-holder"
                    style={{ textAlign: "center" }}
                >
                    <p>
                        Forgot <Link to="/forgot-password">Password</Link>
                    </p>
                </div>
                <div className="link-back-holder" style={{ marginTop: "12vh" }}>
                    <p>
                        <Link to="/">Home</Link>
                    </p>
                    <p>
                        Go <Link to="/signup">Sign Up</Link>
                    </p>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default SigninPage;
