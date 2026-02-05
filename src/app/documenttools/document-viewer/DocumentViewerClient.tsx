"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOContent from "@/components/SEOContent";
import RelatedTools from "@/components/RelatedTools";
import { Eye, Upload, AlertCircle } from "lucide-react";
import { getToolSEOContent } from "@/lib/seo-content";
import { getRelatedTools } from "@/lib/seo";

export default function DocumentViewerClient() {
  const seoContent = getToolSEOContent("document-viewer");
  const relatedTools = getRelatedTools("document-viewer");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Create preview for supported file types
      const reader = new FileReader();
      reader.onload = (event) => {
        setFilePreview(event.target?.result as string);
      };

      if (file.type === "application/pdf") {
        reader.readAsDataURL(file);
      } else if (file.type.startsWith("image/")) {
        reader.readAsDataURL(file);
      } else if (file.type.startsWith("text/")) {
        reader.readAsText(file);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
            <Eye className="h-8 w-8" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-slate-900">Document Viewer</h1>
          <p className="text-slate-600">View documents, PDFs, and images online</p>
        </div>

        {/* Info Alert */}
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-1">Note:</p>
            <p>This viewer supports PDF, images, and text files. For advanced document viewing with annotations, integrate with PDF.js or similar libraries.</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Upload Section */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Upload Document</h2>
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 transition-colors hover:border-violet-500 hover:bg-violet-50/50">
              <Upload className="mb-4 h-12 w-12 text-slate-400" />
              <label className="cursor-pointer rounded-lg bg-violet-600 hover:bg-violet-700 border-2 border-violet-700 hover:border-violet-800 px-6 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,image/*,application/pdf,text/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                Choose File
              </label>
              {selectedFile && (
                <p className="mt-4 text-sm text-slate-600">
                  Selected: <span className="font-medium">{selectedFile.name}</span>
                </p>
              )}
            </div>
          </div>

          {/* Document Preview */}
          {filePreview && selectedFile && (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">Document Preview</h2>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                {selectedFile.type === "application/pdf" && (
                  <embed src={filePreview} type="application/pdf" width="100%" height="600px" className="rounded-lg" />
                )}
                {selectedFile.type.startsWith("image/") && (
                  <img src={filePreview} alt="Preview" className="mx-auto max-h-96 rounded-lg" />
                )}
                {selectedFile.type.startsWith("text/") && (
                  <pre className="max-h-96 overflow-auto rounded-lg bg-white p-4 text-sm">
                    {filePreview}
                  </pre>
                )}
              </div>
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

