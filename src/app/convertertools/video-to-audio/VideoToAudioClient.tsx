"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOContent from "@/components/SEOContent";
import RelatedTools from "@/components/RelatedTools";
import { Volume2, Upload, Download, Loader2, CheckCircle } from "lucide-react";
import { getToolSEOContent } from "@/lib/seo-content";
import { getRelatedTools } from "@/lib/seo";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

export default function VideoToAudioClient() {
  const seoContent = getToolSEOContent("video-to-audio");
  const relatedTools = getRelatedTools("video-to-audio");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState<string>("mp3");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingFFmpeg, setIsLoadingFFmpeg] = useState(false);
  const [extractedUrl, setExtractedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const ffmpegRef = useRef(new FFmpeg());
  const loadedRef = useRef(false);

  useEffect(() => {
    const loadFFmpeg = async () => {
      if (loadedRef.current) return;
      
      setIsLoadingFFmpeg(true);
      const ffmpeg = ffmpegRef.current;
      
      try {
        const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm";
        await ffmpeg.load({
          coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
          wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
        });
        loadedRef.current = true;
      } catch (err) {
        console.error("Failed to load FFmpeg:", err);
        setError("Failed to load video converter. Please refresh the page.");
      } finally {
        setIsLoadingFFmpeg(false);
      }
    };

    loadFFmpeg();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setExtractedUrl(null);
      setError(null);
    }
  };

  const handleExtractAudio = async () => {
    if (!selectedFile || !loadedRef.current) {
      setError("Please wait for converter to load or select a file.");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setExtractedUrl(null);

    try {
      const ffmpeg = ffmpegRef.current;
      const inputFileName = "input." + selectedFile.name.split(".").pop();
      const outputFileName = `output.${outputFormat}`;

      // Write input file to FFmpeg
      await ffmpeg.writeFile(inputFileName, await fetchFile(selectedFile));

      // Extract audio from video
      const args = ["-i", inputFileName];
      
      // Add format-specific arguments
      if (outputFormat === "mp3") {
        args.push("-vn", "-acodec", "libmp3lame", "-b:a", "192k");
      } else if (outputFormat === "wav") {
        args.push("-vn", "-acodec", "pcm_s16le");
      } else if (outputFormat === "ogg") {
        args.push("-vn", "-acodec", "libvorbis");
      } else if (outputFormat === "m4a") {
        args.push("-vn", "-acodec", "aac", "-b:a", "192k");
      }

      args.push(outputFileName);

      await ffmpeg.exec(args);

      // Read output file
      const data = await ffmpeg.readFile(outputFileName);
      const blob = new Blob([data], { type: `audio/${outputFormat}` });
      const url = URL.createObjectURL(blob);
      setExtractedUrl(url);

      // Cleanup
      await ffmpeg.deleteFile(inputFileName);
      await ffmpeg.deleteFile(outputFileName);
    } catch (err: any) {
      console.error("Extraction error:", err);
      setError(err.message || "Failed to extract audio. Please try a different file or format.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!extractedUrl || !selectedFile) return;

    const link = document.createElement("a");
    link.href = extractedUrl;
    link.download = `extracted-audio.${outputFormat}`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
            <Volume2 className="h-8 w-8" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-slate-900">Video to Audio Converter</h1>
          <p className="text-slate-600">Extract audio from video files (MP4, AVI, MOV, etc.)</p>
        </div>

        {/* Loading FFmpeg Alert */}
        {isLoadingFFmpeg && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
            <Loader2 className="h-5 w-5 text-blue-600 mt-0.5 animate-spin" />
            <div className="text-sm text-blue-900">
              <p className="font-semibold mb-1">Loading Audio Extractor...</p>
              <p>Please wait while we load the audio extraction engine. This may take a few seconds.</p>
            </div>
          </div>
        )}

        {/* Success Alert */}
        {extractedUrl && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <div className="text-sm text-green-900">
              <p className="font-semibold mb-1">Audio Extracted Successfully!</p>
              <p>Audio has been extracted from video. Click the download button to save it.</p>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
            <div className="text-sm text-red-900">
              <p className="font-semibold mb-1">Error:</p>
              <p>{error}</p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Upload Section */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Upload Video File</h2>
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 transition-colors hover:border-cyan-500 hover:bg-cyan-50/50">
              <Upload className="mb-4 h-12 w-12 text-slate-400" />
              <label className="cursor-pointer rounded-lg bg-cyan-600 hover:bg-cyan-700 border-2 border-cyan-700 hover:border-cyan-800 px-6 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                Choose Video File
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
              <h2 className="mb-4 text-lg font-semibold text-slate-900">Audio Output Format</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {["mp3", "wav", "ogg", "m4a"].map((format) => (
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
                onClick={handleExtractAudio}
                disabled={isProcessing || isLoadingFFmpeg || !loadedRef.current}
                className="mt-6 w-full rounded-lg bg-cyan-600 hover:bg-cyan-700 border-2 border-cyan-700 hover:border-cyan-800 px-6 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md disabled:bg-slate-200 disabled:border-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Extracting Audio...</span>
                  </>
                ) : isLoadingFFmpeg ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Loading Extractor...</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="h-5 w-5" />
                    <span>Extract Audio as {outputFormat.toUpperCase()}</span>
                  </>
                )}
              </button>

              {extractedUrl && (
                <button
                  onClick={handleDownload}
                  className="mt-3 w-full rounded-lg bg-green-600 hover:bg-green-700 border-2 border-green-700 hover:border-green-800 px-6 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                >
                  <Download className="h-5 w-5" />
                  <span>Download Extracted Audio</span>
                </button>
              )}
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

