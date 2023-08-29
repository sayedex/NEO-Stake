/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    unoptimized: true,
    domains:['ipfs.io','gateway.pinata.cloud',"https://gateway.pinata.cloud/","https://amber-delicate-yak-910.mypinata.cloud"]
  }
}

module.exports = nextConfig
