"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOContent from "@/components/SEOContent";
import RelatedTools from "@/components/RelatedTools";
import { Edit3, Upload, Download, CheckCircle, Type, Image as ImageIcon, Highlighter } from "lucide-react";
import LoadingAnimation from "@/components/LoadingAnimation";
import { getToolSEOContent } from "@/lib/seo-content";
import { getRelatedTools } from "@/lib/seo";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export default function PDFEditorClient() {
  const seoContent = getToolSEOContent("pdf-editor");
  const relatedTools = getRelatedTools("pdf-editor");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [textToAdd, setTextToAdd] = useState<string>("");
  const [textX, setTextX] = useState<number>(50);
  const [textY, setTextY] = useState<number>(750);
  const [fontSize, setFontSize] = useState<number>(12);
  const [isProcessing, setIsProcessing] = useState(false);
  const [editedPdf, setEditedPdf] = useState<Uint8Array | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setEditedPdf(null);
      setTextToAdd("");
    }
  };

  const handleAddText = async () => {
    if (!selectedFile || !textToAdd.trim()) {
      return;
    }

    setIsProcessing(true);
    setEditedPdf(null);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];

      // Add text to first page
      firstPage.drawText(textToAdd, {
        x: textX,
        y: textY,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      });

      const pdfBytes = await pdfDoc.save();
      setEditedPdf(pdfBytes);
    } catch (error) {
      console.error("Error adding text:", error);
      alert("Failed to add text. Please make sure the file is a valid PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!editedPdf) return;

    const blob = new Blob([editedPdf], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `edited-${selectedFile?.name || "document.pdf"}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
            <Edit3 className="h-8 w-8" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-slate-900">PDF Editor</h1>
          <p className="text-slate-600">Edit PDF text, images, and add annotations</p>
        </div>

        {/* Success Alert */}
        {editedPdf && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <div className="text-sm text-green-900">
              <p className="font-semibold mb-1">Text Added Successfully!</p>
              <p>Your PDF has been edited. Click the download button to save it.</p>
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

          {/* Editing Tools */}
          {selectedFile && (
            <>
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">Add Text to PDF</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Text to Add
                    </label>
                    <textarea
                      value={textToAdd}
                      onChange={(e) => setTextToAdd(e.target.value)}
                      placeholder="Enter text to add to PDF"
                      rows={3}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        X Position: {textX}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="600"
                        value={textX}
                        onChange={(e) => setTextX(parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Y Position: {textY}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="800"
                        value={textY}
                        onChange={(e) => setTextY(parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Font Size: {fontSize}
                    </label>
                    <input
                      type="range"
                      min="8"
                      max="72"
                      value={fontSize}
                      onChange={(e) => setFontSize(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <button
                    onClick={handleAddText}
                    disabled={isProcessing || !textToAdd.trim()}
                    className="w-full rounded-lg bg-violet-600 hover:bg-violet-700 border-2 border-violet-700 hover:border-violet-800 px-6 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md disabled:bg-slate-200 disabled:border-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <LoadingAnimation size="sm" message="" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Type className="h-5 w-5" />
                        <span>Add Text to PDF</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {editedPdf && (
                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                  <button
                    onClick={handleDownload}
                    className="w-full rounded-lg bg-green-600 hover:bg-green-700 border-2 border-green-700 hover:border-green-800 px-6 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                  >
                    <Download className="h-5 w-5" />
                    <span>Download Edited PDF</span>
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

