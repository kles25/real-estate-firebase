import React from "react";

function PageBanner({ title }) {
    return (
        <section className="section-banner">
            <div className="banner-holder">
                <h1>{title}</h1>
            </div>
        </section>
    );
}

export default PageBanner;
