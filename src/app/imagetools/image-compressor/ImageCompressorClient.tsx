"use client";

import { useState, useRef } from "react";
import { Minimize2, Upload, Download, AlertCircle, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOContent from "@/components/SEOContent";
import RelatedTools from "@/components/RelatedTools";
import LoadingAnimation from "@/components/LoadingAnimation";
import { getToolSEOContent } from "@/lib/seo-content";
import { getRelatedTools } from "@/lib/seo";

export default function ImageCompressorClient() {
  const seoContent = getToolSEOContent("image-compressor");
  const relatedTools = getRelatedTools("image-compressor");
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [compressionLevel, setCompressionLevel] = useState<number>(80);
  const [isCompressing, setIsCompressing] = useState(false);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setOriginalSize(file.size);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      setCompressedUrl(null);
      setCompressedSize(0);
    }
  };

  const compressImage = async () => {
    if (!selectedFile || !previewUrl) return;

    setIsCompressing(true);

    try {
      const img = new Image();
      img.src = previewUrl;

      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setCompressedUrl(url);
            setCompressedSize(blob.size);
          }
          setIsCompressing(false);
        },
        "image/jpeg",
        compressionLevel / 100
      );
    } catch (error) {
      console.error("Error compressing image:", error);
      setIsCompressing(false);
    }
  };

  const downloadCompressed = () => {
    if (!compressedUrl) return;

    const link = document.createElement("a");
    link.href = compressedUrl;
    link.download = `compressed-${selectedFile?.name || "image.jpg"}`;
    link.click();
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const getSavingPercentage = () => {
    if (originalSize === 0 || compressedSize === 0) return 0;
    return Math.round(((originalSize - compressedSize) / originalSize) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-4 shadow-lg">
              <Minimize2 className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Image Compressor
          </h1>
          <p className="text-lg text-gray-600">
            Compress your images without losing quality. Reduce file size instantly.
          </p>
        </div>

        <div className="rounded-2xl bg-white border-2 border-gray-200 p-8 shadow-lg">
          {/* Upload Section */}
          {!selectedFile ? (
            <div className="space-y-4">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-3 border-dashed border-blue-300 bg-blue-50 p-12 transition-all hover:border-blue-500 hover:bg-blue-100"
              >
                <Upload className="mb-4 h-16 w-16 text-blue-500" />
                <p className="mb-2 text-lg font-semibold text-gray-700">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-gray-500">
                  PNG, JPG, WEBP (max. 10MB)
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Compression Level Slider */}
              <div className="rounded-xl bg-blue-50 border-2 border-blue-200 p-6">
                <label className="mb-3 block text-base font-semibold text-gray-900">
                  Compression Quality: {compressionLevel}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={compressionLevel}
                  onChange={(e) => setCompressionLevel(Number(e.target.value))}
                  className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                  disabled={isCompressing}
                />
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>Lower quality (smaller file)</span>
                  <span>Higher quality (larger file)</span>
                </div>
              </div>

              {/* Preview Images */}
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Original */}
                <div className="rounded-xl border-2 border-gray-200 p-4">
                  <h3 className="mb-3 text-sm font-semibold text-gray-700">
                    Original Image
                  </h3>
                  <img
                    src={previewUrl || ""}
                    alt="Original"
                    className="w-full rounded-lg border-2 border-gray-300"
                  />
                  <p className="mt-3 text-sm text-gray-600">
                    Size: <span className="font-bold">{formatSize(originalSize)}</span>
                  </p>
                </div>

                {/* Compressed */}
                <div className="rounded-xl border-2 border-gray-200 p-4">
                  <h3 className="mb-3 text-sm font-semibold text-gray-700">
                    Compressed Image
                  </h3>
                  {isCompressing ? (
                    <div className="flex h-48 flex-col items-center justify-center rounded-lg border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50">
                      <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-3" />
                      <p className="text-sm font-semibold text-gray-900 mb-1">
                        Compressing Image...
                      </p>
                      <p className="text-xs text-gray-600">
                        Please wait, this may take a few seconds
                      </p>
                      <div className="flex items-center justify-center gap-2 mt-3">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-blue-600" style={{ animationDelay: '0ms' }}></div>
                        <div className="h-2 w-2 animate-bounce rounded-full bg-blue-600" style={{ animationDelay: '150ms' }}></div>
                        <div className="h-2 w-2 animate-bounce rounded-full bg-blue-600" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  ) : compressedUrl ? (
                    <>
                      <img
                        src={compressedUrl}
                        alt="Compressed"
                        className="w-full rounded-lg border-2 border-green-300"
                      />
                      <div className="mt-3 space-y-1">
                        <p className="text-sm text-gray-600">
                          Size: <span className="font-bold text-green-600">{formatSize(compressedSize)}</span>
                        </p>
                        <p className="text-sm font-bold text-green-600">
                          Saved: {getSavingPercentage()}%
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="flex h-48 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                      <p className="text-sm text-gray-400">
                        Click compress to see result
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={compressImage}
                  disabled={isCompressing}
                  className="flex-1 rounded-xl border-3 border-blue-600 bg-blue-600 px-6 py-4 font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isCompressing ? (
                    <>
                      <LoadingAnimation size="sm" message="" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Minimize2 className="h-5 w-5" />
                      Compress Image
                    </>
                  )}
                </button>

                {compressedUrl && (
                  <button
                    onClick={downloadCompressed}
                    className="flex-1 rounded-xl border-3 border-green-600 bg-green-600 px-6 py-4 font-bold text-white transition-all hover:bg-green-700 hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <Download className="h-5 w-5" />
                    Download Compressed
                  </button>
                )}

                <button
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewUrl(null);
                    setCompressedUrl(null);
                    setOriginalSize(0);
                    setCompressedSize(0);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                  className="rounded-xl border-3 border-gray-300 bg-white px-6 py-4 font-bold text-gray-700 transition-all hover:bg-gray-50 hover:border-gray-400"
                >
                  Reset
                </button>
              </div>

              {/* Info Alert */}
              <div className="rounded-xl bg-blue-50 border-2 border-blue-200 p-4 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-700">
                  <p className="font-semibold mb-1">Tips for best results:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Use 70-85% quality for web images</li>
                    <li>Use 90-100% quality for print</li>
                    <li>PNG files work best at 80%+ quality</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
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

