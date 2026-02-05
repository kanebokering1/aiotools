import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { notFound } from "next/navigation";

// Sample blog posts data
const blogPosts: Record<string, any> = {
  "cara-merge-pdf-online-gratis": {
    title: "10 Cara Merge PDF Online Gratis Tanpa Aplikasi 2026",
    description: "Panduan lengkap cara menggabungkan file PDF secara online dengan mudah dan cepat tanpa install aplikasi.",
    date: "2026-02-05",
    readTime: "5 min",
    category: "PDF Tools",
    author: "AIO Tools Team",
    content: `
      <p>Menggabungkan beberapa file PDF menjadi satu dokumen adalah kebutuhan yang sering muncul, baik untuk keperluan bisnis, akademik, maupun personal. Dalam artikel ini, kami akan membahas 10 cara terbaik untuk merge PDF online secara gratis tanpa perlu install aplikasi apapun.</p>

      <h2>1. Menggunakan AIO Tools PDF Merger</h2>
      <p>AIO Tools menyediakan tool PDF Merger yang 100% gratis dan tanpa watermark. Cukup upload file PDF Anda, atur urutan, lalu klik merge. Prosesnya cepat dan aman.</p>
      
      <p><strong>Keunggulan:</strong></p>
      <ul>
        <li>Gratis tanpa batasan</li>
        <li>Tidak ada watermark</li>
        <li>Proses cepat (< 5 detik)</li>
        <li>Enkripsi SSL untuk keamanan</li>
        <li>Support unlimited files</li>
      </ul>

      <h2>2. Cara Kerja PDF Merger</h2>
      <p>PDF Merger bekerja dengan membaca metadata dan content dari setiap file PDF yang Anda upload, lalu menggabungkannya menjadi satu file baru dengan struktur yang utuh. Tidak ada kompresi atau penurunan kualitas.</p>

      <h2>3. Tips Merge PDF dengan Benar</h2>
      <ul>
        <li>Pastikan urutan file sudah sesuai sebelum merge</li>
        <li>Cek ukuran file total agar tidak terlalu besar</li>
        <li>Gunakan nama file yang descriptive</li>
        <li>Backup file original sebelum merge</li>
      </ul>

      <h2>4. Kapan Harus Merge PDF?</h2>
      <p>Merge PDF sangat berguna saat Anda perlu:</p>
      <ul>
        <li>Mengirim multiple dokumen sebagai satu file</li>
        <li>Menyusun laporan atau proposal</li>
        <li>Menggabungkan scan dokumen</li>
        <li>Membuat portfolio atau presentasi</li>
      </ul>

      <h2>5. Keamanan Data Saat Merge PDF Online</h2>
      <p>Saat menggunakan tool online, pastikan platform tersebut menggunakan enkripsi SSL dan menghapus file Anda setelah proses selesai. AIO Tools menjamin privasi dengan auto-delete file setelah 1 jam.</p>

      <h2>Kesimpulan</h2>
      <p>Merge PDF online adalah solusi praktis dan efisien untuk menggabungkan dokumen tanpa install software. Dengan tools yang tepat seperti AIO Tools, Anda bisa merge PDF dengan cepat, aman, dan gratis.</p>

      <p><a href="/pdftools/pdf-merge" style="color: #2563eb; font-weight: 600;">🔗 Coba PDF Merger AIO Tools Sekarang</a></p>
    `
  },
  "download-video-youtube-tanpa-aplikasi": {
    title: "Cara Download Video YouTube Tanpa Aplikasi (Mudah & Cepat)",
    description: "Tutorial lengkap download video YouTube dengan berbagai kualitas. 100% gratis dan tanpa install aplikasi apapun.",
    date: "2026-02-04",
    readTime: "4 min",
    category: "Video Tools",
    author: "AIO Tools Team",
    content: `
      <p>Download video YouTube kini bisa dilakukan dengan mudah tanpa perlu install aplikasi tambahan. Artikel ini akan membahas cara download video YouTube secara online dengan berbagai pilihan kualitas.</p>

      <h2>Mengapa Download Video YouTube?</h2>
      <p>Ada banyak alasan mengapa seseorang ingin download video YouTube:</p>
      <ul>
        <li>Menonton offline saat tidak ada internet</li>
        <li>Menyimpan tutorial atau educational content</li>
        <li>Membuat kompilasi atau edit video</li>
        <li>Backup video penting</li>
      </ul>

      <h2>Cara Download dengan AIO Tools</h2>
      <p><strong>Langkah-langkah:</strong></p>
      <ol>
        <li>Copy URL video YouTube yang ingin didownload</li>
        <li>Buka YouTube Downloader di AIO Tools</li>
        <li>Paste URL di kolom yang tersedia</li>
        <li>Pilih kualitas video (360p, 720p, 1080p)</li>
        <li>Klik Download dan tunggu proses selesai</li>
      </ol>

      <h2>Format Video yang Tersedia</h2>
      <p>AIO Tools mendukung berbagai format:</p>
      <ul>
        <li><strong>MP4</strong> - Format paling umum, compatible dengan semua device</li>
        <li><strong>WEBM</strong> - Format modern dengan kompresi lebih baik</li>
        <li><strong>MP3</strong> - Audio only untuk musik atau podcast</li>
      </ul>

      <h2>Tips Download Video YouTube</h2>
      <ul>
        <li>Pilih kualitas sesuai kebutuhan (720p untuk mobile, 1080p untuk desktop)</li>
        <li>Check storage space sebelum download video HD</li>
        <li>Respect copyright - hanya download untuk personal use</li>
      </ul>

      <h2>Legalitas Download Video YouTube</h2>
      <p>Download video YouTube untuk personal use umumnya diperbolehkan, namun tidak untuk dipublikasikan ulang atau dikomersialkan. Selalu respect hak cipta creator.</p>

      <p><a href="/videotools/youtube-downloader" style="color: #2563eb; font-weight: 600;">🔗 Download Video YouTube Sekarang</a></p>
    `
  },
  "kompres-pdf-tanpa-mengurangi-kualitas": {
    title: "Cara Kompres PDF Tanpa Mengurangi Kualitas",
    description: "Pelajari teknik kompres PDF yang tepat agar ukuran file kecil tapi kualitas tetap jernih.",
    date: "2026-02-03",
    readTime: "6 min",
    category: "PDF Tools",
    author: "AIO Tools Team",
    content: `
      <p>File PDF yang terlalu besar sering menjadi masalah saat ingin mengirim via email atau upload ke website. Artikel ini akan membahas cara kompres PDF tanpa mengurangi kualitas visual.</p>

      <h2>Kenapa PDF Bisa Sangat Besar?</h2>
      <p>PDF berukuran besar biasanya disebabkan oleh:</p>
      <ul>
        <li>Gambar resolusi tinggi yang tidak dioptimasi</li>
        <li>Multiple pages dengan content berat</li>
        <li>Embedded fonts yang tidak diperlukan</li>
        <li>Metadata dan annotations yang berlebihan</li>
      </ul>

      <h2>Teknik Kompres PDF</h2>
      <p>Ada beberapa metode kompres PDF:</p>
      
      <h3>1. Lossy Compression</h3>
      <p>Mengurangi kualitas gambar sedikit untuk mendapat file size lebih kecil. Ideal untuk dokumen dengan banyak gambar.</p>

      <h3>2. Lossless Compression</h3>
      <p>Kompres tanpa mengurangi kualitas sama sekali. Cocok untuk dokumen penting atau legal.</p>

      <h2>Cara Kompres PDF di AIO Tools</h2>
      <ol>
        <li>Upload file PDF Anda</li>
        <li>Pilih level kompresi (Low, Medium, High)</li>
        <li>Klik Compress PDF</li>
        <li>Download hasil kompres</li>
      </ol>

      <h2>Tips Kompres PDF yang Efektif</h2>
      <ul>
        <li>Untuk dokumen dengan banyak text, gunakan kompresi high</li>
        <li>Untuk dokumen dengan gambar penting, gunakan kompresi medium</li>
        <li>Selalu compare hasil sebelum dan sesudah kompres</li>
        <li>Backup file original sebelum kompres</li>
      </ul>

      <h2>Kapan Harus Kompres PDF?</h2>
      <p>Kompres PDF saat:</p>
      <ul>
        <li>File size > 10MB dan perlu diemail</li>
        <li>Upload ke website dengan limit ukuran</li>
        <li>Menyimpan banyak PDF di cloud storage</li>
        <li>Mengirim via WhatsApp atau messaging app</li>
      </ul>

      <p><a href="/pdftools/pdf-compress" style="color: #2563eb; font-weight: 600;">🔗 Kompres PDF Anda Sekarang</a></p>
    `
  }
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Blog AIO Tools`,
    description: post.description,
    keywords: [post.category, "tutorial", "panduan", "tips", post.title],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Kembali ke Blog
        </Link>

        {/* Post Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{post.readTime} baca</span>
            </div>
          </div>
        </header>

        {/* Post Content */}
        <div 
          className="prose prose-lg prose-blue max-w-none mb-12"
          style={{
            fontSize: '1.125rem',
            lineHeight: '1.8'
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Share Buttons */}
        <div className="border-t-2 border-gray-200 pt-8">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Bagikan artikel ini:
            </h3>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Author Bio */}
        <div className="mt-12 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-100 p-6">
          <p className="text-sm font-semibold text-gray-500 mb-2">Ditulis oleh</p>
          <p className="text-xl font-bold text-gray-900 mb-2">{post.author}</p>
          <p className="text-gray-600">
            Tim AIO Tools berdedikasi membuat tools online gratis yang memudahkan pekerjaan sehari-hari Anda.
          </p>
        </div>
      </article>

      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }));
}

