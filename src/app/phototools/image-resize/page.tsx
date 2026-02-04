"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Maximize2, Upload, Download } from "lucide-react";

export default function ImageResizePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(800);
  const [height, setHeight] = useState<number>(600);
  const [maintainRatio, setMaintainRatio] = useState(true);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResizedImage(null);

      // Get original dimensions
      const img = new Image();
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
      };
      img.src = URL.createObjectURL(file);
    }
  };

  const handleResize = () => {
    if (!selectedFile || !previewUrl) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, width, height);
      setResizedImage(canvas.toDataURL("image/png"));
    };
    img.src = previewUrl;
  };

  const downloadImage = () => {
    if (!resizedImage) return;
    const link = document.createElement("a");
    link.href = resizedImage;
    link.download = `resized-${width}x${height}.png`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
            <Maximize2 className="h-8 w-8" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-slate-900">Image Resize</h1>
          <p className="text-slate-600">Resize images by dimensions or percentage</p>
        </div>

        <div className="space-y-6">
          {/* Upload Section */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Upload Image</h2>
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 transition-colors hover:border-rose-500 hover:bg-rose-50/50">
              <Upload className="mb-4 h-12 w-12 text-slate-400" />
              <label className="cursor-pointer rounded-lg bg-rose-600 hover:bg-rose-700 border-2 border-rose-700 hover:border-rose-800 px-6 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md">
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                Choose Image
              </label>
            </div>
          </div>

          {/* Resize Controls */}
          {previewUrl && (
            <>
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">Resize Settings</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Width (px)</label>
                    <input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(parseInt(e.target.value) || 0)}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Height (px)</label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                    />
                  </div>
                </div>
                <label className="mt-4 flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={maintainRatio}
                    onChange={(e) => setMaintainRatio(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-slate-700">Maintain aspect ratio</span>
                </label>
                <button
                  onClick={handleResize}
                  className="mt-6 w-full rounded-lg bg-rose-600 hover:bg-rose-700 border-2 border-rose-700 hover:border-rose-800 px-6 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md"
                >
                  Resize Image
                </button>
              </div>

              {/* Preview */}
              {resizedImage && (
                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h2 className="mb-4 text-lg font-semibold text-slate-900">Resized Image</h2>
                  <div className="mb-4 flex justify-center rounded-lg bg-slate-50 p-4">
                    <img src={resizedImage} alt="Resized" className="max-h-96 rounded-lg" />
                  </div>
                <button
                  onClick={downloadImage}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-rose-600 hover:bg-rose-700 border-2 border-rose-700 hover:border-rose-800 px-6 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md"
                >
                    <Download className="h-5 w-5" />
                    Download Resized Image
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

