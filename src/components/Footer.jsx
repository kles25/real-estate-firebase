import React from "react";

const Footer = () => {
    return (
        <footer className="footer-holder">
            <div className="pages-row">
                <div className="pages-col-6 contact">
                    <div className="footer-contact">
                        <h1>Contact Us</h1>
                        <div className="pages-row">
                            <div className="pages-col-6">
                                <span
                                    className="material-symbols-outlined"
                                    style={{
                                        color: "#fffffe",
                                        fontSize: "5vh",
                                        marginBottom: "2vh",
                                    }}
                                >
                                    call
                                </span>
                                <p>
                                    Head Officer: <span>+63912 345 6789</span>
                                </p>
                                <p>
                                    Sales: <span>+63912 345 6789</span>
                                </p>
                                <p>
                                    Retail Leasing: <span>+63912 345 6789</span>
                                </p>
                                <p>
                                    Residential Leasing:
                                    <span>+63912 345 6789</span>
                                </p>
                                <p>
                                    Office Leasing: <span>+63912 345 6789</span>
                                </p>
                            </div>
                            <div className="pages-col-6">
                                <span
                                    className="material-symbols-outlined"
                                    style={{
                                        color: "#fffffe",
                                        fontSize: "5vh",
                                        marginBottom: "2vh",
                                    }}
                                >
                                    location_on
                                </span>
                                <p>Head Office:</p>
                                <span>Parañaque, Metro Manila</span>
                            </div>
                            <div className="pages-col-6">
                                <div className="soc-media-holder">
                                    <a
                                        href="https://www.facebook.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        &#66;
                                    </a>
                                    <a
                                        href="https://www.instagram.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        &#68;
                                    </a>
                                    <a
                                        href="https://twitter.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        &#65;
                                    </a>
                                    <a
                                        href="https://www.pinterest.ph/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        &#69;
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pages-col-6 map">
                    <div className="foooter-map">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61808.00807363239!2d120.97082311007883!3d14.484660417175235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ce5df9175d09%3A0x2d041bbb0b2842e5!2sPara%C3%B1aque%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1709291877812!5m2!1sen!2sph"
                            height="450"
                            style={{ border: "0", width: "100%" }}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
