"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOContent from "@/components/SEOContent";
import RelatedTools from "@/components/RelatedTools";
import { FileEdit, Upload, Download, Loader2, CheckCircle } from "lucide-react";
import { getToolSEOContent } from "@/lib/seo-content";
import { getRelatedTools } from "@/lib/seo";
import * as pdfjsLib from "pdfjs-dist";

// Dynamic import for PDF.js to avoid SSR issues
let pdfjsLibModule: any = null;
if (typeof window !== "undefined") {
  import("pdfjs-dist").then((module) => {
    pdfjsLibModule = module;
    pdfjsLibModule.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLibModule.version}/pdf.worker.min.js`;
  });
}

export default function PDFToWordClient() {
  const seoContent = getToolSEOContent("pdf-to-word");
  const relatedTools = getRelatedTools("pdf-to-word");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [wordGenerated, setWordGenerated] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setWordGenerated(false);
    }
  };

  const handleConvertToWord = async () => {
    if (!selectedFile) {
      return;
    }

    setIsProcessing(true);
    setWordGenerated(false);

    try {
      // Dynamic import PDF.js if not loaded
      if (!pdfjsLibModule) {
        const module = await import("pdfjs-dist");
        pdfjsLibModule = module;
        pdfjsLibModule.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLibModule.version}/pdf.worker.min.js`;
      }

      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await pdfjsLibModule.getDocument({ data: arrayBuffer }).promise;
      
      // Extract text from all pages
      let allText = "";
      
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(" ");
        
        allText += pageText + "\n\n";
      }
      
      // Create a simple DOCX-like content (actually RTF format which Word can open)
      // For a proper DOCX, we'd need a library, but RTF is simpler and works
      const rtfContent = `{\\rtf1\\ansi\\deff0 {\\fonttbl {\\f0 Times New Roman;}} \\f0\\fs24 ${allText.replace(/\n/g, "\\par ").replace(/[{}]/g, "")}}`;
      
      // Create blob and download
      const blob = new Blob([rtfContent], { type: "application/rtf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `converted-${selectedFile.name.replace(/\.[^/.]+$/, "")}.rtf`;
      link.click();
      URL.revokeObjectURL(url);
      
      setWordGenerated(true);
    } catch (error) {
      console.error("Error converting PDF to Word:", error);
      alert("Failed to convert PDF to Word. Please make sure the file is a valid PDF with extractable text.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <FileEdit className="h-8 w-8" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-slate-900">PDF to Word</h1>
          <p className="text-slate-600">Convert PDF files to editable Word documents (DOCX)</p>
        </div>

        {/* Success Alert */}
        {wordGenerated && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <div className="text-sm text-green-900">
              <p className="font-semibold mb-1">Word Document Generated Successfully!</p>
              <p>Text has been extracted from PDF and saved as RTF format (compatible with Word). Note: Complex formatting may not be preserved.</p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Upload Section */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Upload PDF File</h2>
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 transition-colors hover:border-indigo-500 hover:bg-indigo-50/50">
              <Upload className="mb-4 h-12 w-12 text-slate-400" />
              <label className="cursor-pointer rounded-lg bg-indigo-600 hover:bg-indigo-700 border-2 border-indigo-700 hover:border-indigo-800 px-6 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md">
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

          {/* Convert Button */}
          {selectedFile && (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <button
                onClick={handleConvertToWord}
                disabled={isProcessing}
                className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 border-2 border-indigo-700 hover:border-indigo-800 px-6 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md disabled:bg-slate-200 disabled:border-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Converting to Word...</span>
                  </>
                ) : (
                  <>
                    <FileEdit className="h-5 w-5" />
                    <span>Convert to Word</span>
                  </>
                )}
              </button>
              <p className="mt-3 text-center text-sm text-slate-500">
                Extracting text from PDF and converting to Word-compatible format (RTF)
              </p>
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

