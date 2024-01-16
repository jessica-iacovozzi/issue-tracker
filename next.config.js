/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*', // Affects all endpoints
        headers: [
          { key: 'referrer-policy', value: 'no-referrer' } // To fix rendering of google avatar
        ]
      }
    ]
  }
}

module.exports = nextConfig
