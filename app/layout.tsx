"use client"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/nav/topnav/TopNav"
import { Nav } from "@/components/nav/Nav";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { store } from "./store";
import { Provider } from "react-redux";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <Provider store={store}>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <ToastContainer />
            <TopNav />
            <Nav />
            {children}
          </body>
        </Provider>

      </SessionProvider>
    </html>
  );
}
