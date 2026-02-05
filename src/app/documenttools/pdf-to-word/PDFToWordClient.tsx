"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOContent from "@/components/SEOContent";
import RelatedTools from "@/components/RelatedTools";
import { FileEdit, Upload, AlertCircle } from "lucide-react";
import { getToolSEOContent } from "@/lib/seo-content";
import { getRelatedTools } from "@/lib/seo";

export default function PDFToWordClient() {
  const seoContent = getToolSEOContent("pdf-to-word");
  const relatedTools = getRelatedTools("pdf-to-word");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
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

        {/* Info Alert */}
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-1">Note:</p>
            <p>PDF to Word conversion requires OCR and document processing. This is a UI demo. For full functionality, integrate with APIs like pdf2docx, CloudConvert, or Adobe PDF Services.</p>
          </div>
        </div>

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
                disabled
                className="w-full rounded-lg border-2 border-slate-300 bg-slate-200 px-6 py-3 font-semibold text-slate-500 cursor-not-allowed shadow-sm"
              >
                Convert to Word (Demo Mode)
              </button>
              <p className="mt-3 text-center text-sm text-slate-500">
                Integration with conversion API required for actual conversion
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

