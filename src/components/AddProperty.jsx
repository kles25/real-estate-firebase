import React, { useState } from "react";
import { db, storage } from "../firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import BurstModeIcon from "@mui/icons-material/BurstMode";
import { Link, useNavigate } from "react-router-dom";

const AddProperty = () => {
    const [propertyData, setPropertyData] = useState({
        title: "",
        details: "",
        location: "",
        price: "",
        unit: "",
        amenities: "",
    });
    const [mainImage, setMainImage] = useState(null);
    const [previewImages, setPreviewImages] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [mainImageUrl, setMainImageUrl] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPropertyData({
            ...propertyData,
            [name]: value,
        });
    };

    const handleMainImageChange = (e) => {
        if (e.target.files[0]) {
            setMainImage(e.target.files[0]);
        }
    };

    const handleRemoveMainImage = () => {
        setMainImage(null);
        setMainImageUrl("");
    };

    const handlePreviewImagesChange = (e) => {
        if (e.target.files) {
            const imageFiles = Array.from(e.target.files);
            setPreviewImages((prevImages) => [...prevImages, ...imageFiles]);
        }
    };

    const handleRemovePreviewImage = (index) => {
        const updatedPreviewImages = [...previewImages];
        updatedPreviewImages.splice(index, 1);
        setPreviewImages(updatedPreviewImages);
    };

    const handleUpload = async () => {
        try {
            if (mainImage) {
                // Convert property title to lowercase and replace spaces with underscores
                const folderName = propertyData.title
                    .toLowerCase()
                    .replace(/\s+/g, "_");
                const mainImageDate = new Date().getTime();
                const mainImageStorageRef = ref(
                    storage,
                    `images/${folderName}/${mainImageDate}-${mainImage.name}`
                );
                const mainImageUploadTask = uploadBytesResumable(
                    mainImageStorageRef,
                    mainImage
                );

                // Listen for state changes, errors, and completion of the upload.
                mainImageUploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        // Get upload progress
                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                                100
                        );
                        setUploadProgress(progress);
                    },
                    (error) => {
                        // Handle unsuccessful uploads
                        console.error("Error uploading main image:", error);
                    },
                    () => {
                        // Main image upload completed successfully, get download URL
                        getDownloadURL(mainImageUploadTask.snapshot.ref).then(
                            (mainImageUrl) => {
                                console.log(
                                    "Main image uploaded successfully."
                                );

                                // Upload preview images
                                const previewImageUploadPromises =
                                    previewImages.map((previewImage) => {
                                        const previewImageDate =
                                            new Date().getTime();
                                        const previewImageStorageRef = ref(
                                            storage,
                                            `images/${folderName}/${previewImageDate}-${previewImage.name}`
                                        );
                                        const previewImageUploadTask =
                                            uploadBytesResumable(
                                                previewImageStorageRef,
                                                previewImage
                                            );
                                        return new Promise(
                                            (resolve, reject) => {
                                                previewImageUploadTask.on(
                                                    "state_changed",
                                                    null,
                                                    (error) => {
                                                        // Handle unsuccessful uploads
                                                        console.error(
                                                            "Error uploading preview image:",
                                                            error
                                                        );
                                                        reject(error);
                                                    },
                                                    () => {
                                                        // Preview image upload completed successfully, get download URL
                                                        getDownloadURL(
                                                            previewImageUploadTask
                                                                .snapshot.ref
                                                        ).then(
                                                            (downloadURL) => {
                                                                resolve(
                                                                    downloadURL
                                                                );
                                                            }
                                                        );
                                                    }
                                                );
                                            }
                                        );
                                    });

                                Promise.all(previewImageUploadPromises)
                                    .then((previewImageUrls) => {
                                        console.log(
                                            "Preview images uploaded successfully:",
                                            previewImageUrls
                                        );

                                        // Ensure all fields in propertyData are properly initialized
                                        const dataToSave = {
                                            title: propertyData.title || "",
                                            details: propertyData.details || "",
                                            location:
                                                propertyData.location || "",
                                            price: propertyData.price || "",
                                            unit: propertyData.unit || "",
                                            amenities:
                                                propertyData.amenities || "",
                                            mainImageUrl: mainImageUrl,
                                            previewImageUrls: previewImageUrls,
                                        };

                                        // Save the title, main image URL, preview image URLs, and other property data to Firestore
                                        const propertiesCollectionRef =
                                            collection(db, "properties");
                                        addDoc(
                                            propertiesCollectionRef,
                                            dataToSave
                                        )
                                            .then(() => {
                                                console.log(
                                                    "Data saved to Firestore."
                                                );
                                                navigate("/admin/properties/");
                                            })
                                            .catch((error) => {
                                                console.error(
                                                    "Error saving data to Firestore:",
                                                    error
                                                );
                                            });
                                    })
                                    .catch((error) => {
                                        console.error(
                                            "Error uploading preview images:",
                                            error
                                        );
                                    });
                            }
                        );
                    }
                );
            } else {
                console.error("No main image selected.");
            }
        } catch (error) {
            console.error("Error uploading images:", error);
        }
    };

    return (
        <div>
            <div className="db-content-header">
                <Link to="/admin/properties/">
                    <ArrowBackIosIcon />
                    <h3>Properties</h3>
                </Link>
                <h3>Add Properties</h3>
            </div>
            <div className="db-content-create">
                <div className="pages-row">
                    <div className="pages-col-6" style={{ padding: "1vh" }}>
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter title"
                            value={propertyData.title}
                            onChange={handleInputChange}
                        />

                        <input
                            type="text"
                            name="location"
                            placeholder="Enter location"
                            value={propertyData.location}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="price"
                            placeholder="Enter price"
                            value={propertyData.price}
                            onChange={handleInputChange}
                        />
                        <textarea
                            name="details"
                            placeholder="Enter details"
                            value={propertyData.details}
                            onChange={handleInputChange}
                        />
                        <textarea
                            type="text"
                            name="unit"
                            placeholder="Enter unit"
                            value={propertyData.unit}
                            onChange={handleInputChange}
                        />
                        <textarea
                            name="amenities"
                            placeholder="Enter amenities"
                            value={propertyData.amenities}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="pages-col-6" style={{ padding: "1vh" }}>
                        {mainImage ? (
                            <div>
                                <img
                                    className="main-image"
                                    src={URL.createObjectURL(mainImage)}
                                    alt="Main property"
                                />
                                <button onClick={handleRemoveMainImage}>
                                    Remove
                                </button>
                            </div>
                        ) : (
                            <>
                                <label
                                    htmlFor="file"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        color: "#094067",
                                    }}
                                >
                                    Choose Main Image
                                    <AddPhotoAlternateIcon
                                        style={{
                                            paddingLeft: "1.5vh",
                                            height: "10vh",
                                            width: "auto",
                                        }}
                                    />
                                </label>
                                <input
                                    style={{ display: "none" }}
                                    type="file"
                                    id="file"
                                    accept="image/*"
                                    onChange={handleMainImageChange}
                                />
                            </>
                        )}
                        <label
                            htmlFor="file2"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                color: "#094067",
                            }}
                        >
                            Choose Preview Images
                            <BurstModeIcon
                                style={{
                                    paddingLeft: "1.5vh",
                                    height: "10vh",
                                    width: "auto",
                                }}
                            />
                        </label>
                        <input
                            style={{ display: "none" }}
                            type="file"
                            id="file2"
                            accept="image/*"
                            onChange={handlePreviewImagesChange}
                            multiple
                        />
                        {previewImages.length > 0 && (
                            <div>
                                <div className="pages-row">
                                    {previewImages.map(
                                        (previewImage, index) => (
                                            <div
                                                className="pages-col-4"
                                                key={index}
                                            >
                                                <img
                                                    className="preview-image"
                                                    src={URL.createObjectURL(
                                                        previewImage
                                                    )}
                                                    alt={`Preview property ${
                                                        index + 1
                                                    }`}
                                                />
                                                <button
                                                    onClick={() =>
                                                        handleRemovePreviewImage(
                                                            index
                                                        )
                                                    }
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {uploadProgress > 0 && (
                    <p>Upload Progress: {uploadProgress}%</p>
                )}

                <button onClick={handleUpload}>Add</button>
            </div>
        </div>
    );
};

export default AddProperty;
