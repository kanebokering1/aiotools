"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOContent from "@/components/SEOContent";
import RelatedTools from "@/components/RelatedTools";
import { Edit3, Upload, AlertCircle } from "lucide-react";
import { getToolSEOContent } from "@/lib/seo-content";
import { getRelatedTools } from "@/lib/seo";

export default function PDFEditorClient() {
  const seoContent = getToolSEOContent("pdf-editor");
  const relatedTools = getRelatedTools("pdf-editor");
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
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
            <Edit3 className="h-8 w-8" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-slate-900">PDF Editor</h1>
          <p className="text-slate-600">Edit PDF text, images, and add annotations</p>
        </div>

        {/* Info Alert */}
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-1">Note:</p>
            <p>PDF editing requires advanced libraries like pdf-lib, PDF.js, or PSPDFKit. This is a UI demo. For full functionality, integrate with a PDF editing library or API.</p>
          </div>
        </div>

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
                <h2 className="mb-4 text-lg font-semibold text-slate-900">Editing Tools</h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {["Add Text", "Add Image", "Highlight", "Draw"].map((tool) => (
                    <button
                      key={tool}
                      disabled
                      className="rounded-lg border-2 border-slate-300 bg-slate-200 p-3 text-sm font-semibold text-slate-400 cursor-not-allowed shadow-sm"
                    >
                      {tool}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="aspect-video rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center">
                  <p className="text-slate-500">PDF editing canvas (Demo Mode)</p>
                </div>
                <p className="mt-4 text-center text-sm text-slate-500">
                  Integration with PDF editing library required for actual editing
                </p>
              </div>
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

