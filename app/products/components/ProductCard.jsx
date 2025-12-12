"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ShoppingCart, Star } from "@mui/icons-material";
import {
  ProductCardStyled,
  ProductImage,
  ProductBadge,
  ProductContent,
  ProductTitle,
  ProductDescription,
  ProductFooter,
  ProductPrice,
  AddToCartButton,
} from "../productsStyles";
import { Box, Rating } from "@mui/material";
import { toast } from "react-toastify";

const ProductCard = ({ product, index }) => {
  const router = useRouter();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    toast.success(`${product.name} added to cart!`);
    // TODO: Add to cart logic
  };

  const handleCardClick = () => {
    router.push(`/products/${product._id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <ProductCardStyled onClick={handleCardClick}>
        <ProductImage image={product.image || "/images/placeholder-food.jpg"}>
          {product.discount && (
            <ProductBadge label={`-${product.discount}%`} color="error" />
          )}
          {product.isNew && (
            <ProductBadge
              label="NEW"
              color="success"
              sx={{ top: '12px', left: '12px', right: 'auto' }}
            />
          )}
        </ProductImage>

        <ProductContent>
          <ProductTitle>{product.name}</ProductTitle>

          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Rating value={product.rating || 4.5} precision={0.5} size="small" readOnly />
            <span style={{ fontSize: '0.875rem', color: '#666' }}>
              ({product.reviews || 0})
            </span>
          </Box>

          <ProductDescription>{product.description}</ProductDescription>

          <ProductFooter>
            <ProductPrice>
              <span className="current">${product.price}</span>
              {product.originalPrice && (
                <span className="original">${product.originalPrice}</span>
              )}
            </ProductPrice>

            <AddToCartButton
              startIcon={<ShoppingCart />}
              onClick={handleAddToCart}
              size="small"
            >
              Add
            </AddToCartButton>
          </ProductFooter>
        </ProductContent>
      </ProductCardStyled>
    </motion.div>
  );
};

export default ProductCard;
