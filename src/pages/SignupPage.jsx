import React, { useState } from "react";
import { auth, db } from "../firebase-config";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [displayName, setDisplayName] = useState("");

    const handleSignUp = async (e) => {
        e.preventDefault();

        // Check if password and confirm password match
        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            await updateProfile(res.user, {
                displayName: displayName,
            });

            await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                email: email,
                displayName: displayName,
                timeStamp: serverTimestamp(),
            });

            // You can add additional actions like sending a verification email
            console.log("User signed up successfully!");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSignUp}>
                <h2>Sign Up</h2>
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
                <div>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Display Name:</label>
                    <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
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
};

export default SignupPage;
