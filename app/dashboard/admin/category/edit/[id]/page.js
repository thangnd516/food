"use client";

import { useEffect, useState } from "react";

import { Box, CircularProgress, Typography } from "@mui/material";

import CategoryForm from "@/components/dashboard/admin/category/edit/CategoryEditForm";

import { fetchCategoryById, updateCategory } from "@/slice/categorySlice";

import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";

const EditCategoryPage = () => {
  const { id } = useParams();

  const router = useRouter();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const [categoryData, setCategoryData] = useState(null);

  const { loading: updateLoading } = useSelector((state) => state.categories);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dispatch(fetchCategoryById(id)).unwrap();

        console.log("category single data", data);
        setCategoryData(data);
      } catch (error) {
        router.push("/dashboard/admin/category/list");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, dispatch, router]);

  const handleSubmit = async (values) => {
    try {
      await dispatch(
        updateCategory({
          id,
          categoryData: values,
        })
      ).unwrap();
      router.push("/dashboard/admin/category/list");
    } catch (error) {
      console.log("Failed to update  category", error);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!categoryData) {
    return (
      <Box
        sx={{
          textAlign: "center",
          mt: 4,
        }}
      >
        <Typography>Category not found</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        edit Category
      </Typography>

      <CategoryForm
        initialValues={categoryData}
        onSubmit={handleSubmit}
        onCancel={() => router.push("/dashboard/admin/category/list")}
        loading={updateLoading}
      />
    </Box>
  );
};

export default EditCategoryPage;