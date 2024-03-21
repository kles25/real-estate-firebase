import React, { useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import { db } from "../firebase-config";
import { collection, onSnapshot, query } from "firebase/firestore";

function ListProperty() {
    const [condos, setCondos] = useState([]);
    const [selectedCity, setSelectedCity] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const condosPerPage = 4;

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, "properties")),
            (snapshot) => {
                const fetchedCondos = [];
                snapshot.forEach((doc) => {
                    const property = doc.data();
                    fetchedCondos.push({
                        name: property.title,
                        image: property.mainImageUrl,
                        location: property.location,
                        price: property.price,
                        link: `/${property.location}/${doc.id}`, // Adjust the link as needed
                    });
                });
                setCondos(fetchedCondos);
            }
        );
        return () => unsubscribe();
    }, []);

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
        setCurrentPage(1); // Reset page number when city changes
    };

    const filteredCondos =
        selectedCity === "all"
            ? condos
            : condos.filter((condo) => condo.location === selectedCity);
    const totalPages = Math.ceil(filteredCondos.length / condosPerPage);
    const startIndex = (currentPage - 1) * condosPerPage;
    const endIndex = Math.min(
        startIndex + condosPerPage,
        filteredCondos.length
    );
    const displayedCondos = filteredCondos.slice(startIndex, endIndex);

    const handlePageChange = (page) => setCurrentPage(page);

    return (
        <div className="">
            <div className="db-content-header">
                <h3>Properties</h3>
                <Link to="/admin/add-properties/">
                    <h3>Add Properties</h3>
                    <ArrowForwardIosIcon />
                </Link>
            </div>
            <section className="property-section">
                <div className="property-holder">
                    <h2>LOCATION</h2>
                    <select value={selectedCity} onChange={handleCityChange}>
                        <option value="all">All Locations</option>
                        <option value="Makati">Makati</option>
                        <option value="Pasay">Pasay</option>
                    </select>
                </div>
                <div className="pages-row">
                    {displayedCondos.map((condo) => (
                        <div className="condo pages-col-3" key={condo.name}>
                            <a href={condo.link}>
                                <img src={condo.image} alt={condo.name} />
                            </a>
                            <h3>{condo.name}</h3>
                            <p>{condo.location}</p>
                            <p>{condo.price}</p>
                        </div>
                    ))}
                </div>
                <div className="pagination-holder">
                    {Array.from(
                        { length: totalPages },
                        (_, index) => index + 1
                    ).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={page === currentPage ? "active" : ""}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default ListProperty;
