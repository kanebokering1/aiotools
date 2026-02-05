"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOContent from "@/components/SEOContent";
import RelatedTools from "@/components/RelatedTools";
import { RotateCw, Upload, Download } from "lucide-react";
import { getToolSEOContent } from "@/lib/seo-content";
import { getRelatedTools } from "@/lib/seo";

export default function ImageRotateClient() {
  const seoContent = getToolSEOContent("image-rotate");
  const relatedTools = getRelatedTools("image-rotate");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);

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
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "rotated-image.png";
      link.click();
    };
    img.src = previewUrl;
  };

  const imageStyle = {
    transform: `rotate(${rotation}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`,
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
            <RotateCw className="h-8 w-8" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-slate-900">Image Rotate & Flip</h1>
          <p className="text-slate-600">Rotate and flip images in any direction</p>
        </div>

        <div className="space-y-6">
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

          {previewUrl && (
            <>
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">Rotation & Flip</h2>
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Rotation: {rotation}°
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={rotation}
                      onChange={(e) => setRotation(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setFlipH(!flipH)}
                      className={`flex-1 rounded-lg border-2 p-3 text-sm font-semibold transition-all ${
                        flipH
                          ? "border-rose-500 bg-rose-50 text-rose-700 ring-2 ring-rose-500 shadow-sm"
                          : "border-slate-300 bg-white text-slate-700 hover:border-rose-500 hover:bg-rose-50/30 shadow-sm"
                      }`}
                    >
                      Flip Horizontal
                    </button>
                    <button
                      onClick={() => setFlipV(!flipV)}
                      className={`flex-1 rounded-lg border-2 p-3 text-sm font-semibold transition-all ${
                        flipV
                          ? "border-rose-500 bg-rose-50 text-rose-700 ring-2 ring-rose-500 shadow-sm"
                          : "border-slate-300 bg-white text-slate-700 hover:border-rose-500 hover:bg-rose-50/30 shadow-sm"
                      }`}
                    >
                      Flip Vertical
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">Preview</h2>
                <div className="flex justify-center rounded-lg bg-slate-50 p-4">
                  <img src={previewUrl} alt="Preview" style={imageStyle} className="max-h-96 transition-transform" />
                </div>
                <button
                  onClick={downloadImage}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-rose-600 hover:bg-rose-700 border-2 border-rose-700 hover:border-rose-800 px-6 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md"
                >
                  <Download className="h-5 w-5" />
                  Download Image
                </button>
              </div>
            </>
          )}
        </div>

        <SEOContent whatIsIt={seoContent.whatIsIt} howToUse={seoContent.howToUse} features={seoContent.features} faq={seoContent.faq} />
        <RelatedTools tools={relatedTools} />
      </main>

      <Footer />
    </div>
  );
}

