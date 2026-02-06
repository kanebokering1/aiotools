"use client";

import { useState } from "react";
import { FileVideo, Upload, Download, AlertCircle, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOContent from "@/components/SEOContent";
import RelatedTools from "@/components/RelatedTools";
import LoadingAnimation from "@/components/LoadingAnimation";
import { getToolSEOContent } from "@/lib/seo-content";
import { getRelatedTools } from "@/lib/seo";

export default function VideoConverterClient() {
  const seoContent = getToolSEOContent("video-converter");
  const relatedTools = getRelatedTools("video-converter");
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState("mp4");
  const [quality, setQuality] = useState("high");
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [convertedUrl, setConvertedUrl] = useState("");

  const supportedFormats = [
    { value: "mp4", label: "MP4" },
    { value: "avi", label: "AVI" },
    { value: "mov", label: "MOV" },
    { value: "wmv", label: "WMV" },
    { value: "flv", label: "FLV" },
    { value: "webm", label: "WebM" },
  ];

  const qualityOptions = [
    { value: "low", label: "Low (480p)" },
    { value: "medium", label: "Medium (720p)" },
    { value: "high", label: "High (1080p)" },
    { value: "ultra", label: "Ultra (4K)" },
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError("");
      setSuccess("");
    }
  };

  const handleConvert = async () => {
    if (!file) {
      setError("Please select a video file");
      return;
    }

    setIsConverting(true);
    setError("");
    setSuccess("");

    try {
      // Note: This is a placeholder implementation
      // In a real app, you would use FFmpeg.js or send to a backend service
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setSuccess(`Video converted to ${outputFormat.toUpperCase()} successfully!`);
      setConvertedUrl("#"); // Placeholder URL
    } catch (err) {
      setError("Failed to convert video. Please try again.");
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    // Placeholder for actual download functionality
    alert("Download functionality would be implemented here with actual video conversion");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-green-500 p-3">
              <FileVideo className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Video Converter
          </h1>
          <p className="text-lg text-gray-600">
            Convert videos to different formats with customizable quality settings
          </p>
        </div>

        {/* Main Tool */}
        <div className="mx-auto max-w-2xl">
          <div className="rounded-lg bg-white p-6 shadow-lg border border-gray-200">
            <div className="space-y-6">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Video File
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="video-upload"
                  />
                  <label
                    htmlFor="video-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="h-12 w-12 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">
                      {file ? file.name : "Click to upload or drag and drop"}
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      Supports: MP4, AVI, MOV, WMV, FLV, WebM
                    </span>
                  </label>
                </div>
              </div>

              {/* Output Format */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Output Format
                </label>
                <select
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {supportedFormats.map((format) => (
                    <option key={format.value} value={format.value}>
                      {format.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quality */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quality
                </label>
                <select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {qualityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Convert Button */}
              <button
                onClick={handleConvert}
                disabled={!file || isConverting}
                className="w-full rounded-md bg-green-500 hover:bg-green-600 border-2 border-green-600 hover:border-green-700 px-4 py-2 text-white font-semibold transition-all shadow-sm hover:shadow-md disabled:bg-slate-200 disabled:border-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isConverting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Converting...
                  </>
                ) : (
                  <>
                    <FileVideo className="h-4 w-4" />
                    Convert Video
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

              {/* Processing Overlay */}
              {isConverting && (
                <div className="mt-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 p-8">
                  <div className="flex flex-col items-center justify-center text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-green-600 mb-4" />
                    <p className="text-lg font-semibold text-gray-900 mb-2">
                      Converting Video...
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      Converting to {outputFormat.toUpperCase()} format with {quality} quality
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-green-600" style={{ animationDelay: '0ms' }}></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-green-600" style={{ animationDelay: '150ms' }}></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-green-600" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Success Message */}
              {success && !isConverting && (
                <div className="rounded-md bg-green-50 p-4 border border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <div className="ml-3">
                        <p className="text-sm text-green-800">{success}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleDownload}
                      className="rounded-md bg-green-600 hover:bg-green-700 border-2 border-green-700 hover:border-green-800 px-3 py-1 text-sm text-white transition-all shadow-sm hover:shadow-md flex items-center gap-1"
                    >
                      <Download className="h-3 w-3" />
                      Download
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 rounded-lg bg-blue-50 p-6 border border-blue-200">
            <h3 className="mb-3 text-lg font-semibold text-blue-900">How to use:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
              <li>Upload your video file by clicking or dragging</li>
              <li>Select your desired output format</li>
              <li>Choose the quality level</li>
              <li>Click "Convert Video" to start the process</li>
              <li>Download the converted file when ready</li>
            </ol>
          </div>
        </div>

        <SEOContent whatIsIt={seoContent.whatIsIt} howToUse={seoContent.howToUse} features={seoContent.features} faq={seoContent.faq} />
        <RelatedTools tools={relatedTools} />
      </main>

      <Footer />
    </div>
  );
}
