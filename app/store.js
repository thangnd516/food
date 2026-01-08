"use client";

import { configureStore } from "@reduxjs/toolkit";

import sliderReducer from "@/slice/sliderSlice";
import categoryReducer from "@/slice/categorySlice";
import productReducer from "@/slice/productSlice";
import cartReducer from "@/slice/cartSlice";
import deliveryAreaReducer from "@/slice/deliveryAreaSlice";
import couponReducer from "@/slice/couponSlice";
import addressReducer from "@/slice/addressSlice";
// import reservationTime from "@/slice/reservationtimeSlice";
import userdeliveryAreaReducer from "@/slice/userdeliveryAreaSlice";
export const store = configureStore({
  reducer: {
    // reservationTimes: reservationTime,

    sliders: sliderReducer,

    categories: categoryReducer,

    products: productReducer,

    cart: cartReducer,

    coupons: couponReducer,

    deliveryAreas: deliveryAreaReducer,

    addresses: addressReducer,

    userdeliveryAreas: userdeliveryAreaReducer,
  },
});