"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOContent from "@/components/SEOContent";
import RelatedTools from "@/components/RelatedTools";
import { Headphones, Upload, Download, AlertCircle } from "lucide-react";
import { getToolSEOContent } from "@/lib/seo-content";
import { getRelatedTools } from "@/lib/seo";

export default function AudioConverterClient() {
  const seoContent = getToolSEOContent("audio-converter");
  const relatedTools = getRelatedTools("audio-converter");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState<string>("mp3");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
            <Headphones className="h-8 w-8" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-slate-900">Audio Converter</h1>
          <p className="text-slate-600">Convert audio files between MP3, WAV, OGG, and more formats</p>
        </div>

        {/* Info Alert */}
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-1">Note:</p>
            <p>Audio conversion requires backend processing. This is a UI demo. For full functionality, integrate with an audio processing API like CloudConvert or FFmpeg.js.</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Upload Section */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Upload Audio File</h2>
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 transition-colors hover:border-cyan-500 hover:bg-cyan-50/50">
              <Upload className="mb-4 h-12 w-12 text-slate-400" />
              <label className="cursor-pointer rounded-lg bg-cyan-600 hover:bg-cyan-700 border-2 border-cyan-700 hover:border-cyan-800 px-6 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                Choose Audio File
              </label>
              {selectedFile && (
                <p className="mt-4 text-sm text-slate-600">
                  Selected: <span className="font-medium">{selectedFile.name}</span>
                </p>
              )}
            </div>
          </div>

          {/* Format Selection */}
          {selectedFile && (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">Output Format</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                {["mp3", "wav", "ogg", "m4a", "flac"].map((format) => (
                  <button
                    key={format}
                    onClick={() => setOutputFormat(format)}
                    className={`rounded-lg border-2 p-3 text-sm font-semibold uppercase transition-all ${
                      outputFormat === format
                        ? "border-cyan-500 bg-cyan-50 text-cyan-700 ring-2 ring-cyan-500 shadow-sm"
                        : "border-slate-300 bg-white text-slate-700 hover:border-cyan-500 hover:bg-cyan-50/30 shadow-sm"
                    }`}
                  >
                    {format}
                  </button>
                ))}
              </div>

              <button
                disabled
                className="mt-6 w-full rounded-lg border-2 border-slate-300 bg-slate-200 px-6 py-3 font-semibold text-slate-500 cursor-not-allowed shadow-sm"
              >
                Convert to {outputFormat.toUpperCase()} (Demo Mode)
              </button>
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

