import React, { useState } from "react";
import PageBanner from "../components/PageBanner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        formData.append("access_key", "e676e8ca-f993-411d-9dc3-6a3854c1cad3");

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: json,
        }).then((res) => res.json());

        if (res.success) {
            console.log("Success", res);
            // Reset the form fields
            setName("");
            setEmail("");
            setMessage("");
            // Show toast notification
            toast.success("Form submitted successfully!");
        } else {
            // Show toast notification for failure
            toast.error("Failed to submit form. Please try again.");
        }
    };

    return (
        <>
            <PageBanner title="CONTACT US" />
            <section className="contact-section">
                <div className="form-container">
                    <form onSubmit={onSubmit}>
                        <h3>For other inquiries, you may reach us via email</h3>
                        <div className="form-input">
                            <label htmlFor="">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-input">
                            <label htmlFor="">Email</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-input">
                            <label htmlFor="">Message</label>
                            <textarea
                                rows="6"
                                placeholder="Your Inquiry"
                                name="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="form-button">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </section>
            <ToastContainer />
        </>
    );
}

export default ContactPage;
