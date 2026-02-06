"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOContent from "@/components/SEOContent";
import RelatedTools from "@/components/RelatedTools";
import { Eye, Upload, Loader2 } from "lucide-react";
import { getToolSEOContent } from "@/lib/seo-content";
import { getRelatedTools } from "@/lib/seo";
// Dynamic import for PDF.js to avoid SSR issues
let pdfjsLib: any = null;
if (typeof window !== "undefined") {
  import("pdfjs-dist").then((module) => {
    pdfjsLib = module;
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
  });
}

export default function DocumentViewerClient() {
  const seoContent = getToolSEOContent("document-viewer");
  const relatedTools = getRelatedTools("document-viewer");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [pdfPages, setPdfPages] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFilePreview(null);
      setPdfPages([]);
      setCurrentPage(1);
      setTotalPages(0);

      // Handle PDF files with PDF.js
      if (file.type === "application/pdf") {
        setIsLoading(true);
        try {
          // Dynamic import PDF.js if not loaded
          if (!pdfjsLib) {
            const module = await import("pdfjs-dist");
            pdfjsLib = module;
            pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
          }
          
          const arrayBuffer = await file.arrayBuffer();
          const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
          setTotalPages(pdf.numPages);
          
          // Render first page
          const page = await pdf.getPage(1);
          setPdfPages([page]);
          renderPage(page, 1);
        } catch (error) {
          console.error("Error loading PDF:", error);
          alert("Failed to load PDF. Please make sure the file is valid.");
        } finally {
          setIsLoading(false);
        }
      } else {
        // Handle other file types
        const reader = new FileReader();
        reader.onload = (event) => {
          setFilePreview(event.target?.result as string);
        };

        if (file.type.startsWith("image/")) {
          reader.readAsDataURL(file);
        } else if (file.type.startsWith("text/")) {
          reader.readAsText(file);
        }
      }
    }
  };

  const renderPage = async (page: any, pageNum: number) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const viewport = page.getViewport({ scale: 1.5 });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    await page.render(renderContext).promise;
  };

  const loadPage = async (pageNum: number) => {
    if (!selectedFile || selectedFile.type !== "application/pdf") return;

    setIsLoading(true);
    try {
      // Dynamic import PDF.js if not loaded
      if (!pdfjsLib) {
        const module = await import("pdfjs-dist");
        pdfjsLib = module;
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
      }
      
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const page = await pdf.getPage(pageNum);
      setPdfPages([page]);
      setCurrentPage(pageNum);
      await renderPage(page, pageNum);
    } catch (error) {
      console.error("Error loading page:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentPage > 0 && selectedFile?.type === "application/pdf") {
      loadPage(currentPage);
    }
  }, [currentPage]);

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
          {(filePreview || selectedFile?.type === "application/pdf") && selectedFile && (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">Document Preview</h2>
                {selectedFile.type === "application/pdf" && totalPages > 0 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1 || isLoading}
                      className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <span className="text-sm text-slate-600">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages || isLoading}
                      className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                {isLoading && (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
                  </div>
                )}
                {selectedFile.type === "application/pdf" && !isLoading && (
                  <div className="flex justify-center overflow-auto">
                    <canvas ref={canvasRef} className="rounded-lg shadow-sm" />
                  </div>
                )}
                {selectedFile.type.startsWith("image/") && filePreview && (
                  <img src={filePreview} alt="Preview" className="mx-auto max-h-96 rounded-lg" />
                )}
                {selectedFile.type.startsWith("text/") && filePreview && (
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

