/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["https://sonhlylrcjkjblcftkgy.supabase.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
