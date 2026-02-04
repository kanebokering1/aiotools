"use client";

import { useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Upload, Download, Sparkles, Trash2 } from "lucide-react";
import Link from "next/link";
import { removeBackground } from "@imgly/background-removal";

export default function BackgroundRemoverPage() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<string>("");
  const [originalPreview, setOriginalPreview] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    setError(null);
    setOriginalFile(file);
    setProcessedImage("");

    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const removeImageBackground = async () => {
    if (!originalFile) return;

    setIsProcessing(true);
    setError(null);

    try {
      const imageBlob = await removeBackground(originalFile);
      const url = URL.createObjectURL(imageBlob);
      setProcessedImage(url);
    } catch (error) {
      console.error("Error removing background:", error);
      setError("Failed to remove background. Please try again with a different image.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadProcessed = () => {
    if (!processedImage) return;

    const a = document.createElement("a");
    a.href = processedImage;
    a.download = `no-bg-${originalFile?.name || "image"}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const reset = () => {
    setOriginalFile(null);
    setProcessedImage("");
    setOriginalPreview("");
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                Home
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <Link href="/category/image" className="text-gray-500 hover:text-gray-700">
                Image Tools
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-900">Background Remover</li>
          </ol>
        </nav>

        {/* Page Title */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 border border-blue-200">
              <Sparkles className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="mb-2 text-4xl font-bold text-gray-900 sm:text-5xl">
            Background Remover
          </h1>
          <p className="text-lg text-gray-600">
            Remove backgrounds from images instantly using AI
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-center">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Upload Area */}
        {!originalFile && (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`mb-8 rounded-xl border-2 border-dashed p-12 text-center transition-colors ${
              isDragging
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 bg-white"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
              <Upload className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              Drag and drop an image here
            </h3>
            <p className="mb-4 text-gray-600">
              or click to browse (JPG, PNG, WebP supported)
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="rounded-lg bg-blue-600 hover:bg-blue-700 border-2 border-blue-700 hover:border-blue-800 px-6 py-2 font-semibold text-white transition-all shadow-sm hover:shadow-md"
            >
              Select Image
            </button>
          </div>
        )}

        {/* Image Processing */}
        {originalFile && (
          <div className="mb-8 rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Background Removal
              </h3>
              <button
                onClick={reset}
                className="flex items-center gap-2 rounded-lg bg-gray-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
              >
                <Trash2 className="h-4 w-4" />
                Reset
              </button>
            </div>

            {/* Process Button */}
            <div className="mb-6">
              <button
                onClick={removeImageBackground}
                disabled={isProcessing}
                className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 border-2 border-blue-700 hover:border-blue-800 px-4 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md disabled:bg-slate-200 disabled:border-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Removing Background...
                  </div>
                ) : (
                  "Remove Background"
                )}
              </button>
            </div>

            {/* Image Comparison */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Original */}
              <div>
                <h4 className="mb-3 text-lg font-semibold text-gray-900">
                  Original
                </h4>
                <div className="rounded-lg border border-gray-200 p-4">
                  <img
                    src={originalPreview}
                    alt="Original"
                    className="w-full rounded-lg"
                  />
                  <div className="mt-3 text-center">
                    <p className="text-xs text-gray-500">
                      {originalFile.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Processed */}
              <div>
                <h4 className="mb-3 text-lg font-semibold text-gray-900">
                  Background Removed
                </h4>
                <div className="rounded-lg border border-gray-200 p-4">
                  {processedImage ? (
                    <>
                      <div className="relative">
                        <div className="absolute inset-0 bg-gray-100 rounded-lg opacity-50"></div>
                        <img
                          src={processedImage}
                          alt="Background removed"
                          className="relative w-full rounded-lg"
                        />
                      </div>
                      <div className="mt-3 text-center">
                        <p className="text-xs text-green-600">
                          Background successfully removed
                        </p>
                      </div>
                      <button
                        onClick={downloadProcessed}
                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-green-700"
                      >
                        <Download className="h-4 w-4" />
                        Download PNG
                      </button>
                    </>
                  ) : (
                    <div className="flex h-48 items-center justify-center rounded-lg bg-gray-100">
                      <p className="text-gray-500">Processed image will appear here</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* How to Use */}
        <div className="rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            How to Use
          </h3>
          <ol className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-600">
                1
              </span>
              <span>Upload an image by dragging and dropping or clicking "Select Image"</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-600">
                2
              </span>
              <span>Click "Remove Background" to process your image with AI</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-600">
                3
              </span>
              <span>Wait for the AI to process and remove the background</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-600">
                4
              </span>
              <span>Download the result as a PNG file with transparent background</span>
            </li>
          </ol>
        </div>
      </main>

      <Footer />
    </div>
  );
}
