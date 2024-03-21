import React, { useState } from "react";
import { auth, db } from "../firebase-config";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState(null);

    const handleSignUp = async (e) => {
        e.preventDefault();
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
            setError(error.message);
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

export default SignupPage;
