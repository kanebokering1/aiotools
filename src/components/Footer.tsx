import Link from "next/link";
import Newsletter from "@/components/Newsletter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="mb-16">
          <Newsletter />
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-8">
          {/* Video Tools */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-slate-900 uppercase tracking-wider">Video</h3>
            <ul className="space-y-3">
              <li><Link href="/videotools/youtube-downloader" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">YouTube</Link></li>
              <li><Link href="/videotools/tiktok-downloader" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">TikTok</Link></li>
              <li><Link href="/videotools/instagram-downloader" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Instagram</Link></li>
              <li><Link href="/videotools/video-converter" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Converter</Link></li>
            </ul>
          </div>

          {/* Image Tools */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-slate-900 uppercase tracking-wider">Image</h3>
            <ul className="space-y-3">
              <li><Link href="/imagetools/image-compressor" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Compressor</Link></li>
              <li><Link href="/imagetools/background-remover" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">BG Remover</Link></li>
            </ul>
          </div>

          {/* PDF Tools */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-slate-900 uppercase tracking-wider">PDF</h3>
            <ul className="space-y-3">
              <li><Link href="/pdftools/pdf-merge" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Merge</Link></li>
              <li><Link href="/pdftools/pdf-split" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Split</Link></li>
              <li><Link href="/pdftools/pdf-compress" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Compress</Link></li>
              <li><Link href="/pdftools/pdf-to-image" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">To Image</Link></li>
            </ul>
          </div>

          {/* Text Tools */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-slate-900 uppercase tracking-wider">Text</h3>
            <ul className="space-y-3">
              <li><Link href="/texttools/word-counter" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Word Counter</Link></li>
              <li><Link href="/texttools/text-case-converter" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Case Convert</Link></li>
              <li><Link href="/texttools/qr-code-generator" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">QR Code</Link></li>
              <li><Link href="/texttools/password-generator" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Password</Link></li>
            </ul>
          </div>

          {/* Developer Tools */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-slate-900 uppercase tracking-wider">Developer</h3>
            <ul className="space-y-3">
              <li><Link href="/developertools/json-formatter" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">JSON</Link></li>
              <li><Link href="/developertools/html-encoder" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">HTML</Link></li>
              <li><Link href="/developertools/base64-encoder" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Base64</Link></li>
              <li><Link href="/developertools/color-picker" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Color</Link></li>
            </ul>
          </div>

          {/* Converter Tools */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-slate-900 uppercase tracking-wider">Converter</h3>
            <ul className="space-y-3">
              <li><Link href="/convertertools/image-converter" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Image</Link></li>
              <li><Link href="/convertertools/audio-converter" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Audio</Link></li>
              <li><Link href="/convertertools/video-to-audio" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Video to Audio</Link></li>
              <li><Link href="/convertertools/unit-converter" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Units</Link></li>
              <li><Link href="/convertertools/text-to-speech" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Text to Speech</Link></li>
            </ul>
          </div>

          {/* Document Tools */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-slate-900 uppercase tracking-wider">Document</h3>
            <ul className="space-y-3">
              <li><Link href="/documenttools/word-to-pdf" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Word to PDF</Link></li>
              <li><Link href="/documenttools/pdf-to-word" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">PDF to Word</Link></li>
              <li><Link href="/documenttools/excel-to-pdf" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Excel to PDF</Link></li>
              <li><Link href="/documenttools/pdf-watermark" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Watermark</Link></li>
              <li><Link href="/documenttools/pdf-editor" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">PDF Editor</Link></li>
            </ul>
          </div>

          {/* Photo Editing Tools */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-slate-900 uppercase tracking-wider">Photo</h3>
            <ul className="space-y-3">
              <li><Link href="/phototools/image-resize" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Resize</Link></li>
              <li><Link href="/phototools/image-crop" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Crop</Link></li>
              <li><Link href="/phototools/image-rotate" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Rotate</Link></li>
              <li><Link href="/phototools/photo-filters" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Filters</Link></li>
              <li><Link href="/phototools/image-blur" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Blur</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-slate-200 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-8 w-auto items-center justify-center">
                <img 
                  src="/aio.png" 
                  alt="AIO Tools Logo" 
                  className="h-6 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <span className="text-lg font-bold text-slate-700 group-hover:text-slate-900 transition-colors">All-in-One Tools</span>
            </Link>
            <p className="text-sm text-slate-500">
              © {currentYear} AIO Tools. Free & Secure.
            </p>
          </div>

          {/* ArthaCode Studio Badge */}
          <div className="mt-6 flex justify-center sm:justify-end">
            <a 
              href="https://arthacodestudio.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 transition-all duration-200 hover:border-blue-500 hover:ring-2 hover:ring-blue-500/20 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <div className="flex items-center gap-2">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-slate-500 leading-none">A product by</span>
                  <span className="text-sm font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">ArthaCode Studio</span>
                </div>
              </div>
              <svg className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
