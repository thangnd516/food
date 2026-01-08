"use client";
import CategoryTable from "@/components/dashboard/admin/category/list/CategoryTable";
import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { fetchCategories } from "@/slice/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { list: categories = [], loading } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    const load = async () => {
      try {
        await dispatch(fetchCategories()).unwrap();
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, [dispatch]);

  const handleEdit = (id) => {
    router.push(`/dashboard/admin/category/edit/${id}`);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5">Categories Management</Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: "red", "&:hover": { backgroundColor: "darkred" } }}
          onClick={() => router.push("/dashboard/admin/category/create")}
        >
          Add New Category
        </Button>
      </Box>

      {loading ? (
        <Box>Loading...</Box>
      ) : (
        <CategoryTable categories={categories} onEdit={handleEdit} />
      )}
    </Box>
  );
};

export default CategoriesPage;
