"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOContent from "@/components/SEOContent";
import RelatedTools from "@/components/RelatedTools";
import { RefreshCw, Upload, Download, Image as ImageIcon } from "lucide-react";
import LoadingAnimation from "@/components/LoadingAnimation";
import { getToolSEOContent } from "@/lib/seo-content";
import { getRelatedTools } from "@/lib/seo";

export default function ImageConverterClient() {
  const seoContent = getToolSEOContent("image-converter");
  const relatedTools = getRelatedTools("image-converter");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState<string>("png");
  const [isConverting, setIsConverting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setConvertedImage(null);
    }
  };

  const convertImage = async () => {
    if (!selectedFile) return;

    setIsConverting(true);
    try {
      // Create canvas to convert image
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0);

          // Convert to selected format
          const mimeType = `image/${outputFormat}`;
          const quality = outputFormat === "jpeg" ? 0.9 : undefined;
          const dataUrl = canvas.toDataURL(mimeType, quality);
          setConvertedImage(dataUrl);
          setIsConverting(false);
        };
      };

      reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error("Error converting image:", error);
      setIsConverting(false);
    }
  };

  const downloadImage = () => {
    if (!convertedImage) return;

    const link = document.createElement("a");
    link.href = convertedImage;
    link.download = `converted-image.${outputFormat}`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
            <RefreshCw className="h-8 w-8" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-slate-900">Image Converter</h1>
          <p className="text-slate-600">Convert images between JPG, PNG, WebP, and more formats</p>
        </div>

        <div className="space-y-6">
          {/* Upload Section */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Upload Image</h2>
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 transition-colors hover:border-cyan-500 hover:bg-cyan-50/50">
              <Upload className="mb-4 h-12 w-12 text-slate-400" />
              <label className="cursor-pointer rounded-lg bg-cyan-600 hover:bg-cyan-700 border-2 border-cyan-700 hover:border-cyan-800 px-6 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                Choose Image
              </label>
              {selectedFile && (
                <p className="mt-4 text-sm text-slate-600">
                  Selected: <span className="font-medium">{selectedFile.name}</span>
                </p>
              )}
            </div>
          </div>

          {/* Format Selection */}
          {selectedFile && (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">Output Format</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {["png", "jpeg", "webp", "bmp"].map((format) => (
                  <button
                    key={format}
                    onClick={() => setOutputFormat(format)}
                    className={`rounded-lg border-2 p-3 text-sm font-semibold uppercase transition-all ${
                      outputFormat === format
                        ? "border-cyan-500 bg-cyan-50 text-cyan-700 ring-2 ring-cyan-500 shadow-sm"
                        : "border-slate-300 bg-white text-slate-700 hover:border-cyan-500 hover:bg-cyan-50/30 shadow-sm"
                    }`}
                  >
                    {format}
                  </button>
                ))}
              </div>

              <button
                onClick={convertImage}
                disabled={isConverting}
                className="mt-6 w-full rounded-lg bg-cyan-600 hover:bg-cyan-700 border-2 border-cyan-700 hover:border-cyan-800 px-6 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md disabled:bg-slate-200 disabled:border-slate-300 disabled:cursor-not-allowed disabled:text-slate-500"
              >
                {isConverting ? (
                  <span className="flex items-center justify-center gap-2">
                    <LoadingAnimation size="sm" message="" />
                    <span>Processing...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <RefreshCw className="h-5 w-5" />
                    Convert Image
                  </span>
                )}
              </button>
            </div>
          )}

          {/* Processing Overlay */}
          {isConverting && (
            <div className="rounded-2xl border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50 p-8 shadow-sm">
              <LoadingAnimation message={`Converting to ${outputFormat.toUpperCase()} format...`} size="lg" />
            </div>
          )}

          {/* Result Section */}
          {convertedImage && !isConverting && (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">Converted Image</h2>
              <div className="mb-4 flex items-center justify-center rounded-lg bg-slate-50 p-4">
                <img src={convertedImage} alt="Converted" className="max-h-96 rounded-lg" />
              </div>
              <button
                onClick={downloadImage}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 border-2 border-cyan-700 hover:border-cyan-800 px-6 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md"
              >
                <Download className="h-5 w-5" />
                Download {outputFormat.toUpperCase()}
              </button>
            </div>
          )}
        </div>

        <SEOContent whatIsIt={seoContent.whatIsIt} howToUse={seoContent.howToUse} features={seoContent.features} faq={seoContent.faq} />
        <RelatedTools tools={relatedTools} />
      </main>

      <Footer />
    </div>
  );
}

