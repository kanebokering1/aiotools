"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOContent from "@/components/SEOContent";
import RelatedTools from "@/components/RelatedTools";
import { Grid3x3, Upload, Download, Loader2, CheckCircle } from "lucide-react";
import { getToolSEOContent } from "@/lib/seo-content";
import { getRelatedTools } from "@/lib/seo";

export default function PhotoCollageClient() {
  const seoContent = getToolSEOContent("photo-collage");
  const relatedTools = getRelatedTools("photo-collage");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [layout, setLayout] = useState<string>("2x2");
  const [isProcessing, setIsProcessing] = useState(false);
  const [collageUrl, setCollageUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
      setCollageUrl(null);
    }
  };

  const handleCreateCollage = async () => {
    if (selectedFiles.length === 0) return;

    setIsProcessing(true);
    setCollageUrl(null);

    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Determine grid size
      const [rows, cols] = layout.split("x").map(Number);
      const cellWidth = 400;
      const cellHeight = 400;
      canvas.width = cols * cellWidth;
      canvas.height = rows * cellHeight;

      // Load and draw images
      const images: HTMLImageElement[] = [];
      for (let i = 0; i < Math.min(selectedFiles.length, rows * cols); i++) {
        const img = new Image();
        const url = URL.createObjectURL(selectedFiles[i]);
        await new Promise((resolve, reject) => {
          img.onload = () => {
            images.push(img);
            URL.revokeObjectURL(url);
            resolve(null);
          };
          img.onerror = reject;
          img.src = url;
        });
      }

      // Draw images in grid
      for (let i = 0; i < images.length && i < rows * cols; i++) {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const x = col * cellWidth;
        const y = row * cellHeight;

        // Draw white background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x, y, cellWidth, cellHeight);

        // Calculate image dimensions to fit in cell
        const img = images[i];
        const scale = Math.min(cellWidth / img.width, cellHeight / img.height);
        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;
        const offsetX = (cellWidth - scaledWidth) / 2;
        const offsetY = (cellHeight - scaledHeight) / 2;

        ctx.drawImage(img, x + offsetX, y + offsetY, scaledWidth, scaledHeight);
      }

      const collageDataUrl = canvas.toDataURL("image/png");
      setCollageUrl(collageDataUrl);
    } catch (error) {
      console.error("Error creating collage:", error);
      alert("Failed to create collage. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!collageUrl) return;

    const link = document.createElement("a");
    link.href = collageUrl;
    link.download = "photo-collage.png";
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-50 text-pink-600">
            <Grid3x3 className="h-8 w-8" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-slate-900">Photo Collage Maker</h1>
          <p className="text-slate-600">Create beautiful photo collages and grids</p>
        </div>

        {/* Success Alert */}
        {collageUrl && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <div className="text-sm text-green-900">
              <p className="font-semibold mb-1">Collage Created Successfully!</p>
              <p>Your photo collage has been created. Click the download button to save it.</p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Upload Photos</h2>
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 transition-colors hover:border-pink-500 hover:bg-pink-50/50">
              <Upload className="mb-4 h-12 w-12 text-slate-400" />
              <label className="cursor-pointer rounded-lg bg-pink-600 hover:bg-pink-700 border-2 border-pink-700 hover:border-pink-800 px-6 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md">
                <input type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" />
                Choose Multiple Images
              </label>
              {selectedFiles.length > 0 && (
                <p className="mt-4 text-sm text-slate-600">
                  Selected: <span className="font-medium">{selectedFiles.length} images</span>
                </p>
              )}
            </div>
          </div>

          {selectedFiles.length > 0 && (
            <>
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">Layout Options</h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {["2x2", "3x3", "2x3", "3x2"].map((layoutOption) => (
                    <button
                      key={layoutOption}
                      onClick={() => setLayout(layoutOption)}
                      className={`rounded-lg border-2 p-3 text-sm font-semibold transition-all ${
                        layout === layoutOption
                          ? "border-pink-500 bg-pink-50 text-pink-700 ring-2 ring-pink-500 shadow-sm"
                          : "border-slate-300 bg-white text-slate-700 hover:border-pink-500 hover:bg-pink-50/30 shadow-sm"
                      }`}
                    >
                      Grid {layoutOption}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleCreateCollage}
                  disabled={isProcessing}
                  className="mt-6 w-full rounded-lg bg-pink-600 hover:bg-pink-700 border-2 border-pink-700 hover:border-pink-800 px-6 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md disabled:bg-slate-200 disabled:border-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Creating Collage...</span>
                    </>
                  ) : (
                    <>
                      <Grid3x3 className="h-5 w-5" />
                      <span>Create Collage</span>
                    </>
                  )}
                </button>
              </div>

              {collageUrl && (
                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h2 className="mb-4 text-lg font-semibold text-slate-900">Collage Preview</h2>
                  <div className="rounded-lg bg-slate-50 p-4 mb-4">
                    <img src={collageUrl} alt="Collage" className="mx-auto max-w-full rounded-lg" />
                  </div>
                  <button
                    onClick={handleDownload}
                    className="w-full rounded-lg bg-green-600 hover:bg-green-700 border-2 border-green-700 hover:border-green-800 px-6 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                  >
                    <Download className="h-5 w-5" />
                    <span>Download Collage</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <SEOContent whatIsIt={seoContent.whatIsIt} howToUse={seoContent.howToUse} features={seoContent.features} faq={seoContent.faq} />
        <RelatedTools tools={relatedTools} />
      </main>

      <Footer />
    </div>
  );
}

