import React, { useState } from "react";
import { auth } from "../firebase-config";
import { Link, Navigate } from "react-router-dom";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";

const SigninPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

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

            return <Navigate to="/admin" />;
        } catch (error) {
            setError(error.message);
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
            </form>
        </div>
    );
};

export default SigninPage;
