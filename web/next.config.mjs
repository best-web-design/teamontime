/** @type {import('next').NextConfig} */
export default {
  poweredByHeader: false,
  async headers() {
    return [{ source: '/admin/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }];
  },
};
