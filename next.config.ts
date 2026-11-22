import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the dev-mode badge so it doesn't cover content in previews and screenshots
  devIndicators: false,
};

export default nextConfig;
