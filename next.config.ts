/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel bisa mengoptimasi gambar, jadi kita tidak wajib pakai unoptimized
  images: {
    unoptimized: false, 
  },
  typescript: {
    // Tambahkan ini jika ingin build tetap lanjut meski ada error type
    ignoreBuildErrors: true, 
  },
};

export default nextConfig;