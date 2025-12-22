
"use client";

import { Box, IconButton, Typography } from "@mui/material";

import { AddPhotoAlternate } from "@mui/icons-material";

const ImageUpload = ({
    imagePreview,
    setImagePreview,
    setImageFile,
    label = "Product Thumbnail",
}) => {
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        if (!file.type.match("image.*")) {
            alert("plese select an image file");

            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("image must be less than 5mb");

            return;
        }

        setImageFile(file);

        const reader = new FileReader();

        reader.onloadend = () => {
            setImagePreview(reader.result);
        };

        reader.readAsDataURL(file);
    };

    return (
        <Box sx={{ mb: 3 }}>
            <Typography
                variant="body2"
                sx={{
                    mb: 1,
                    fontWeight: "bold",
                }}
            >
                {label}
            </Typography>

            <input
                accept="image/*"
                style={{ display: "none" }}
                id="image-upload-input"
                type="file"
                onChange={handleImageChange}
            />

            <label htmlFor="image-upload-input">
                <IconButton
                    component="span"
                    sx={{
                        p: 0,
                        width: "100%",
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            height: "300px",
                            border: "3px dashed #ccc",

                            borderRadius: 1,
                            justifyContent: "center",
                            alignItems: "center",

                            overflow: "hidden",
                            backgroundColor: "#f5f5f5",

                            "&:hover": {
                                borderColor: "red",
                            },
                        }}
                    >
                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="preview"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        ) : (
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    color: "#999",
                                }}
                            >
                                <AddPhotoAlternate sx={{ fontSize: 50, color: "red" }} />
                                <Typography>cLICK TOUPLOAD IMAGE</Typography>
                            </Box>
                        )}
                    </Box>
                </IconButton>
            </label>
        </Box>
    );
};

export default ImageUpload;