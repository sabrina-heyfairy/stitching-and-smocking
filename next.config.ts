import type { NextConfig } from "next";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // GitHub Pages serves from /<repo> unless using a custom domain / user site
  basePath: isGithubPages && repoName ? `/${repoName}` : "",
  assetPrefix: isGithubPages && repoName ? `/${repoName}/` : undefined,
};

export default nextConfig;
