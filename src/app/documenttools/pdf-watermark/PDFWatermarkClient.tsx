"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOContent from "@/components/SEOContent";
import RelatedTools from "@/components/RelatedTools";
import { Stamp, Upload, Download, Loader2, CheckCircle } from "lucide-react";
import { getToolSEOContent } from "@/lib/seo-content";
import { getRelatedTools } from "@/lib/seo";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export default function PDFWatermarkClient() {
  const seoContent = getToolSEOContent("pdf-watermark");
  const relatedTools = getRelatedTools("pdf-watermark");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [watermarkText, setWatermarkText] = useState<string>("CONFIDENTIAL");
  const [watermarkOpacity, setWatermarkOpacity] = useState<number>(30);
  const [watermarkPosition, setWatermarkPosition] = useState<string>("center");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedPdf, setProcessedPdf] = useState<Uint8Array | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setProcessedPdf(null);
    }
  };

  const handleAddWatermark = async () => {
    if (!selectedFile || !watermarkText.trim()) {
      return;
    }

    setIsProcessing(true);
    setProcessedPdf(null);

    try {
      // Read PDF file
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // Get font
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const fontSize = 50;
      const pages = pdfDoc.getPages();

      // Calculate watermark position
      pages.forEach((page) => {
        const { width, height } = page.getSize();
        let x = 0;
        let y = 0;

        switch (watermarkPosition) {
          case "center":
            x = width / 2;
            y = height / 2;
            break;
          case "top-left":
            x = 50;
            y = height - 50;
            break;
          case "top-right":
            x = width - 50;
            y = height - 50;
            break;
          case "bottom-left":
            x = 50;
            y = 50;
            break;
          case "bottom-right":
            x = width - 50;
            y = 50;
            break;
          default:
            x = width / 2;
            y = height / 2;
        }

        // Calculate text width for centering
        const textWidth = font.widthOfTextAtSize(watermarkText, fontSize);
        const textHeight = font.heightAtFontSize(fontSize);

        // Adjust x position for center alignment
        if (watermarkPosition === "center") {
          x = (width - textWidth) / 2;
          y = (height - textHeight) / 2;
        }

        // Add watermark with opacity
        const opacity = watermarkOpacity / 100;
        page.drawText(watermarkText, {
          x: x,
          y: y,
          size: fontSize,
          font: font,
          color: rgb(0.5, 0.5, 0.5), // Gray color
          opacity: opacity,
          rotate: { angleInRadians: -0.785 }, // 45 degrees rotation
        });
      });

      // Save PDF
      const pdfBytes = await pdfDoc.save();
      setProcessedPdf(pdfBytes);
    } catch (error) {
      console.error("Error adding watermark:", error);
      alert("Failed to add watermark. Please make sure the file is a valid PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!processedPdf) return;

    const blob = new Blob([processedPdf], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `watermarked-${selectedFile?.name || "document.pdf"}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
            <Stamp className="h-8 w-8" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-slate-900">PDF Watermark</h1>
          <p className="text-slate-600">Add text or image watermarks to your PDF files</p>
        </div>

        {/* Success Alert */}
        {processedPdf && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <div className="text-sm text-green-900">
              <p className="font-semibold mb-1">Watermark Added Successfully!</p>
              <p>Your PDF has been watermarked. Click the download button to save it.</p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Upload Section */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Upload PDF File</h2>
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 transition-colors hover:border-violet-500 hover:bg-violet-50/50">
              <Upload className="mb-4 h-12 w-12 text-slate-400" />
              <label className="cursor-pointer rounded-lg bg-violet-600 hover:bg-violet-700 border-2 border-violet-700 hover:border-violet-800 px-6 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                Choose PDF File
              </label>
              {selectedFile && (
                <p className="mt-4 text-sm text-slate-600">
                  Selected: <span className="font-medium">{selectedFile.name}</span>
                </p>
              )}
            </div>
          </div>

          {/* Watermark Settings */}
          {selectedFile && (
            <>
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">Watermark Settings</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Watermark Text</label>
                    <input
                      type="text"
                      value={watermarkText}
                      onChange={(e) => setWatermarkText(e.target.value)}
                      placeholder="Enter watermark text"
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Opacity: {watermarkOpacity}%
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={watermarkOpacity}
                      onChange={(e) => setWatermarkOpacity(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Position
                    </label>
                    <select
                      value={watermarkPosition}
                      onChange={(e) => setWatermarkPosition(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    >
                      <option value="center">Center</option>
                      <option value="top-left">Top Left</option>
                      <option value="top-right">Top Right</option>
                      <option value="bottom-left">Bottom Left</option>
                      <option value="bottom-right">Bottom Right</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <button
                  onClick={handleAddWatermark}
                  disabled={isProcessing || !watermarkText.trim()}
                  className="w-full rounded-lg bg-violet-600 hover:bg-violet-700 border-2 border-violet-700 hover:border-violet-800 px-6 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md disabled:bg-slate-200 disabled:border-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Adding Watermark...</span>
                    </>
                  ) : (
                    <>
                      <Stamp className="h-5 w-5" />
                      <span>Add Watermark</span>
                    </>
                  )}
                </button>
              </div>

              {processedPdf && (
                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                  <button
                    onClick={handleDownload}
                    className="w-full rounded-lg bg-green-600 hover:bg-green-700 border-2 border-green-700 hover:border-green-800 px-6 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                  >
                    <Download className="h-5 w-5" />
                    <span>Download Watermarked PDF</span>
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

