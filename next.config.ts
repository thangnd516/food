import type { NextConfig } from "next";
import config from "./config.js"
const nextConfig: NextConfig = {
  env: {
    DB_URI: config.DB_URI,
    API: config.API
  }
};

export default nextConfig;
