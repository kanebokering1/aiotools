"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Aperture, Upload, Download } from "lucide-react";

export default function ImageBlurPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [blurAmount, setBlurAmount] = useState<number>(5);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const downloadImage = () => {
    if (!previewUrl) return;
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.filter = `blur(${blurAmount}px)`;
      ctx.drawImage(img, 0, 0);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "blurred-image.png";
      link.click();
    };
    img.src = previewUrl;
  };

  const filterStyle = {
    filter: `blur(${blurAmount}px)`,
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-50 text-pink-600">
            <Aperture className="h-8 w-8" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-slate-900">Image Blur</h1>
          <p className="text-slate-600">Apply blur effects to your images</p>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Upload Image</h2>
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 transition-colors hover:border-pink-500 hover:bg-pink-50/50">
              <Upload className="mb-4 h-12 w-12 text-slate-400" />
              <label className="cursor-pointer rounded-lg bg-pink-600 hover:bg-pink-700 border-2 border-pink-700 hover:border-pink-800 px-6 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md">
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                Choose Image
              </label>
            </div>
          </div>

          {previewUrl && (
            <>
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">Blur Amount</h2>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Blur: {blurAmount}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={blurAmount}
                  onChange={(e) => setBlurAmount(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">Preview</h2>
                <div className="flex justify-center rounded-lg bg-slate-50 p-4">
                  <img src={previewUrl} alt="Preview" style={filterStyle} className="max-h-96 rounded-lg" />
                </div>
                <button
                  onClick={downloadImage}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-pink-600 hover:bg-pink-700 border-2 border-pink-700 hover:border-pink-800 px-6 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md"
                >
                  <Download className="h-5 w-5" />
                  Download Blurred Image
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

