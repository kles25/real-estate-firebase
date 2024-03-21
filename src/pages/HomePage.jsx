import React from "react";
import { Link } from "react-router-dom";
import PreviewCarousel from "../components/PreviewCarousel";

function HomePage() {
    return (
        <>
            <section className="hero-section">
                <div className="hero-container">
                    <div className="hero-content">
                        <h1>X Real Estate Inc.</h1>
                        <p>
                            Discover your dream property with us. Expertise,
                            personalized service, and transparent communication
                            await. Let's find your perfect home together.
                        </p>
                        <Link to="/properties">
                            <button>Learn More</button>
                        </Link>
                    </div>
                </div>
            </section>
            <section className="preview-section">
                <PreviewCarousel />
            </section>
        </>
    );
}

export default HomePage;
