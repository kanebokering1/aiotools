"use client";

import { useState } from "react";
import { FileText, Upload, Download, AlertCircle, CheckCircle, Loader2, Scissors } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PDFDocument } from "pdf-lib";

export default function PDFSplit() {
  const [file, setFile] = useState<File | null>(null);
  const [splitOption, setSplitOption] = useState("pages");
  const [pageRange, setPageRange] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [splitFiles, setSplitFiles] = useState<{ name: string; url: string }[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError("");
      setSuccess("");
      setSplitFiles([]);
    } else {
      setError("Please select a valid PDF file");
    }
  };

  const handleSplit = async () => {
    if (!file) {
      setError("Please select a PDF file");
      return;
    }

    setIsProcessing(true);
    setError("");
    setSuccess("");

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const totalPages = pdfDoc.getPageCount();
      const newFiles: { name: string; url: string }[] = [];

      if (splitOption === "individual") {
        // Split into individual pages
        for (let i = 0; i < totalPages; i++) {
          const newPdf = await PDFDocument.create();
          const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
          newPdf.addPage(copiedPage);
          
          const pdfBytes = await newPdf.save();
          const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          
          newFiles.push({
            name: `${file.name.replace('.pdf', '')}_page_${i + 1}.pdf`,
            url: url
          });
        }
      } else if (splitOption === "range" && pageRange) {
        // Split by page range
        const ranges = pageRange.split(',').map(range => range.trim());
        
        for (let i = 0; i < ranges.length; i++) {
          const range = ranges[i];
          let startPage, endPage;
          
          if (range.includes('-')) {
            const [start, end] = range.split('-').map(p => parseInt(p.trim()));
            startPage = Math.max(1, start) - 1;
            endPage = Math.min(totalPages, end) - 1;
          } else {
            const page = parseInt(range);
            startPage = endPage = Math.max(1, Math.min(totalPages, page)) - 1;
          }
          
          const newPdf = await PDFDocument.create();
          const pageIndices = [];
          for (let j = startPage; j <= endPage; j++) {
            pageIndices.push(j);
          }
          
          const copiedPages = await newPdf.copyPages(pdfDoc, pageIndices);
          copiedPages.forEach(page => newPdf.addPage(page));
          
          const pdfBytes = await newPdf.save();
          const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          
          newFiles.push({
            name: `${file.name.replace('.pdf', '')}_pages_${range.replace('-', '_to_')}.pdf`,
            url: url
          });
        }
      }

      setSplitFiles(newFiles);
      setSuccess(`PDF split into ${newFiles.length} files successfully!`);
    } catch (err) {
      setError("Failed to split PDF. Please try again with a valid PDF file.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadFile = (fileUrl: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAll = () => {
    splitFiles.forEach((file, index) => {
      setTimeout(() => {
        downloadFile(file.url, file.name);
      }, index * 100);
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-red-600 p-3">
              <Scissors className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            PDF Splitter
          </h1>
          <p className="text-lg text-gray-600">
            Split PDF files into separate pages or custom page ranges
          </p>
        </div>

        {/* Main Tool */}
        <div className="mx-auto max-w-2xl">
          <div className="rounded-lg bg-white p-6 shadow-lg border border-gray-200">
            <div className="space-y-6">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select PDF File
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="pdf-upload"
                  />
                  <label
                    htmlFor="pdf-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="h-12 w-12 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">
                      {file ? file.name : "Click to upload or drag and drop"}
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      PDF files only
                    </span>
                  </label>
                </div>
              </div>

              {/* Split Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Split Option
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="individual"
                      checked={splitOption === "individual"}
                      onChange={(e) => setSplitOption(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Split into individual pages</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="range"
                      checked={splitOption === "range"}
                      onChange={(e) => setSplitOption(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Split by page range</span>
                  </label>
                </div>
              </div>

              {/* Page Range Input */}
              {splitOption === "range" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page Range
                  </label>
                  <input
                    type="text"
                    value={pageRange}
                    onChange={(e) => setPageRange(e.target.value)}
                    placeholder="e.g., 1-3, 5, 7-10"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use commas to separate ranges. Example: 1-3, 5, 7-10
                  </p>
                </div>
              )}

              {/* Split Button */}
              <button
                onClick={handleSplit}
                disabled={!file || isProcessing || (splitOption === "range" && !pageRange)}
                className="w-full rounded-md bg-red-600 hover:bg-red-700 border-2 border-red-700 hover:border-red-800 px-4 py-2 text-white font-semibold transition-all shadow-sm hover:shadow-md disabled:bg-slate-200 disabled:border-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Splitting...
                  </>
                ) : (
                  <>
                    <Scissors className="h-4 w-4" />
                    Split PDF
                  </>
                )}
              </button>

              {/* Error Message */}
              {error && (
                <div className="rounded-md bg-red-50 p-4 border border-red-200">
                  <div className="flex">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                    <div className="ml-3">
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="rounded-md bg-green-50 p-4 border border-green-200">
                  <div className="flex">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <div className="ml-3">
                      <p className="text-sm text-green-800">{success}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Download Section */}
              {splitFiles.length > 0 && (
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Split Files</h3>
                    <button
                      onClick={downloadAll}
                      className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700 flex items-center gap-1"
                    >
                      <Download className="h-3 w-3" />
                      Download All
                    </button>
                  </div>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {splitFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-700 truncate flex-1">{file.name}</span>
                        <button
                          onClick={() => downloadFile(file.url, file.name)}
                          className="ml-2 rounded bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-700"
                        >
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 rounded-lg bg-blue-50 p-6 border border-blue-200">
            <h3 className="mb-3 text-lg font-semibold text-blue-900">How to use:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
              <li>Upload your PDF file</li>
              <li>Choose split option: individual pages or custom ranges</li>
              <li>If using ranges, specify pages (e.g., "1-3, 5, 7-10")</li>
              <li>Click "Split PDF" to process</li>
              <li>Download individual files or all at once</li>
            </ol>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
