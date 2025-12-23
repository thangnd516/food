"use client";

import { useState, useEffect } from "react";

import {
  Box,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  tableStyles,
  useTheme,
  mobileTableCellStyles,
} from "@mui/material";
import { Delete, ArrowBack } from "@mui/icons-material";

import { useParams, useRouter } from "next/navigation";

import { toast } from "react-toastify";

import {
  containerStyles,
  headerStyles,
  titleStyles,
  backButtonStyles,
  formContainerStyles,
  formTitleStyles,
  formRowStyles,
  textFieldStyles,
  addButtonStyles,
  tableContainerStyles,
  deleteButtonStyles,
  dialogStyles,
} from "./productSizesStyles";
const ProductSizes = () => {
  const { id: product_id } = useParams();

  const router = useRouter();

  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [adding, setAdding] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  const [optionToDelete, setOptionToDelete] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
  });

  const fetchOptions = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.API}/admin/product-options?product_id=${product_id}`
      );

      const data = await res.json();
      setOptions(data);
    } catch (error) {
      setError("failed to load sizes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   fetchOptions();
  }, [product_id]);

  const handleAddOptions = async (e) => {
    if (!formData.name || !formData.price) {
      setError("size name and  price are required");
      return;
    }

    try {
      setAdding(true);
      setError("");

      await fetch(`${process.env.API}/admin/product-options`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          product_id,
          name: formData.name,
          price: parseFloat(formData.price),
        }),
      });

      toast.success("size added successfullly");

      setFormData({
        name: "",
        price: "",
      });
      fetchOptions()
    } catch (error) {
      setError("field to add size");
    } finally {
      setAdding(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteOptions = async () => {
    try {
      await fetch(`${process.env.API}/admin/product-options`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: optionToDelete }),
      });

      toast.success("options deleted successfully");
      fetchOptions();

      setDeleteDialogOpen(false);
    } catch (error) {
      setError("failed to delete size");
    }
  };
  return (
    <Box sx={containerStyles}>
      {/* Header with Back Button */}
      <Box sx={headerStyles}>
        <IconButton
          onClick={() => router.back()}
          sx={backButtonStyles}
          aria-label="Go back"
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" sx={titleStyles}>
          Product  Options
        </Typography>
        <Box sx={{ width: 40 }} /> {/* Spacer for balance */}
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Add Size Form */}
      <Box sx={formContainerStyles}>
        <Typography variant="subtitle1" sx={formTitleStyles}>
          Add New Options
        </Typography>
        <Box sx={formRowStyles}>
          <TextField
            label="Size Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            size="small"
            sx={textFieldStyles}
            fullWidth
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
            size="small"
            sx={textFieldStyles}
            inputProps={{ min: 0, step: 0.01 }}
            fullWidth
          />
          <Button
            variant="contained"
            onClick={handleAddOptions}
            disabled={adding || !formData.name || !formData.price}
            startIcon={adding ? <CircularProgress size={20} /> : null}
            sx={addButtonStyles}
          >
            {adding ? "Adding..." : "Add Size"}
          </Button>
        </Box>
      </Box>
 
      {/* Sizes Table */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : options.length === 0 ? (
        <Typography>No options added yet</Typography>
      ) : (
        <TableContainer component={Paper} sx={tableContainerStyles}>
          <Table sx={tableStyles}>
            <TableHead>
              <TableRow>
                <TableCell sx={mobileTableCellStyles}>Size Name</TableCell>
                <TableCell sx={mobileTableCellStyles}>Price</TableCell>
                <TableCell align="right" sx={mobileTableCellStyles}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {options.map((size) => (
                <TableRow key={size._id}>
                  <TableCell sx={mobileTableCellStyles}>{size.name}</TableCell>
                  <TableCell sx={mobileTableCellStyles}>
                    ${size.price.toFixed(2)}
                  </TableCell>
                  <TableCell align="right" sx={mobileTableCellStyles}>
                    <IconButton
                      onClick={() => {
                        setOptionToDelete(size._id);
                        setDeleteDialogOpen(true);
                      }}
                      sx={deleteButtonStyles}
                      size={isSmallScreen ? "small" : "medium"}
                    >
                      <Delete fontSize={isSmallScreen ? "small" : "medium"} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Delete Confirmation Dialog */}

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        sx={dialogStyles}
      >
        <DialogTitle>Delete Size</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this size?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteOptions} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductSizes;