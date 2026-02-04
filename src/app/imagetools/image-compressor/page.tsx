"use client";

import { useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Upload, Download, Image as ImageIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import imageCompression from "browser-image-compression";

export default function ImageCompressorPage() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string>("");
  const [compressedPreview, setCompressedPreview] = useState<string>("");
  const [isCompressing, setIsCompressing] = useState(false);
  const [quality, setQuality] = useState(0.8);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    setOriginalFile(file);
    setCompressedFile(null);
    setCompressedPreview("");

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

  const compressImage = async () => {
    if (!originalFile) return;

    setIsCompressing(true);
    try {
      const options = {
        maxSizeMB: quality * 10,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        quality: quality,
      };

      const compressed = await imageCompression(originalFile, options);
      setCompressedFile(compressed);

      const reader = new FileReader();
      reader.onload = (e) => {
        setCompressedPreview(e.target?.result as string);
      };
      reader.readAsDataURL(compressed);
    } catch (error) {
      console.error("Error compressing image:", error);
      alert("Failed to compress image. Please try again.");
    } finally {
      setIsCompressing(false);
    }
  };

  const downloadCompressed = () => {
    if (!compressedFile) return;

    const url = URL.createObjectURL(compressedFile);
    const a = document.createElement("a");
    a.href = url;
    a.download = `compressed-${originalFile?.name || "image"}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setOriginalFile(null);
    setCompressedFile(null);
    setOriginalPreview("");
    setCompressedPreview("");
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
            <li className="text-gray-900">Image Compressor</li>
          </ol>
        </nav>

        {/* Page Title */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 border border-blue-200">
              <ImageIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="mb-2 text-4xl font-bold text-gray-900 sm:text-5xl">
            Image Compressor
          </h1>
          <p className="text-lg text-gray-600">
            Reduce image file sizes without losing quality
          </p>
        </div>

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

        {/* Image Preview & Controls */}
        {originalFile && (
          <div className="mb-8 rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Image Compression
              </h3>
              <button
                onClick={reset}
                className="flex items-center gap-2 rounded-lg bg-gray-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
              >
                <Trash2 className="h-4 w-4" />
                Reset
              </button>
            </div>

            {/* Quality Control */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Compression Quality: {Math.round(quality * 100)}%
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Higher Compression</span>
                <span>Better Quality</span>
              </div>
            </div>

            {/* Compress Button */}
            <div className="mb-6">
              <button
                onClick={compressImage}
                disabled={isCompressing}
                className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 border-2 border-blue-700 hover:border-blue-800 px-4 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md disabled:bg-slate-200 disabled:border-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed"
              >
                {isCompressing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Compressing...
                  </div>
                ) : (
                  "Compress Image"
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
                    <p className="text-sm text-gray-600">
                      Size: {formatFileSize(originalFile.size)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {originalFile.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Compressed */}
              <div>
                <h4 className="mb-3 text-lg font-semibold text-gray-900">
                  Compressed
                </h4>
                <div className="rounded-lg border border-gray-200 p-4">
                  {compressedPreview ? (
                    <>
                      <img
                        src={compressedPreview}
                        alt="Compressed"
                        className="w-full rounded-lg"
                      />
                      <div className="mt-3 text-center">
                        <p className="text-sm text-gray-600">
                          Size: {formatFileSize(compressedFile?.size || 0)}
                        </p>
                        <p className="text-xs text-green-600">
                          Saved: {formatFileSize(originalFile.size - (compressedFile?.size || 0))}
                          ({Math.round((1 - (compressedFile?.size || 0) / originalFile.size) * 100)}%)
                        </p>
                      </div>
                      <button
                        onClick={downloadCompressed}
                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-green-700"
                      >
                        <Download className="h-4 w-4" />
                        Download Compressed
                      </button>
                    </>
                  ) : (
                    <div className="flex h-48 items-center justify-center rounded-lg bg-gray-100">
                      <p className="text-gray-500">Compressed image will appear here</p>
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
              <span>Adjust the compression quality using the slider</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-600">
                3
              </span>
              <span>Click "Compress Image" to process your image</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-600">
                4
              </span>
              <span>Compare the results and download the compressed image</span>
            </li>
          </ol>
        </div>
      </main>

      <Footer />
    </div>
  );
}
