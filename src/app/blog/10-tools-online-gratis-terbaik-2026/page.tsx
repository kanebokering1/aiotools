import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShareButtons from "@/components/ShareButtons";
import { Zap, FileText, Image, Code, Lock, QrCode, Video, Scissors, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "10 Tools Online Gratis Terbaik untuk Produktivitas 2026 | AIO Tools",
  description: "Daftar lengkap 10 tools online gratis terbaik yang wajib dicoba untuk meningkatkan produktivitas. PDF tools, image editor, video downloader, dan lebih banyak lagi!",
  keywords: [
    "tools online gratis",
    "aplikasi online gratis",
    "productivity tools",
    "free online tools",
    "tools gratis 2026",
    "website tools gratis",
    "online utilities",
  ],
};

export default function BlogPost() {
  const tools = [
    {
      id: 1,
      icon: FileText,
      name: "PDF Merger",
      description: "Gabungkan beberapa file PDF menjadi satu dokumen dengan mudah",
      link: "/pdftools/pdf-merge",
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200"
    },
    {
      id: 2,
      icon: Scissors,
      name: "PDF Splitter",
      description: "Pisahkan halaman PDF atau extract halaman tertentu dengan cepat",
      link: "/pdftools/pdf-split",
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-200"
    },
    {
      id: 3,
      icon: Image,
      name: "Image Compressor",
      description: "Kurangi ukuran foto hingga 80% tanpa kehilangan kualitas visual",
      link: "/imagetools/image-compressor",
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200"
    },
    {
      id: 4,
      icon: Video,
      name: "YouTube Downloader",
      description: "Download video YouTube dalam berbagai kualitas, gratis dan cepat",
      link: "/videotools/youtube-downloader",
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200"
    },
    {
      id: 5,
      icon: QrCode,
      name: "QR Code Generator",
      description: "Buat QR code untuk URL, teks, atau vCard secara instan",
      link: "/texttools/qr-code-generator",
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-200"
    },
    {
      id: 6,
      icon: Lock,
      name: "Password Generator",
      description: "Generate password kuat dan aman dengan satu klik",
      link: "/texttools/password-generator",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-indigo-200"
    },
    {
      id: 7,
      icon: Code,
      name: "JSON Formatter",
      description: "Format dan validate JSON dengan syntax highlighting",
      link: "/developertools/json-formatter",
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-200"
    },
    {
      id: 8,
      icon: FileText,
      name: "Word Counter",
      description: "Hitung kata, karakter, dan paragraf dari teks Anda",
      link: "/texttools/word-counter",
      color: "text-pink-600",
      bg: "bg-pink-50",
      border: "border-pink-200"
    },
    {
      id: 9,
      icon: Download,
      name: "TikTok Downloader",
      description: "Download video TikTok tanpa watermark dengan mudah",
      link: "/videotools/tiktok-downloader",
      color: "text-cyan-600",
      bg: "bg-cyan-50",
      border: "border-cyan-200"
    },
    {
      id: 10,
      icon: Code,
      name: "Base64 Encoder",
      description: "Encode/decode text atau file ke format Base64",
      link: "/developertools/base64-encoder",
      color: "text-gray-600",
      bg: "bg-gray-50",
      border: "border-gray-200"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-gray-900">10 Tools Online Gratis Terbaik</span>
        </nav>

        <article>
          <header className="mb-8">
            <div className="mb-4 flex items-center gap-4 text-sm text-gray-600">
              <time dateTime="2026-02-05">5 Februari 2026</time>
              <span>•</span>
              <span>7 menit baca</span>
            </div>

            <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
              10 Tools Online Gratis Terbaik untuk Produktivitas 2026
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Tingkatkan produktivitas Anda dengan 10 tools online gratis terbaik yang tidak perlu install! 
              Hemat waktu dan uang dengan tools profesional yang 100% gratis.
            </p>
          </header>

          <div className="mb-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-12 text-center border-2 border-blue-100">
            <Zap className="mx-auto h-24 w-24 text-blue-600 mb-4" />
            <p className="text-gray-600 font-medium">All-in-One Tools - Semua yang Anda Butuhkan!</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="mb-6 text-3xl font-bold text-gray-900">Mengapa Pilih Tools Online?</h2>
              
              <p className="mb-6 text-gray-700 leading-relaxed">
                Di era digital ini, tools online menawarkan banyak keuntungan dibanding software desktop:
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <Zap className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"><strong>Tidak perlu install:</strong> Akses langsung dari browser, hemat storage!</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"><strong>Cross-platform:</strong> Bisa dipakai di Windows, Mac, Linux, bahkan mobile!</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"><strong>Selalu update:</strong> Tidak perlu download update, langsung dapat fitur terbaru!</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"><strong>100% Gratis:</strong> Tidak ada trial period, tidak ada subscription, gratis selamanya!</span>
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="mb-8 text-3xl font-bold text-gray-900">Daftar 10 Tools Online Terbaik</h2>

              <div className="space-y-8">
                {tools.map((tool, index) => (
                  <div 
                    key={tool.id}
                    className={`rounded-xl border-2 ${tool.border} ${tool.bg} p-6 hover:shadow-lg transition-all`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border-2 border-current flex-shrink-0">
                        <span className={`text-xl font-bold ${tool.color}`}>{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <tool.icon className={`h-6 w-6 ${tool.color}`} />
                          <h3 className="text-xl font-bold text-gray-900">{tool.name}</h3>
                        </div>
                        <p className="text-gray-700 mb-4">{tool.description}</p>
                        <Link
                          href={tool.link}
                          className={`inline-flex items-center gap-2 rounded-lg ${tool.color} hover:underline font-semibold`}
                        >
                          Coba Sekarang →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="mb-6 text-3xl font-bold text-gray-900">Cara Memaksimalkan Tools Online</h2>

              <div className="space-y-6">
                <div className="rounded-xl bg-blue-50 border-2 border-blue-200 p-6">
                  <h3 className="mb-3 text-xl font-bold text-gray-900">💡 Bookmark Favorit Anda</h3>
                  <p className="text-gray-700">
                    Simpan tools yang sering Anda gunakan ke bookmark browser untuk akses cepat. 
                    Anda bisa membuat folder khusus "Online Tools" untuk organisasi lebih baik.
                  </p>
                </div>

                <div className="rounded-xl bg-green-50 border-2 border-green-200 p-6">
                  <h3 className="mb-3 text-xl font-bold text-gray-900">🚀 Gunakan Keyboard Shortcuts</h3>
                  <p className="text-gray-700">
                    Kebanyakan tools support keyboard shortcuts seperti Ctrl+V untuk paste, Ctrl+C untuk copy. 
                    Ini akan mempercepat workflow Anda!
                  </p>
                </div>

                <div className="rounded-xl bg-purple-50 border-2 border-purple-200 p-6">
                  <h3 className="mb-3 text-xl font-bold text-gray-900">🔒 Perhatikan Keamanan</h3>
                  <p className="text-gray-700">
                    Pilih tools yang menggunakan HTTPS dan memiliki privacy policy jelas. 
                    AIO Tools otomatis menghapus file Anda setelah proses selesai untuk menjaga privasi.
                  </p>
                </div>

                <div className="rounded-xl bg-orange-50 border-2 border-orange-200 p-6">
                  <h3 className="mb-3 text-xl font-bold text-gray-900">📱 Mobile-Friendly</h3>
                  <p className="text-gray-700">
                    Semua tools di AIO Tools fully responsive dan bekerja sempurna di mobile. 
                    Anda bisa bekerja dari mana saja, kapan saja!
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-8 text-center text-white shadow-xl">
                <h2 className="mb-4 text-3xl font-bold">Siap Meningkatkan Produktivitas?</h2>
                <p className="mb-6 text-lg text-blue-100">
                  Akses 60+ tools profesional secara gratis. Tidak perlu daftar, tidak perlu install!
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-blue-600 hover:bg-gray-100 transition-colors shadow-lg"
                >
                  <Zap className="h-5 w-5" />
                  Explore Semua Tools
                </Link>
              </div>
            </section>
          </div>

          <div className="mb-12 flex justify-center">
            <div className="rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
              <ShareButtons
                url="https://aiotools.arthacodestudio.com/blog/10-tools-online-gratis-terbaik-2026"
                title="10 Tools Online Gratis Terbaik untuk Produktivitas 2026 | AIO Tools"
                description="Tingkatkan produktivitas dengan 10 tools online gratis terbaik!"
              />
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}

