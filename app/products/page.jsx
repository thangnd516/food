"use client";

import { useState, useEffect } from "react";
import { Typography, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import {
  ProductsContainer,
  HeroSection,
  HeroOverlay,
  HeroContent,
  ContentWrapper,
  FilterSection,
  ProductsSection,
  ProductsGrid,
  LoadingContainer,
  EmptyState,
} from "./productsStyles";
import ProductCard from "./components/ProductCard";
import ProductFilter from "./components/ProductFilter";
import ProductSearch from "./components/ProductSearch";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/products");
      const data = await res.json();
      
      if (data.success) {
        setProducts(data.data);
        setFilteredProducts(data.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters
  useEffect(() => {
    let result = [...products];

    // Category filter
    if (filters.category && filters.category !== "all") {
      result = result.filter((p) => p.category === filters.category);
    }

    // Price range filter
    if (filters.priceRange) {
      result = result.filter(
        (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
      );
    }

    // Additional filters
    if (filters.vegetarian) {
      result = result.filter((p) => p.isVegetarian);
    }
    if (filters.spicy) {
      result = result.filter((p) => p.isSpicy);
    }
    if (filters.popular) {
      result = result.filter((p) => p.isPopular);
    }
    if (filters.newArrival) {
      result = result.filter((p) => p.isNew);
    }

    // Search filter
    if (searchTerm) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        // popular - keep original order
        break;
    }

    setFilteredProducts(result);
  }, [products, filters, searchTerm, sortBy]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSort = (sortValue) => {
    setSortBy(sortValue);
  };

  return (
    <ProductsContainer>
      {/* Hero Section */}
      <HeroSection
        as={motion.div}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <HeroOverlay />
        <HeroContent>
          <Typography variant="h2">Delicious Food Menu</Typography>
          <Typography variant="body1">
            Explore our wide variety of mouth-watering dishes
          </Typography>
        </HeroContent>
      </HeroSection>

      {/* Content */}
      <ContentWrapper>
        {/* Filter Sidebar */}
        <FilterSection>
          <ProductFilter onFilterChange={handleFilterChange} />
        </FilterSection>

        {/* Products Section */}
        <ProductsSection>
          {/* Search & Sort */}
          <ProductSearch onSearch={handleSearch} onSort={handleSort} />

          {/* Products Count */}
          <Typography variant="body2" color="textSecondary" mb={2}>
            Showing {filteredProducts.length} of {products.length} products
          </Typography>

          {/* Loading State */}
          {loading && (
            <LoadingContainer>
              <CircularProgress size={60} />
            </LoadingContainer>
          )}

          {/* Empty State */}
          {!loading && filteredProducts.length === 0 && (
            <EmptyState>
              <img src="/images/empty-food.svg" alt="No products" />
              <Typography variant="h6">No products found</Typography>
              <Typography variant="body2">
                Try adjusting your filters or search term
              </Typography>
            </EmptyState>
          )}

          {/* Products Grid */}
          {!loading && filteredProducts.length > 0 && (
            <ProductsGrid>
              {filteredProducts.map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))}
            </ProductsGrid>
          )}
        </ProductsSection>
      </ContentWrapper>
    </ProductsContainer>
  );
};

export default ProductsPage;
