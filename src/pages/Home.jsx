import React from "react";
import { Outlet } from "react-router-dom";
import HeaderNavigation from "../components/HeaderNavigation";
import Footer from "../components/Footer";

function Home() {
    return (
        <div className="pages-background">
            <div className="pages-container">
                <div className="pages-row">
                    <div className="pages-col-12">
                        <div className="pages-header-container">
                            <HeaderNavigation />
                        </div>
                    </div>
                    <div className="pages-col-12">
                        <div className="pages-section-container">
                            <Outlet />
                        </div>
                    </div>
                    <div className="pages-col-12">
                        <div className="pages-footer-container">
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
