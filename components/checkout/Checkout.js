"use client";

import React, { useState } from "react";


import Address from "@/components/dashboard/user/address/AddressList";
import CartSummary from "@/components/cart/CartSummary";

import { Box, Grid } from "@mui/material";

import Top from "@/components/topimage/Top";

export default function CheckoutPage() {
  const [selectedAddressCheckOut, setSelectedAddressCheckOut] = useState(null);
  const [deliveryFee, setDeliveryFee] = useState(0);

  const handleAddressSelect = (address) => {
    setSelectedAddressCheckOut(address);

    setDeliveryFee(address?.delivery_area_id?.delivery_fee || 0);
  };

  return (
    <>
      <Top />
      <Box
        sx={{
          margin: "0 auto",
          width: "100%",
          maxWidth: "1500px",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          padding: 2,
        }}
      >
        {/* Left Part - Address */}
        <Box
          sx={{
            width: { xs: "100%", md: "66.66%" },
            flex: { md: "2" },
          }}
        >
          <Address onAddressSelect={handleAddressSelect} />
        </Box>

        {/* Right Part - Cart Summary */}
        <Box
          sx={{
            width: { xs: "100%", md: "33.33%" },
          }}
        >
          <CartSummary
            selectedAddress={selectedAddressCheckOut}
            deliveryFee={deliveryFee}
            isCheckoutPage
          />
        </Box>
      </Box>
    </>
  );
}