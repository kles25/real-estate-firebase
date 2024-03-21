import React, { useState, useEffect } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase-config";

const PreviewCarousel = () => {
    const [slides, setSlides] = useState([]);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, "properties")),
            (snapshot) => {
                const fetchedSlides = snapshot.docs.map((doc) => {
                    const property = doc.data();

                    return {
                        title: property.title,
                        details: property.details,
                        images: property.previewImageUrls,
                    };
                });
                setSlides(fetchedSlides);
            },
            (error) => {
                console.error("Error fetching events:", error);
            }
        );

        return () => {
            unsubscribe(); // Cleanup the listener on component unmount
        };
    }, []);

    const currentSlide = slides[currentSlideIndex];

    const goToPreviousSlide = () => {
        const newIndex =
            (currentSlideIndex - 1 + slides.length) % slides.length;
        setCurrentSlideIndex(newIndex);
    };

    const goToNextSlide = () => {
        const newIndex = (currentSlideIndex + 1) % slides.length;
        setCurrentSlideIndex(newIndex);
    };

    return (
        <div className="carousel">
            <div className="pages-row">
                <div className="pages-col-6">
                    <div className="carousel-image-holder">
                        <div className="pages-row">
                            <div className="pages-col-5">
                                <div className="carousel-image-one">
                                    <img
                                        src={currentSlide?.images[0]}
                                        alt="Carousel Image One"
                                    />
                                </div>
                            </div>
                            <div className="pages-col-7"></div>
                            <div className="pages-col-12">
                                <div className="carousel-image-two">
                                    <img
                                        src={currentSlide?.images[1]}
                                        alt="Carousel Image Two"
                                    />
                                </div>
                            </div>
                            <div className="pages-col-7"></div>
                            <div className="pages-col-5">
                                <div className="carousel-image-one">
                                    <img
                                        src={currentSlide?.images[2]}
                                        alt="Carousel Image Three"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-image-holder"></div>
                </div>
                <div className="pages-col-6">
                    <div className="carousel-slide-holder">
                        <div className="slide-details">
                            <h1>{currentSlide?.title}</h1>
                            <p className="event-details">
                                {currentSlide?.details}
                            </p>
                        </div>
                        <div className="carousel-buttons">
                            <a
                                onClick={goToPreviousSlide}
                                className="arrow-nav"
                            >
                                &#10094;
                            </a>
                            <a onClick={goToNextSlide} className="arrow-nav">
                                &#10095;
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewCarousel;
