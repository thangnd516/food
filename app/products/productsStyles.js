import { styled } from '@mui/material/styles';
import { Card, Button, Chip } from "@mui/material";

export const ProductsContainer = styled('div')({
  minHeight: '100vh',
  backgroundColor: '#f9fafb',
  padding: '24px',
  '@media (min-width: 600px)': {
    padding: '32px',
  },
  '@media (min-width: 900px)': {
    padding: '48px',
  },
});

export const HeroSection = styled('div')({
  position: 'relative',
  height: '300px',
  backgroundImage: 'url(/images/food-hero.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: '24px',
  marginBottom: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  '@media (min-width: 900px)': {
    height: '400px',
  },
});

export const HeroOverlay = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.4)',
  backdropFilter: 'blur(2px)',
});

export const HeroContent = styled('div')({
  position: 'relative',
  zIndex: 1,
  color: 'white',
  textAlign: 'center',
  padding: '24px',
  '& h2': {
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: '16px',
    '@media (min-width: 600px)': {
      fontSize: '2.5rem',
    },
    '@media (min-width: 900px)': {
      fontSize: '3rem',
    },
  },
  '& p': {
    fontSize: '1rem',
    '@media (min-width: 600px)': {
      fontSize: '1.25rem',
    },
  },
});

export const ContentWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  '@media (min-width: 900px)': {
    flexDirection: 'row',
    gap: '32px',
  },
});

export const FilterSection = styled('div')({
  width: '100%',
  '@media (min-width: 900px)': {
    width: '280px',
    flexShrink: 0,
  },
});

export const FilterCard = styled(Card)({
  padding: '24px',
  borderRadius: '16px',
  boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
  position: 'sticky',
  top: '24px',
});

export const ProductsSection = styled('div')({
  flex: 1,
  minWidth: 0,
});

export const SearchBarContainer = styled('div')({
  marginBottom: '24px',
  display: 'flex',
  gap: '12px',
  flexDirection: 'column',
  '@media (min-width: 600px)': {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export const ProductsGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  gap: '24px',
  '@media (min-width: 600px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  '@media (min-width: 1200px)': {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
});

export const ProductCardStyled = styled(Card)({
  borderRadius: '16px',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0px 12px 24px rgba(0,0,0,0.15)',
  },
});

export const ProductImage = styled('div')(({ image }) => ({
  height: '240px',
  backgroundImage: `url(${image})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
}));

export const ProductBadge = styled(Chip)({
  position: 'absolute',
  top: '12px',
  right: '12px',
  fontWeight: 600,
  backgroundColor: 'rgba(255,255,255,0.95)',
});

export const ProductContent = styled('div')({
  padding: '20px',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
});

export const ProductTitle = styled('h3')({
  fontSize: '1.25rem',
  fontWeight: 600,
  marginBottom: '8px',
  color: '#1a1a1a',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
});

export const ProductDescription = styled('p')({
  fontSize: '0.875rem',
  color: '#666',
  marginBottom: '16px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  flex: 1,
});

export const ProductFooter = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 'auto',
});

export const ProductPrice = styled('div')({
  '& .current': {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#ef4444',
  },
  '& .original': {
    fontSize: '1rem',
    color: '#999',
    textDecoration: 'line-through',
    marginLeft: '8px',
  },
});

export const AddToCartButton = styled(Button)({
  backgroundColor: '#ef4444',
  color: 'white',
  padding: '8px 20px',
  borderRadius: '8px',
  textTransform: 'none',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: '#dc2626',
  },
});

export const CategoryChip = styled(Chip)({
  margin: '4px',
  borderRadius: '8px',
  '&.active': {
    backgroundColor: '#ef4444',
    color: 'white',
  },
});

export const LoadingContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '400px',
});

export const EmptyState = styled('div')({
  textAlign: 'center',
  padding: '64px 24px',
  '& img': {
    width: '200px',
    marginBottom: '24px',
    opacity: 0.5,
  },
  '& h3': {
    fontSize: '1.5rem',
    fontWeight: 600,
    marginBottom: '8px',
    color: '#666',
  },
  '& p': {
    color: '#999',
  },
});
