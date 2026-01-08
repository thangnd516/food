"use client";

import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Alert,
  Switch,
  FormControlLabel,
  IconButton,
  Tooltip,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { AutoFixHigh } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

import { createCategory } from "@/slice/categorySlice";
import { runAi } from "@/ai/Ai";

import {
  formContainerStyles,
  titleStyles,
  textFieldStyles,
  alertStyles,
  submitButtonStyles,
  switchStyles,
  formInnerStyles,
} from "./categoryFormStyles";

/* -------------------- CONSTANTS -------------------- */
const categoryTypes = [
  "Restaurant",
  "Food",
  "E-commerce",
  "Booking",
  "Entertainment",
];

/* -------------------- COMPONENT -------------------- */
const CategoryForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.categories);

  const [formData, setFormData] = useState({
    name: "",
    status: true,
    show_at_home: false,
  });

  const [categoryType, setCategoryType] = useState("");
  const [localError, setLocalError] = useState("");
  const [localSuccess, setLocalSuccess] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  /* -------------------- HANDLERS -------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryTypeChange = (e) => {
    setCategoryType(e.target.value);
  };

  const handleStatusChange = (e) => {
    setFormData((prev) => ({ ...prev, status: e.target.checked }));
  };

  const handleShowAtHomeChange = (e) => {
    setFormData((prev) => ({ ...prev, show_at_home: e.target.checked }));
  };

  /* -------------------- AI GENERATE -------------------- */
  const generateCategorySuggestion = async () => {
    if (!categoryType) {
      setLocalError("Please select a category type first");
      return;
    }

    setIsGenerating(true);
    setLocalError("");

    try {
      const prompt = `Generate 15 UNIQUE category names for ${categoryType} business. 
Exactly 15 options, comma-separated, no numbering. 
Each 2–3 words, under 25 characters. 
Do not use: Basic, General, Standard, Normal, Regular.`;

      const aiResponse = await runAi(prompt);

      const suggestions = aiResponse
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length >= 3 && s.length <= 25);

      if (suggestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * suggestions.length);
        setFormData((prev) => ({
          ...prev,
          name: suggestions[randomIndex],
        }));
      }
    } catch (err) {
      setLocalError("Failed to generate category name");
    } finally {
      setIsGenerating(false);
    }
  };

  /* -------------------- SUBMIT -------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLocalError("");
    setLocalSuccess(false);

    if (!formData.name.trim()) {
      setLocalError("Category name is required");
      return;
    }

    if (!categoryType) {
      setLocalError("Category type is required");
      return;
    }

    try {
      await dispatch(
        createCategory({
          ...formData,
          type: categoryType,
        })
      ).unwrap();

      setLocalSuccess(true);
      setFormData({ name: "", status: true, show_at_home: false });
      setCategoryType("");
    } catch (err) {
      setLocalError(
        typeof err === "string"
          ? err
          : err?.message || "Failed to create category"
      );
    }
  };

  /* -------------------- RENDER -------------------- */
  return (
    <Box sx={formContainerStyles}>
      <Box sx={formInnerStyles}>
        <Typography variant="h4" sx={titleStyles} gutterBottom>
          Add New Category
        </Typography>

        {(localError || error) && (
          <Alert severity="error" sx={alertStyles}>
            {localError || error}
          </Alert>
        )}

        {localSuccess && (
          <Alert severity="success" sx={alertStyles}>
            Category created successfully!
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {/* CATEGORY TYPE */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="category-type-label">Category Type</InputLabel>
            <Select
              labelId="category-type-label"
              value={categoryType}
              label="Category Type"
              onChange={handleCategoryTypeChange}
              size={isSmallScreen ? "small" : "medium"}
            >
              {categoryTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* CATEGORY NAME */}
          <TextField
            fullWidth
            required
            label="Category Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            sx={textFieldStyles}
            size={isSmallScreen ? "small" : "medium"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Generate category name with AI">
                    <IconButton
                      onClick={generateCategorySuggestion}
                      disabled={isGenerating || !categoryType}
                    >
                      {isGenerating ? (
                        <CircularProgress size={20} />
                      ) : (
                        <AutoFixHigh sx={{ color: "red", fontSize: 26 }} />
                      )}
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />

          {/* STATUS */}
          <FormControlLabel
            sx={{ mt: 2 }}
            control={
              <Switch
                checked={formData.status}
                onChange={handleStatusChange}
                sx={switchStyles}
              />
            }
            label="Active Category"
          />

          {/* SHOW HOME */}
          <FormControlLabel
            sx={{ mb: 3 }}
            control={
              <Switch
                checked={formData.show_at_home}
                onChange={handleShowAtHomeChange}
                sx={switchStyles}
              />
            }
            label="Show on Homepage"
          />

          {/* SUBMIT */}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
            sx={submitButtonStyles}
            startIcon={
              loading ? <CircularProgress size={20} color="inherit" /> : null
            }
          >
            {loading ? "Creating..." : "Create Category"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default CategoryForm;
