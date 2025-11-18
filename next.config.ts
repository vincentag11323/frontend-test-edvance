import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*", //rewrites any calls to /api to destination host.
  //       destination: "http://api.themoviedb.org/3/discover/*", 
  //     },
  //   ];
  // },
              // domains: ['assets.example.com', 'another-cdn.com'], // Replace with your image domains

  images:{
    domains:['image.tmdb.org']
  }
};

export default nextConfig;
