"use client";

import { useState } from "react";

import {
  IconButton,
  Box,
  CardMedia,
  CardContent,
  Typography,
  Modal,
  useMediaQuery,
  useTheme,
  Rating,
} from "@mui/material";

import Link from "next/link";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CompareIcon from "@mui/icons-material/Compare";
import VisibilityIcon from "@mui/icons-material/Visibility";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import Model from "./Model";
import {
  StyledCard,
  CategoryChip,
  PriceContainer,
  RatingBox,
} from "./PostCardStyles";


const PostCard = ({ post }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    title = "Product title",
    categories = "uncategoried",
    rating = 4.5,
    imageUrl = "/images/12.jpg",
    price = "$0.00",
    product_slug,
  } = post;

  return (
    <>
      <StyledCard>
        <Box
          sx={{
            position: "relative",
          }}
        >
          <CategoryChip label={categories} size="small" />
          <CardMedia
            component="img"
            image={imageUrl}
            alt={title}
            sx={{
              height: isMobile ? 180 : 220,
              width: "100%",
              objectFit: "cover",
            }}
          />

          <PriceContainer>
            <Typography variant="body2">{price}</Typography>
          </PriceContainer>
          <IconButton
            sx={{
              position: "absolute",
              top: theme.spacing(1),
              color: theme.palette.common.white,
              backgroundColor: "rgba(0,0,0,0.3)",

              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.5)",
              },
            }}
            size={isMobile ? "small" : "medium"}
          >
            <FavoriteBorderIcon size={isMobile ? "small" : "medium"} />
          </IconButton>
        </Box>

        <CardContent
          sx={{
            p: 2,

            backgroundColor: "background.paper",
            borderTop: "1px solid #ccc",
          }}
        >
          <RatingBox>
            <Rating
              name="product-rating"
              value={rating}
              precision={0.5}
              size={isMobile ? "small" : "medium"}
              readOnly
              sx={{
                color: "#fc9403",
              }}
            />
            <Typography variant="body2" color="text.secondary">
              ({rating})
            </Typography>
          </RatingBox>

          <Typography
            gutterBottom
            variant={isMobile ? "body1" : "h6"}
            component="div"
            sx={{
              fontWeight: 600,
              textAlign: "center",
              minHeight: isMobile ? "40px" : "60px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {title}
          </Typography>

          <Box
            display="flex"
            justifyContent="space-between"
            sx={{
              pt: 1,
            }}
          >
            <IconButton
              onClick={handleOpen}
              sx={{
                color: theme.palette.error.main,
              }}
              size={isMobile ? "small" : "medium"}
            >
              <ShoppingCartIcon fontSize={isMobile ? "small" : "medium"} />
            </IconButton>

            <IconButton
              aria-label="compare"
              onClick={handleOpen}
              sx={{
                color: theme.palette.error.main,
              }}
              size={isMobile ? "small" : "medium"}
            >
              <CompareIcon fontSize={isMobile ? "small" : "medium"} />
            </IconButton>

            <Link href={`/product/${product_slug}`} passHref>
              <IconButton
                aria-label="quick view"
                onClick={handleOpen}
                sx={{
                  color: theme.palette.error.main,
                }}
                // component="a"
                // rel="noopener"
                size={isMobile ? "small" : "medium"}
              >
                <VisibilityIcon fontSize={isMobile ? "small" : "medium"} />
              </IconButton>
            </Link>
          </Box>
        </CardContent>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            "& .MuiBackdrop-root": {
              backgroundColor: "rgba(252,247,247,0.8)",
            },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: {
                xs: "90%",
                sm: "80%",
              },
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: 2,
              outline: "none",
            }}
          >
            <Box sx={{ p: 3 }}>
             
             <Model 
isMobile={isMobile}
product={post}

onClose={()=>setOpen(false)}

/> 
            </Box>
          </Box>
        </Modal>
      </StyledCard>
    </>
  );
};

export default PostCard;