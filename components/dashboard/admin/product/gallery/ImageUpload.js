"use client";

import { useCallback, useState } from "react";

import { Box, Typography } from "@mui/material";

import { AddPhotoAlternate } from "@mui/icons-material";

const ImageUpload = ({
  onFileSelect,
  accept = "image/*",
  disabled = false,
}) => {
  const [preview, setPreview] = useState("");

  const handleFileChange = useCallback(
    (e) => {
      const file = e.target.files?.[0];

      if (!file) return;

      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result);

        onFileSelect(file);
      };

      reader.readAsDataURL(file);
    },
    [onFileSelect]
  );
  return (
    <Box>
      <input
        accept={accept}
        style={{ display: "none" }}
        id="image-upload-input"
        type="file"
        onChange={handleFileChange}
      />

      <label htmlFor="image-upload-input">
        <Box
          sx={{
            width: 150,
            height: 150,
            border: "2px dashed #ccc",
            borderRadius: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          {preview ? (
            <img
              src={preview}
              alt="alt"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <>
              <AddPhotoAlternate sx={{ fontSize: 40, color: "red" }} />

              <Typography>Select image</Typography>
            </>
          )}
        </Box>
      </label>
    </Box>
  );
};

export default ImageUpload;