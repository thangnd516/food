"use client";

import { useState } from "react";
import {
  Typography,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Box,
  Button,
} from "@mui/material";
import { FilterCard, CategoryChip } from "../productsStyles";
import { motion } from "framer-motion";

const categories = [
  { id: "all", name: "All", icon: "🍽️" },
  { id: "pizza", name: "Pizza", icon: "🍕" },
  { id: "burger", name: "Burger", icon: "🍔" },
  { id: "sushi", name: "Sushi", icon: "🍣" },
  { id: "pasta", name: "Pasta", icon: "🍝" },
  { id: "salad", name: "Salad", icon: "🥗" },
  { id: "dessert", name: "Dessert", icon: "🍰" },
  { id: "drinks", name: "Drinks", icon: "🥤" },
];

const ProductFilter = ({ onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [filters, setFilters] = useState({
    vegetarian: false,
    spicy: false,
    popular: false,
    newArrival: false,
  });

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    onFilterChange({ category: categoryId, priceRange, ...filters });
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleFilterChange = (filterName) => {
    const newFilters = { ...filters, [filterName]: !filters[filterName] };
    setFilters(newFilters);
    onFilterChange({ category: selectedCategory, priceRange, ...newFilters });
  };

  const handleReset = () => {
    setSelectedCategory("all");
    setPriceRange([0, 100]);
    setFilters({
      vegetarian: false,
      spicy: false,
      popular: false,
      newArrival: false,
    });
    onFilterChange({ category: "all", priceRange: [0, 100] });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <FilterCard>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Filters
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* Categories */}
        <Typography variant="subtitle2" fontWeight={600} mb={1}>
          Categories
        </Typography>
        <Box display="flex" flexWrap="wrap" mb={3}>
          {categories.map((category) => (
            <CategoryChip
              key={category.id}
              label={`${category.icon} ${category.name}`}
              onClick={() => handleCategoryClick(category.id)}
              className={selectedCategory === category.id ? "active" : ""}
            />
          ))}
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Price Range */}
        <Typography variant="subtitle2" fontWeight={600} mb={2}>
          Price Range
        </Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={100}
          sx={{ mb: 1 }}
        />
        <Box display="flex" justifyContent="space-between" mb={3}>
          <Typography variant="body2" color="textSecondary">
            ${priceRange[0]}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            ${priceRange[1]}
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Additional Filters */}
        <Typography variant="subtitle2" fontWeight={600} mb={1}>
          Dietary & More
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.vegetarian}
                onChange={() => handleFilterChange("vegetarian")}
              />
            }
            label="🌱 Vegetarian"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.spicy}
                onChange={() => handleFilterChange("spicy")}
              />
            }
            label="🌶️ Spicy"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.popular}
                onChange={() => handleFilterChange("popular")}
              />
            }
            label="⭐ Popular"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.newArrival}
                onChange={() => handleFilterChange("newArrival")}
              />
            }
            label="🆕 New Arrival"
          />
        </FormGroup>

        <Button
          fullWidth
          variant="outlined"
          onClick={handleReset}
          sx={{ mt: 3 }}
        >
          Reset Filters
        </Button>
      </FilterCard>
    </motion.div>
  );
};

export default ProductFilter;
