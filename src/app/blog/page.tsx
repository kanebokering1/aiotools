import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog - Tips & Tutorial Tools Online | AIO Tools",
  description: "Temukan tips, tutorial, dan panduan lengkap menggunakan tools online gratis. Pelajari cara merge PDF, download video, edit gambar, dan banyak lagi.",
  keywords: ["blog aio tools", "tutorial pdf", "tips online tools", "panduan gratis", "cara merge pdf", "download video tutorial"],
};

const blogPosts = [
  {
    slug: "cara-merge-pdf-online-gratis",
    title: "10 Cara Merge PDF Online Gratis Tanpa Aplikasi 2026",
    excerpt: "Pelajari cara menggabungkan file PDF secara online dengan mudah dan cepat. Panduan lengkap dengan screenshot dan tips terbaik.",
    date: "2026-02-05",
    readTime: "5 min",
    category: "PDF Tools",
    featured: true
  },
  {
    slug: "download-video-youtube-tanpa-aplikasi",
    title: "Cara Download Video YouTube Tanpa Aplikasi (Mudah & Cepat)",
    excerpt: "Tutorial lengkap download video YouTube dengan berbagai kualitas. 100% gratis dan tanpa install aplikasi apapun.",
    date: "2026-02-04",
    readTime: "4 min",
    category: "Video Tools",
    featured: true
  },
  {
    slug: "kompres-pdf-tanpa-mengurangi-kualitas",
    title: "Cara Kompres PDF Tanpa Mengurangi Kualitas",
    excerpt: "Pelajari teknik kompres PDF yang tepat agar ukuran file kecil tapi kualitas tetap jernih. Ideal untuk email dan upload.",
    date: "2026-02-03",
    readTime: "6 min",
    category: "PDF Tools",
    featured: false
  },
];

export default function BlogPage() {
  const featuredPost = blogPosts.find(post => post.featured);
  const otherPosts = blogPosts.filter(post => !post.featured || post !== featuredPost);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
            📚 Blog AIO Tools
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tips, tutorial, dan panduan lengkap menggunakan tools online gratis
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-12">
            <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-1 shadow-xl">
              <div className="rounded-xl bg-white p-8 sm:p-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                    Featured
                  </span>
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
                    {featuredPost.category}
                  </span>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors">
                  <Link href={`/blog/${featuredPost.slug}`}>
                    {featuredPost.title}
                  </Link>
                </h2>

                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(featuredPost.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{featuredPost.readTime} baca</span>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold group"
                  >
                    Baca Selengkapnya
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Posts Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {otherPosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-xl bg-white border-2 border-gray-200 p-6 hover:border-blue-400 hover:shadow-lg transition-all group"
            >
              <div className="mb-3">
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
                  {post.category}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h3>

              <p className="text-gray-600 mb-4 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold group/link"
              >
                Baca Artikel
                <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </article>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}

