const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["imgproxy.ra.co"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

module.exports = nextConfig;
