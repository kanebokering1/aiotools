import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShareButtons from "@/components/ShareButtons";
import { FileText, CheckCircle, Zap, Shield, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Cara Kompres PDF Online Gratis Tanpa Aplikasi 2026 | AIO Tools",
  description: "Panduan lengkap cara kompres PDF online gratis tanpa install aplikasi. Kurangi ukuran file PDF hingga 90% tanpa mengurangi kualitas. Mudah, cepat, dan aman!",
  keywords: [
    "cara kompres pdf",
    "kompres pdf online",
    "kompres pdf gratis",
    "reduce pdf size",
    "pdf compressor",
    "cara memperkecil ukuran pdf",
    "compress pdf tanpa aplikasi",
    "kompres pdf tanpa mengurangi kualitas",
  ],
  openGraph: {
    title: "Cara Kompres PDF Online Gratis Tanpa Aplikasi 2026",
    description: "Kurangi ukuran file PDF hingga 90% tanpa mengurangi kualitas. Mudah, cepat, dan aman!",
    type: "article",
    publishedTime: "2026-02-05T00:00:00.000Z",
    authors: ["AIO Tools Team"],
  },
};

export default function BlogPost() {
  const publishDate = "5 Februari 2026";
  const readTime = "5 menit";

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
          <span className="text-gray-900">Cara Kompres PDF Online</span>
        </nav>

        {/* Article Header */}
        <article>
          <header className="mb-8">
            <div className="mb-4 flex items-center gap-4 text-sm text-gray-600">
              <time dateTime="2026-02-05">{publishDate}</time>
              <span>•</span>
              <span>{readTime} baca</span>
            </div>

            <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
              Cara Kompres PDF Online Gratis Tanpa Aplikasi
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Panduan lengkap cara memperkecil ukuran file PDF hingga 90% tanpa mengurangi kualitas. 
              Mudah, cepat, dan tidak perlu install aplikasi apapun!
            </p>
          </header>

          {/* Featured Image Placeholder */}
          <div className="mb-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-12 text-center border-2 border-blue-100">
            <FileText className="mx-auto h-24 w-24 text-blue-600 mb-4" />
            <p className="text-gray-600 font-medium">Kompres PDF Online - Gratis & Mudah</p>
          </div>

          {/* Table of Contents */}
          <div className="mb-12 rounded-xl bg-gray-50 border border-gray-200 p-6">
            <h2 className="mb-4 text-lg font-bold text-gray-900">Daftar Isi</h2>
            <ul className="space-y-2 text-gray-700">
              <li><a href="#mengapa-kompres" className="hover:text-blue-600 transition-colors">→ Mengapa Perlu Kompres PDF?</a></li>
              <li><a href="#cara-kompres" className="hover:text-blue-600 transition-colors">→ Cara Kompres PDF Online (5 Langkah)</a></li>
              <li><a href="#tips" className="hover:text-blue-600 transition-colors">→ Tips Kompres PDF Tanpa Mengurangi Kualitas</a></li>
              <li><a href="#keuntungan" className="hover:text-blue-600 transition-colors">→ Keuntungan Menggunakan AIO Tools</a></li>
              <li><a href="#faq" className="hover:text-blue-600 transition-colors">→ FAQ</a></li>
            </ul>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section id="mengapa-kompres" className="mb-12">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">Mengapa Perlu Kompres PDF?</h2>
              
              <p className="mb-4 text-gray-700 leading-relaxed">
                File PDF yang terlalu besar sering menjadi masalah, terutama ketika Anda perlu:
              </p>

              <ul className="mb-6 space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Mengirim email:</strong> Banyak email provider membatasi ukuran attachment maksimal 25MB</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Upload online:</strong> Website sering membatasi ukuran file upload</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Hemat storage:</strong> File kecil = lebih banyak ruang di hard disk atau cloud</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Loading lebih cepat:</strong> PDF yang kecil lebih cepat dibuka dan di-share</span>
                </li>
              </ul>

              <div className="rounded-xl bg-blue-50 border-2 border-blue-200 p-6">
                <p className="text-blue-900 font-medium">
                  💡 <strong>Fakta:</strong> File PDF dengan banyak gambar bisa mencapai puluhan MB! 
                  Dengan kompres yang tepat, Anda bisa mengurangi ukuran hingga 90% tanpa kehilangan kualitas visual.
                </p>
              </div>
            </section>

            <section id="cara-kompres" className="mb-12">
              <h2 className="mb-6 text-3xl font-bold text-gray-900">Cara Kompres PDF Online (5 Langkah Mudah)</h2>

              <div className="space-y-6">
                {/* Step 1 */}
                <div className="rounded-xl bg-white border-2 border-gray-200 p-6 hover:border-blue-300 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold flex-shrink-0">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 text-xl font-bold text-gray-900">Buka PDF Compressor</h3>
                      <p className="text-gray-700 mb-3">
                        Kunjungi{" "}
                        <Link href="/pdftools/pdf-compress" className="text-blue-600 hover:underline font-semibold">
                          AIO Tools PDF Compressor
                        </Link>
                        {" "}di browser Anda. Tidak perlu install aplikasi atau registrasi!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="rounded-xl bg-white border-2 border-gray-200 p-6 hover:border-blue-300 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold flex-shrink-0">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 text-xl font-bold text-gray-900">Upload File PDF</h3>
                      <p className="text-gray-700 mb-3">
                        Klik tombol "Choose File" atau drag & drop file PDF Anda ke area upload. 
                        Mendukung file PDF hingga 100MB!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="rounded-xl bg-white border-2 border-gray-200 p-6 hover:border-blue-300 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold flex-shrink-0">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 text-xl font-bold text-gray-900">Pilih Level Kompresi</h3>
                      <p className="text-gray-700 mb-3">
                        Pilih level kompresi sesuai kebutuhan:
                      </p>
                      <ul className="space-y-2 text-gray-700">
                        <li>• <strong>Low:</strong> Kualitas maksimal, ukuran lebih besar</li>
                        <li>• <strong>Medium:</strong> Balance terbaik (recommended)</li>
                        <li>• <strong>High:</strong> Ukuran paling kecil, kualitas masih bagus</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="rounded-xl bg-white border-2 border-gray-200 p-6 hover:border-blue-300 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold flex-shrink-0">
                      4
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 text-xl font-bold text-gray-900">Proses Kompresi</h3>
                      <p className="text-gray-700 mb-3">
                        Klik tombol "Compress PDF" dan tunggu beberapa detik. Sistem akan otomatis:
                      </p>
                      <ul className="space-y-2 text-gray-700">
                        <li>✓ Mengoptimasi gambar di PDF</li>
                        <li>✓ Menghapus metadata yang tidak perlu</li>
                        <li>✓ Mengkompresi struktur PDF</li>
                        <li>✓ Mempertahankan kualitas visual</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="rounded-xl bg-white border-2 border-gray-200 p-6 hover:border-blue-300 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold flex-shrink-0">
                      5
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 text-xl font-bold text-gray-900">Download Hasil</h3>
                      <p className="text-gray-700 mb-3">
                        Setelah proses selesai, klik tombol "Download" untuk menyimpan PDF yang sudah dikompres. 
                        File Anda akan otomatis terhapus dari server kami untuk menjaga privasi!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/pdftools/pdf-compress"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white hover:bg-blue-700 transition-colors border-2 border-blue-700 hover:border-blue-800 shadow-lg hover:shadow-xl"
                >
                  <Zap className="h-5 w-5" />
                  Coba Kompres PDF Sekarang - Gratis!
                </Link>
              </div>
            </section>

            <section id="tips" className="mb-12">
              <h2 className="mb-6 text-3xl font-bold text-gray-900">Tips Kompres PDF Tanpa Mengurangi Kualitas</h2>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 p-6">
                  <h3 className="mb-3 text-lg font-bold text-gray-900 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Pilih Level yang Tepat
                  </h3>
                  <p className="text-gray-700">
                    Untuk dokumen bisnis atau presentasi, gunakan "Medium" atau "Low" compression. 
                    Untuk file yang akan di-print, gunakan "Low" compression.
                  </p>
                </div>

                <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 p-6">
                  <h3 className="mb-3 text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    Cek Hasil Kompresi
                  </h3>
                  <p className="text-gray-700">
                    Selalu preview PDF setelah dikompres untuk memastikan kualitas masih sesuai kebutuhan. 
                    Jika kurang puas, ulangi dengan level kompresi yang lebih rendah.
                  </p>
                </div>

                <div className="rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 p-6">
                  <h3 className="mb-3 text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-purple-600" />
                    Optimasi Sebelum Kompres
                  </h3>
                  <p className="text-gray-700">
                    Jika membuat PDF dari Word/PowerPoint, export dengan pengaturan "Optimize for web". 
                    Ini akan menghasilkan file yang lebih kecil dari awal.
                  </p>
                </div>

                <div className="rounded-xl bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 p-6">
                  <h3 className="mb-3 text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Download className="h-5 w-5 text-orange-600" />
                    Batch Processing
                  </h3>
                  <p className="text-gray-700">
                    Jika punya banyak file, kompres satu per satu dengan setting yang sama untuk hasil konsisten. 
                    Simpan file dengan nama yang jelas agar tidak bingung.
                  </p>
                </div>
              </div>
            </section>

            <section id="keuntungan" className="mb-12">
              <h2 className="mb-6 text-3xl font-bold text-gray-900">Keuntungan Menggunakan AIO Tools PDF Compressor</h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4 rounded-lg border-l-4 border-blue-600 bg-blue-50 p-4">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">100% Gratis</h3>
                    <p className="text-gray-700">Tidak ada biaya tersembunyi, tidak ada batasan jumlah file, tidak perlu subscription!</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-lg border-l-4 border-green-600 bg-green-50 p-4">
                  <Shield className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Aman & Privat</h3>
                    <p className="text-gray-700">File otomatis terhapus setelah proses selesai. Kami tidak menyimpan atau membagikan dokumen Anda!</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-lg border-l-4 border-purple-600 bg-purple-50 p-4">
                  <Zap className="h-6 w-6 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Cepat & Mudah</h3>
                    <p className="text-gray-700">Proses kompresi hanya butuh beberapa detik. Tidak perlu install software atau daftar akun!</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-lg border-l-4 border-orange-600 bg-orange-50 p-4">
                  <FileText className="h-6 w-6 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Kualitas Terjaga</h3>
                    <p className="text-gray-700">Algoritma kompresi canggih memastikan kualitas visual tetap bagus meski ukuran berkurang drastis!</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="faq" className="mb-12">
              <h2 className="mb-6 text-3xl font-bold text-gray-900">FAQ - Pertanyaan Sering Ditanyakan</h2>

              <div className="space-y-4">
                <details className="group rounded-xl border-2 border-gray-200 p-6 hover:border-blue-300 transition-colors">
                  <summary className="cursor-pointer font-bold text-gray-900 flex items-center justify-between">
                    Apakah kompres PDF akan mengurangi kualitas?
                    <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-700">
                    Tergantung level kompresi. Dengan level "Low" atau "Medium", kualitas visual hampir tidak berubah. 
                    Level "High" akan mengurangi kualitas sedikit, tapi masih sangat bagus untuk kebanyakan kebutuhan.
                  </p>
                </details>

                <details className="group rounded-xl border-2 border-gray-200 p-6 hover:border-blue-300 transition-colors">
                  <summary className="cursor-pointer font-bold text-gray-900 flex items-center justify-between">
                    Berapa maksimal ukuran file yang bisa dikompres?
                    <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-700">
                    Kami support file PDF hingga 100MB. Untuk file yang lebih besar, Anda bisa split PDF terlebih dahulu 
                    menggunakan <Link href="/pdftools/pdf-split" className="text-blue-600 hover:underline">PDF Splitter</Link> kami.
                  </p>
                </details>

                <details className="group rounded-xl border-2 border-gray-200 p-6 hover:border-blue-300 transition-colors">
                  <summary className="cursor-pointer font-bold text-gray-900 flex items-center justify-between">
                    Apakah file saya aman?
                    <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-700">
                    Ya! Semua file di-encrypt saat transfer dan otomatis terhapus dari server kami setelah proses selesai. 
                    Kami tidak menyimpan, membaca, atau membagikan dokumen Anda.
                  </p>
                </details>

                <details className="group rounded-xl border-2 border-gray-200 p-6 hover:border-blue-300 transition-colors">
                  <summary className="cursor-pointer font-bold text-gray-900 flex items-center justify-between">
                    Apakah bisa kompres banyak file sekaligus?
                    <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-700">
                    Saat ini kami support satu file per proses untuk memastikan kecepatan dan kualitas optimal. 
                    Anda bisa kompres beberapa file secara berurutan tanpa batasan jumlah.
                  </p>
                </details>

                <details className="group rounded-xl border-2 border-gray-200 p-6 hover:border-blue-300 transition-colors">
                  <summary className="cursor-pointer font-bold text-gray-900 flex items-center justify-between">
                    Berapa lama proses kompresi?
                    <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-700">
                    Tergantung ukuran file, biasanya 5-30 detik. File yang lebih besar dan kompleks akan butuh waktu lebih lama. 
                    Tapi pasti lebih cepat dari download & install software kompres PDF!
                  </p>
                </details>
              </div>
            </section>

            {/* CTA Section */}
            <section className="mb-12">
              <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-8 text-center text-white shadow-xl">
                <h2 className="mb-4 text-3xl font-bold">Siap Kompres PDF Anda?</h2>
                <p className="mb-6 text-lg text-blue-100">
                  Kurangi ukuran file PDF hingga 90% dalam hitungan detik. Gratis, mudah, dan aman!
                </p>
                <Link
                  href="/pdftools/pdf-compress"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-blue-600 hover:bg-gray-100 transition-colors shadow-lg"
                >
                  <Zap className="h-5 w-5" />
                  Mulai Kompres PDF Sekarang
                </Link>
              </div>
            </section>

            {/* Related Tools */}
            <section className="mb-12">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Tools PDF Lainnya</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Link
                  href="/pdftools/pdf-merge"
                  className="rounded-xl border-2 border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all"
                >
                  <h3 className="mb-2 font-bold text-gray-900">Merge PDF</h3>
                  <p className="text-sm text-gray-600">Gabungkan beberapa PDF jadi satu file</p>
                </Link>

                <Link
                  href="/pdftools/pdf-split"
                  className="rounded-xl border-2 border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all"
                >
                  <h3 className="mb-2 font-bold text-gray-900">Split PDF</h3>
                  <p className="text-sm text-gray-600">Pisahkan halaman PDF menjadi file terpisah</p>
                </Link>

                <Link
                  href="/pdftools/pdf-to-image"
                  className="rounded-xl border-2 border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all"
                >
                  <h3 className="mb-2 font-bold text-gray-900">PDF to Image</h3>
                  <p className="text-sm text-gray-600">Convert PDF ke gambar JPG/PNG</p>
                </Link>
              </div>
            </section>
          </div>

          {/* Share Buttons */}
          <div className="mb-12 flex justify-center">
            <div className="rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
              <ShareButtons
                url="https://aiotools.arthacodestudio.com/blog/cara-kompres-pdf-online-gratis"
                title="Cara Kompres PDF Online Gratis Tanpa Aplikasi | AIO Tools"
                description="Panduan lengkap cara memperkecil ukuran file PDF hingga 90% tanpa mengurangi kualitas!"
              />
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}

