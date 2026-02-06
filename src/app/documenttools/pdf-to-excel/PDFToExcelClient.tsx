"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOContent from "@/components/SEOContent";
import RelatedTools from "@/components/RelatedTools";
import { FileSpreadsheet, Upload, Download, CheckCircle } from "lucide-react";
import LoadingAnimation from "@/components/LoadingAnimation";
import { getToolSEOContent } from "@/lib/seo-content";
import { getRelatedTools } from "@/lib/seo";
import { PDFDocument } from "pdf-lib";
import * as XLSX from "xlsx";
import * as pdfjsLib from "pdfjs-dist";

// Set worker
if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

export default function PDFToExcelClient() {
  const seoContent = getToolSEOContent("pdf-to-excel");
  const relatedTools = getRelatedTools("pdf-to-excel");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [excelGenerated, setExcelGenerated] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setExcelGenerated(false);
    }
  };

  const handleConvertToExcel = async () => {
    if (!selectedFile) {
      return;
    }

    setIsProcessing(true);
    setExcelGenerated(false);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      // Extract text from all pages
      const allText: string[][] = [];
      
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        
        // Group text items by line
        const lines: string[] = [];
        let currentLine = "";
        
        textContent.items.forEach((item: any) => {
          if (item.str) {
            currentLine += item.str + " ";
          }
          // Simple heuristic: if transform indicates new line
          if (item.hasEOL) {
            lines.push(currentLine.trim());
            currentLine = "";
          }
        });
        
        if (currentLine.trim()) {
          lines.push(currentLine.trim());
        }
        
        // Split lines into columns (simple space-based splitting)
        lines.forEach((line) => {
          if (line.trim()) {
            // Try to split by multiple spaces or tabs
            const columns = line.split(/\s{2,}|\t/).filter(col => col.trim());
            if (columns.length > 0) {
              allText.push(columns);
            } else {
              allText.push([line]);
            }
          }
        });
      }
      
      // Create Excel workbook
      const worksheet = XLSX.utils.aoa_to_sheet(allText);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      
      // Generate Excel file
      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      
      // Download
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `converted-${selectedFile.name.replace(/\.[^/.]+$/, "")}.xlsx`;
      link.click();
      URL.revokeObjectURL(url);
      
      setExcelGenerated(true);
    } catch (error) {
      console.error("Error converting PDF to Excel:", error);
      alert("Failed to convert PDF to Excel. Please make sure the file is a valid PDF with extractable text.");
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
            <FileSpreadsheet className="h-8 w-8" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-slate-900">PDF to Excel</h1>
          <p className="text-slate-600">Convert PDF tables to Excel spreadsheets (XLSX)</p>
        </div>

        {/* Success Alert */}
        {excelGenerated && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <div className="text-sm text-green-900">
              <p className="font-semibold mb-1">Excel Generated Successfully!</p>
              <p>Your PDF text has been extracted and converted to Excel. Note: Complex table structures may require manual adjustment.</p>
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
                onClick={handleConvertToExcel}
                disabled={isProcessing}
                className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 border-2 border-indigo-700 hover:border-indigo-800 px-6 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md disabled:bg-slate-200 disabled:border-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <LoadingAnimation size="sm" message="" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <FileSpreadsheet className="h-5 w-5" />
                    <span>Convert to Excel</span>
                  </>
                )}
              </button>
              <p className="mt-3 text-center text-sm text-slate-500">
                Extracting text from PDF and converting to Excel format
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

