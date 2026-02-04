"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Droplet, Upload, Download } from "lucide-react";

export default function GrayscaleConverterPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [grayscaleImage, setGrayscaleImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      convertToGrayscale(file);
    }
  };

  const convertToGrayscale = (file: File) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.filter = "grayscale(100%)";
      ctx.drawImage(img, 0, 0);
      setGrayscaleImage(canvas.toDataURL("image/png"));
    };
    img.src = URL.createObjectURL(file);
  };

  const downloadImage = () => {
    if (!grayscaleImage) return;
    const link = document.createElement("a");
    link.href = grayscaleImage;
    link.download = "grayscale-image.png";
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-50 text-pink-600">
            <Droplet className="h-8 w-8" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-slate-900">Grayscale Converter</h1>
          <p className="text-slate-600">Convert your images to black and white</p>
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

          {previewUrl && grayscaleImage && (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">Comparison</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="mb-2 text-center text-sm font-medium text-slate-700">Original</p>
                  <img src={previewUrl} alt="Original" className="w-full rounded-lg" />
                </div>
                <div>
                  <p className="mb-2 text-center text-sm font-medium text-slate-700">Grayscale</p>
                  <img src={grayscaleImage} alt="Grayscale" className="w-full rounded-lg" />
                </div>
              </div>
              <button
                onClick={downloadImage}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-pink-600 hover:bg-pink-700 border-2 border-pink-700 hover:border-pink-800 px-6 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md"
              >
                <Download className="h-5 w-5" />
                Download Grayscale Image
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

