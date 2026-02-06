"use client";

import { useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOContent from "@/components/SEOContent";
import RelatedTools from "@/components/RelatedTools";
import { Crop, Upload, Download, CheckCircle } from "lucide-react";
import LoadingAnimation from "@/components/LoadingAnimation";
import { getToolSEOContent } from "@/lib/seo-content";
import { getRelatedTools } from "@/lib/seo";

export default function ImageCropClient() {
  const seoContent = getToolSEOContent("image-crop");
  const relatedTools = getRelatedTools("image-crop");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [cropX, setCropX] = useState<number>(0);
  const [cropY, setCropY] = useState<number>(0);
  const [cropWidth, setCropWidth] = useState<number>(200);
  const [cropHeight, setCropHeight] = useState<number>(200);
  const [isProcessing, setIsProcessing] = useState(false);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setCroppedImage(null);
      
      // Reset crop dimensions when new image is loaded
      const img = new Image();
      img.onload = () => {
        const size = Math.min(img.width, img.height) * 0.5;
        setCropWidth(size);
        setCropHeight(size);
        setCropX((img.width - size) / 2);
        setCropY((img.height - size) / 2);
      };
      img.src = url;
    }
  };

  const handleCrop = () => {
    if (!previewUrl || !imgRef.current) return;

    setIsProcessing(true);
    setCroppedImage(null);

    setTimeout(() => {
      const img = imgRef.current;
      if (!img) return;

      const canvas = document.createElement("canvas");
      canvas.width = cropWidth;
      canvas.height = cropHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Calculate scale factor if image is displayed at different size
      const displayWidth = img.offsetWidth || img.width;
      const displayHeight = img.offsetHeight || img.height;
      const scaleX = img.naturalWidth / displayWidth;
      const scaleY = img.naturalHeight / displayHeight;

      ctx.drawImage(
        img,
        cropX * scaleX,
        cropY * scaleY,
        cropWidth * scaleX,
        cropHeight * scaleY,
        0,
        0,
        cropWidth,
        cropHeight
      );

      const croppedUrl = canvas.toDataURL("image/png");
      setCroppedImage(croppedUrl);
      setIsProcessing(false);
    }, 100);
  };

  const handleDownload = () => {
    if (!croppedImage || !selectedFile) return;

    const link = document.createElement("a");
    link.href = croppedImage;
    link.download = `cropped-${selectedFile.name}`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
            <Crop className="h-8 w-8" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-slate-900">Image Crop</h1>
          <p className="text-slate-600">Crop images to specific size or aspect ratio</p>
        </div>

        {/* Success Alert */}
        {croppedImage && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <div className="text-sm text-green-900">
              <p className="font-semibold mb-1">Image Cropped Successfully!</p>
              <p>Your image has been cropped. Click the download button to save it.</p>
            </div>
          </div>
        )}

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
                <h2 className="mb-4 text-lg font-semibold text-slate-900">Crop Settings</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      X Position: {Math.round(cropX)}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="800"
                      value={cropX}
                      onChange={(e) => setCropX(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Y Position: {Math.round(cropY)}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="800"
                      value={cropY}
                      onChange={(e) => setCropY(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Width: {Math.round(cropWidth)}
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="800"
                      value={cropWidth}
                      onChange={(e) => setCropWidth(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Height: {Math.round(cropHeight)}
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="800"
                      value={cropHeight}
                      onChange={(e) => setCropHeight(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
                <button
                  onClick={handleCrop}
                  disabled={isProcessing}
                  className="mt-4 w-full rounded-lg bg-rose-600 hover:bg-rose-700 border-2 border-rose-700 hover:border-rose-800 px-6 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md disabled:bg-slate-200 disabled:border-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <LoadingAnimation size="sm" message="" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Crop className="h-5 w-5" />
                      <span>Crop Image</span>
                    </>
                  )}
                </button>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">Preview</h2>
                <div className="rounded-lg bg-slate-50 p-4 relative">
                  <img
                    ref={imgRef}
                    src={previewUrl}
                    alt="Preview"
                    className="mx-auto max-h-96"
                    style={{ display: "block" }}
                  />
                  {/* Crop overlay */}
                  <div
                    className="absolute border-2 border-rose-500 bg-rose-500 bg-opacity-20 pointer-events-none"
                    style={{
                      left: `${(cropX / 800) * 100}%`,
                      top: `${(cropY / 800) * 100}%`,
                      width: `${(cropWidth / 800) * 100}%`,
                      height: `${(cropHeight / 800) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {croppedImage && (
                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h2 className="mb-4 text-lg font-semibold text-slate-900">Cropped Image</h2>
                  <div className="rounded-lg bg-slate-50 p-4 mb-4">
                    <img src={croppedImage} alt="Cropped" className="mx-auto max-h-96" />
                  </div>
                  <button
                    onClick={handleDownload}
                    className="w-full rounded-lg bg-green-600 hover:bg-green-700 border-2 border-green-700 hover:border-green-800 px-6 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                  >
                    <Download className="h-5 w-5" />
                    <span>Download Cropped Image</span>
                  </button>
                </div>
              )}
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

