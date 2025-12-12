"use client";

import { useState } from "react";
import { TextField, InputAdornment, IconButton, Select, MenuItem } from "@mui/material";
import { Search, Sort } from "@mui/icons-material";
import { SearchBarContainer } from "../productsStyles";
import { motion } from "framer-motion";

const ProductSearch = ({ onSearch, onSort }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleSort = (e) => {
    const value = e.target.value;
    setSortBy(value);
    onSort(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SearchBarContainer>
        <TextField
          fullWidth
          placeholder="Search for delicious food..."
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
            },
          }}
        />

        <Select
          value={sortBy}
          onChange={handleSort}
          startAdornment={
            <InputAdornment position="start">
              <Sort />
            </InputAdornment>
          }
          sx={{
            minWidth: '200px',
            borderRadius: '12px',
          }}
        >
          <MenuItem value="popular">Most Popular</MenuItem>
          <MenuItem value="price-low">Price: Low to High</MenuItem>
          <MenuItem value="price-high">Price: High to Low</MenuItem>
          <MenuItem value="rating">Highest Rated</MenuItem>
          <MenuItem value="newest">Newest First</MenuItem>
        </Select>
      </SearchBarContainer>
    </motion.div>
  );
};

export default ProductSearch;
