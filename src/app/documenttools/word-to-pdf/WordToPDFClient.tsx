"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOContent from "@/components/SEOContent";
import RelatedTools from "@/components/RelatedTools";
import { FileEdit, Upload, Download, CheckCircle } from "lucide-react";
import LoadingAnimation from "@/components/LoadingAnimation";
import { getToolSEOContent } from "@/lib/seo-content";
import { getRelatedTools } from "@/lib/seo";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function WordToPDFClient() {
  const seoContent = getToolSEOContent("word-to-pdf");
  const relatedTools = getRelatedTools("word-to-pdf");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPdfGenerated(false);

      // Try to read text from file
      if (file.type === "text/plain") {
        const text = await file.text();
        setTextContent(text);
      } else if (file.type.includes("word") || file.name.endsWith(".docx") || file.name.endsWith(".doc")) {
        // For Word files, show instruction to copy-paste
        alert("For Word documents, please copy the text from Word and paste it in the text area below, or save your Word document as .txt and upload it.");
      }
    }
  };

  const handleConvertToPDF = async () => {
    if (!textContent.trim()) {
      alert("Please enter some text or upload a text file.");
      return;
    }

    setIsProcessing(true);
    setPdfGenerated(false);

    try {
      // Create a temporary div to render the text
      const tempDiv = document.createElement("div");
      tempDiv.style.width = "210mm"; // A4 width
      tempDiv.style.padding = "20mm";
      tempDiv.style.fontFamily = "Arial, sans-serif";
      tempDiv.style.fontSize = "12pt";
      tempDiv.style.lineHeight = "1.6";
      tempDiv.style.whiteSpace = "pre-wrap";
      tempDiv.style.wordWrap = "break-word";
      tempDiv.textContent = textContent;
      document.body.appendChild(tempDiv);

      // Convert to canvas
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      // Remove temp div
      document.body.removeChild(tempDiv);

      // Create PDF
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Download PDF
      pdf.save(`converted-${selectedFile?.name.replace(/\.[^/.]+$/, "") || "document"}.pdf`);
      setPdfGenerated(true);
    } catch (error) {
      console.error("Error converting to PDF:", error);
      alert("Failed to convert to PDF. Please try again.");
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
          <h1 className="mb-2 text-3xl font-bold text-slate-900">Word to PDF</h1>
          <p className="text-slate-600">Convert Word documents (DOCX) to PDF format</p>
        </div>

        {/* Success Alert */}
        {pdfGenerated && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <div className="text-sm text-green-900">
              <p className="font-semibold mb-1">PDF Generated Successfully!</p>
              <p>Your PDF has been downloaded. If you uploaded a Word file, please copy the text from Word and paste it in the text area below for better results.</p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Upload Section */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Upload Word Document</h2>
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 transition-colors hover:border-indigo-500 hover:bg-indigo-50/50">
              <Upload className="mb-4 h-12 w-12 text-slate-400" />
              <label className="cursor-pointer rounded-lg bg-indigo-600 hover:bg-indigo-700 border-2 border-indigo-700 hover:border-indigo-800 px-6 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md">
                <input
                  type="file"
                  accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFileChange}
                  className="hidden"
                />
                Choose Word File
              </label>
              {selectedFile && (
                <p className="mt-4 text-sm text-slate-600">
                  Selected: <span className="font-medium">{selectedFile.name}</span>
                </p>
              )}
            </div>
          </div>

          {/* Text Editor */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Text Content</h2>
            <p className="mb-3 text-sm text-slate-600">
              {selectedFile 
                ? "You can edit the text below or paste content from your Word document:"
                : "Enter or paste your text content here (you can copy from Word document):"}
            </p>
            <textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder="Enter or paste your text content here..."
              rows={15}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono text-sm"
            />
          </div>

          {/* Convert Button */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <button
              onClick={handleConvertToPDF}
              disabled={isProcessing || !textContent.trim()}
              className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 border-2 border-indigo-700 hover:border-indigo-800 px-6 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md disabled:bg-slate-200 disabled:border-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <LoadingAnimation size="sm" message="" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <FileEdit className="h-5 w-5" />
                  <span>Convert to PDF</span>
                </>
              )}
            </button>
            <p className="mt-3 text-center text-sm text-slate-500">
              {selectedFile 
                ? "Tip: For best results with Word files, copy the text from Word and paste it above."
                : "Upload a .txt file or paste your text content to convert to PDF."}
            </p>
          </div>
        </div>

        <SEOContent whatIsIt={seoContent.whatIsIt} howToUse={seoContent.howToUse} features={seoContent.features} faq={seoContent.faq} />
        <RelatedTools tools={relatedTools} />
      </main>

      <Footer />
    </div>
  );
}

