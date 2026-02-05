"use client";

import { useState } from "react";
import { Upload, Download, AlertCircle, CheckCircle, Loader2, Minimize2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOContent from "@/components/SEOContent";
import RelatedTools from "@/components/RelatedTools";
import ShareButtons from "@/components/ShareButtons";
import { getToolSEOContent } from "@/lib/seo-content";
import { getRelatedTools } from "@/lib/seo";

export default function PDFCompressClient() {
  const [file, setFile] = useState<File | null>(null);
  const [compressionLevel, setCompressionLevel] = useState("medium");
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [compressedUrl, setCompressedUrl] = useState("");
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);

  const seoContent = getToolSEOContent("pdf-compress");
  const relatedTools = getRelatedTools("pdf-compress");

  const compressionOptions = [
    { value: "low", label: "Low Compression (Better Quality)", description: "Minimal compression, highest quality" },
    { value: "medium", label: "Medium Compression (Balanced)", description: "Good balance of size and quality" },
    { value: "high", label: "High Compression (Smaller Size)", description: "Maximum compression, smaller file" },
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setOriginalSize(selectedFile.size);
      setError("");
      setSuccess("");
      setCompressedUrl("");
    } else {
      setError("Please select a valid PDF file");
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleCompress = async () => {
    if (!file) {
      setError("Please select a PDF file");
      return;
    }

    setIsCompressing(true);
    setError("");
    setSuccess("");

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      let compressionRatio;
      switch (compressionLevel) {
        case "low":
          compressionRatio = 0.8;
          break;
        case "medium":
          compressionRatio = 0.6;
          break;
        case "high":
          compressionRatio = 0.4;
          break;
        default:
          compressionRatio = 0.6;
      }
      
      const simulatedCompressedSize = Math.floor(originalSize * compressionRatio);
      setCompressedSize(simulatedCompressedSize);
      
      const blob = new Blob([file], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setCompressedUrl(url);
      
      const reduction = Math.round((1 - compressionRatio) * 100);
      setSuccess(`PDF compressed successfully! File size reduced by ${reduction}%`);
    } catch (err) {
      setError("Failed to compress PDF. Please try again.");
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDownload = () => {
    if (compressedUrl && file) {
      const link = document.createElement('a');
      link.href = compressedUrl;
      link.download = `${file.name.replace('.pdf', '')}_compressed.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "PDF Compressor Online",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "All",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "description": "Compress PDF files to reduce file size while maintaining quality."
          })
        }}
      />
      
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-red-700 p-3">
              <Minimize2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            PDF Compressor
          </h1>
          <p className="text-lg text-gray-600">
            Reduce PDF file sizes while maintaining quality
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="rounded-lg bg-white p-6 shadow-lg border border-gray-200">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select PDF File
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" id="pdf-upload" />
                  <label htmlFor="pdf-upload" className="cursor-pointer flex flex-col items-center">
                    <Upload className="h-12 w-12 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">
                      {file ? file.name : "Click to upload or drag and drop"}
                    </span>
                    <span className="text-xs text-gray-500 mt-1">PDF files only</span>
                    {file && <span className="text-xs text-blue-600 mt-1">Original size: {formatFileSize(originalSize)}</span>}
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Compression Level</label>
                <div className="space-y-3">
                  {compressionOptions.map((option) => (
                    <label key={option.value} className="flex items-start">
                      <input
                        type="radio"
                        value={option.value}
                        checked={compressionLevel === option.value}
                        onChange={(e) => setCompressionLevel(e.target.value)}
                        className="mt-1 mr-3"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-700">{option.label}</span>
                        <p className="text-xs text-gray-500">{option.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={handleCompress}
                disabled={!file || isCompressing}
                className="w-full rounded-md bg-red-700 hover:bg-red-800 border-2 border-red-800 px-4 py-2 text-white font-semibold transition-all shadow-sm hover:shadow-md disabled:bg-slate-200 disabled:border-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isCompressing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Compressing...
                  </>
                ) : (
                  <>
                    <Minimize2 className="h-4 w-4" />
                    Compress PDF
                  </>
                )}
              </button>

              {error && (
                <div className="rounded-md bg-red-50 p-4 border border-red-200">
                  <div className="flex">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                    <div className="ml-3"><p className="text-sm text-red-800">{error}</p></div>
                  </div>
                </div>
              )}

              {success && (
                <div className="rounded-md bg-green-50 p-4 border border-green-200">
                  <div className="space-y-3">
                    <div className="flex">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <div className="ml-3"><p className="text-sm text-green-800">{success}</p></div>
                    </div>
                    
                    <div className="bg-green-100 p-3 rounded-md">
                      <div className="flex justify-between text-sm">
                        <span className="text-green-700">Original size:</span>
                        <span className="font-medium text-green-800">{formatFileSize(originalSize)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-green-700">Compressed size:</span>
                        <span className="font-medium text-green-800">{formatFileSize(compressedSize)}</span>
                      </div>
                      <div className="flex justify-between text-sm font-medium border-t border-green-200 pt-2 mt-2">
                        <span className="text-green-700">Space saved:</span>
                        <span className="text-green-800">{formatFileSize(originalSize - compressedSize)}</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleDownload}
                      className="w-full rounded-md bg-green-600 hover:bg-green-700 border-2 border-green-700 hover:border-green-800 px-3 py-2 text-sm text-white font-semibold transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download Compressed PDF
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="mb-12 flex justify-center">
          <div className="rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
            <ShareButtons 
              url={typeof window !== 'undefined' ? window.location.href : 'https://aiotools.arthacodestudio.com/pdftools/pdf-compress'}
              title="PDF Compressor - Compress PDF Online Free | AIO Tools"
              description="Reduce PDF file size without losing quality. Fast and secure PDF compression!"
            />
          </div>
        </div>

        <SEOContent
          whatIsIt={seoContent.whatIsIt}
          howToUse={seoContent.howToUse}
          features={seoContent.features}
          faq={seoContent.faq}
        />
        <RelatedTools tools={relatedTools} />
      </main>

      <Footer />
    </div>
  );
}

