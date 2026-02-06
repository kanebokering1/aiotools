"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOContent from "@/components/SEOContent";
import RelatedTools from "@/components/RelatedTools";
import { FileSpreadsheet, Upload, Download, Loader2, CheckCircle } from "lucide-react";
import { getToolSEOContent } from "@/lib/seo-content";
import { getRelatedTools } from "@/lib/seo";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ExcelToPDFClient() {
  const seoContent = getToolSEOContent("excel-to-pdf");
  const relatedTools = getRelatedTools("excel-to-pdf");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setPdfGenerated(false);
    }
  };

  const handleConvertToPDF = async () => {
    if (!selectedFile) {
      return;
    }

    setIsProcessing(true);
    setPdfGenerated(false);

    try {
      // Read Excel file
      const arrayBuffer = await selectedFile.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      
      // Get first sheet
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      
      // Convert to HTML table
      const html = XLSX.utils.sheet_to_html(worksheet);
      
      // Create temporary div
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;
      tempDiv.style.width = "210mm"; // A4 width
      tempDiv.style.padding = "10mm";
      tempDiv.style.fontFamily = "Arial, sans-serif";
      tempDiv.style.fontSize = "10pt";
      tempDiv.style.backgroundColor = "white";
      
      // Style the table
      const table = tempDiv.querySelector("table");
      if (table) {
        table.style.width = "100%";
        table.style.borderCollapse = "collapse";
        table.style.border = "1px solid #ddd";
        
        // Style cells
        const cells = table.querySelectorAll("td, th");
        cells.forEach((cell: any) => {
          cell.style.border = "1px solid #ddd";
          cell.style.padding = "8px";
          cell.style.textAlign = "left";
        });
        
        // Style header
        const headers = table.querySelectorAll("th");
        headers.forEach((header: any) => {
          header.style.backgroundColor = "#f2f2f2";
          header.style.fontWeight = "bold";
        });
      }
      
      document.body.appendChild(tempDiv);

      // Convert to canvas
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
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
      pdf.save(`converted-${selectedFile.name.replace(/\.[^/.]+$/, "")}.pdf`);
      setPdfGenerated(true);
    } catch (error) {
      console.error("Error converting Excel to PDF:", error);
      alert("Failed to convert Excel to PDF. Please make sure the file is a valid Excel file.");
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
          <h1 className="mb-2 text-3xl font-bold text-slate-900">Excel to PDF</h1>
          <p className="text-slate-600">Convert Excel spreadsheets (XLSX) to PDF format</p>
        </div>

        {/* Success Alert */}
        {pdfGenerated && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <div className="text-sm text-green-900">
              <p className="font-semibold mb-1">PDF Generated Successfully!</p>
              <p>Your Excel file has been converted to PDF and downloaded.</p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Upload Section */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Upload Excel File</h2>
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 transition-colors hover:border-indigo-500 hover:bg-indigo-50/50">
              <Upload className="mb-4 h-12 w-12 text-slate-400" />
              <label className="cursor-pointer rounded-lg bg-indigo-600 hover:bg-indigo-700 border-2 border-indigo-700 hover:border-indigo-800 px-6 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md">
                <input
                  type="file"
                  accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  onChange={handleFileChange}
                  className="hidden"
                />
                Choose Excel File
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
                onClick={handleConvertToPDF}
                disabled={isProcessing}
                className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 border-2 border-indigo-700 hover:border-indigo-800 px-6 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md disabled:bg-slate-200 disabled:border-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Converting to PDF...</span>
                  </>
                ) : (
                  <>
                    <FileSpreadsheet className="h-5 w-5" />
                    <span>Convert to PDF</span>
                  </>
                )}
              </button>
              <p className="mt-3 text-center text-sm text-slate-500">
                Converting Excel spreadsheet to PDF format
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

