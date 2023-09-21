/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    unoptimized: true,
    remotePatterns:[{
      protocol:"https",
      hostname:"ipfs.io"
    }],

    domains:['ipfs.io','gateway.pinata.cloud',"https://gateway.pinata.cloud/","https://amber-delicate-yak-910.mypinata.cloud",'https://dweb.link/']
  }
}

module.exports = nextConfig
