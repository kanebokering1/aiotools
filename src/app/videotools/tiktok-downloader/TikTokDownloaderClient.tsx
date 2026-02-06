"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOContent from "@/components/SEOContent";
import RelatedTools from "@/components/RelatedTools";
import { Download, Music, AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";
import LoadingAnimation from "@/components/LoadingAnimation";
import { getToolSEOContent } from "@/lib/seo-content";
import { getRelatedTools } from "@/lib/seo";

export default function TikTokDownloaderClient() {
  const seoContent = getToolSEOContent("tiktok-downloader");
  const relatedTools = getRelatedTools("tiktok-downloader");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoInfo, setVideoInfo] = useState<any>(null);

  const validateTikTokUrl = (url: string) => {
    const tiktokRegex = /^(https?:\/\/)?(www\.)?(tiktok\.com\/@[\w.-]+\/video\/\d+|vm\.tiktok\.com\/[\w]+|tiktok\.com\/t\/[\w]+)/;
    return tiktokRegex.test(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setError("Please enter a TikTok URL");
      return;
    }

    if (!validateTikTokUrl(url)) {
      setError("Please enter a valid TikTok URL");
      return;
    }

    setIsLoading(true);
    setError(null);
    setVideoInfo(null);

    try {
      // Note: This is a client-side implementation
      // In a real app, you'd need a backend API to handle TikTok downloads
      // due to CORS and TikTok's restrictions
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock video info (in real implementation, this would come from your backend)
      setVideoInfo({
        title: "Sample TikTok Video",
        author: "@username",
        thumbnail: "https://via.placeholder.com/320x568?text=TikTok+Video",
        duration: "0:30",
        hasWatermark: true
      });
      
    } catch (err) {
      setError("Failed to fetch video information. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (withWatermark: boolean) => {
    // In a real implementation, this would trigger the download
    const type = withWatermark ? "with watermark" : "without watermark";
    alert(`Download would start for video ${type}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
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
              <Link href="/category/video" className="text-gray-500 hover:text-gray-700">
                Video Tools
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-900">TikTok Downloader</li>
          </ol>
        </nav>

        {/* Page Title */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-50 border border-pink-200">
              <Music className="h-8 w-8 text-pink-600" />
            </div>
          </div>
          <h1 className="mb-2 text-4xl font-bold text-gray-900 sm:text-5xl">
            TikTok Downloader
          </h1>
          <p className="text-lg text-gray-600">
            Download TikTok videos without watermark in high quality
          </p>
        </div>

        {/* Important Notice */}
        <div className="mb-8 rounded-lg bg-amber-50 border border-amber-200 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-amber-800 mb-1">
                Important Notice
              </p>
              <p className="text-amber-700">
                This is a demo implementation. A real TikTok downloader requires server-side processing 
                due to TikTok's terms of service and technical restrictions. Please respect copyright laws 
                and TikTok's terms of service when downloading content.
              </p>
            </div>
          </div>
        </div>

        {/* URL Input */}
        <div className="mb-8 rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="tiktok-url" className="block text-sm font-medium text-gray-700 mb-2">
                TikTok URL
              </label>
              <input
                id="tiktok-url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.tiktok.com/@username/video/..."
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 border-2 border-blue-700 hover:border-blue-800 px-4 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md disabled:bg-slate-200 disabled:border-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <LoadingAnimation size="sm" message="" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Music className="h-5 w-5" />
                  <span>Get Video Info</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="mb-8 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 p-8">
            <LoadingAnimation message="Fetching TikTok video information..." size="lg" />
          </div>
        )}

        {/* Video Info & Download Options */}
        {videoInfo && !isLoading && (
          <div className="mb-8 rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Video Found!
                </h3>
                <p className="text-gray-600">
                  Choose your preferred download option below.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Video Preview */}
              <div>
                <img
                  src={videoInfo.thumbnail}
                  alt="Video thumbnail"
                  className="w-full rounded-lg bg-gray-100"
                />
                <h4 className="mt-3 text-lg font-semibold text-gray-900">
                  {videoInfo.title}
                </h4>
                <p className="text-gray-600">
                  By {videoInfo.author} • {videoInfo.duration}
                </p>
              </div>

              {/* Download Options */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">
                  Download Options
                </h4>
                
                {/* Without Watermark */}
                <div className="rounded-lg border-2 border-green-200 bg-green-50 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-green-800">
                      Without Watermark
                    </h5>
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                      Recommended
                    </span>
                  </div>
                  <p className="text-sm text-green-700 mb-3">
                    Clean video without TikTok watermark
                  </p>
                  <button
                    onClick={() => handleDownload(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 hover:bg-green-700 border-2 border-green-700 hover:border-green-800 px-4 py-2 font-semibold text-white transition-all shadow-sm hover:shadow-md"
                  >
                    <Download className="h-4 w-4" />
                    Download HD (No Watermark)
                  </button>
                </div>

                {/* With Watermark */}
                <div className="rounded-lg border border-gray-300 p-4">
                  <h5 className="font-medium text-gray-900 mb-2">
                    With Watermark
                  </h5>
                  <p className="text-sm text-gray-600 mb-3">
                    Original video with TikTok watermark
                  </p>
                  <button
                    onClick={() => handleDownload(true)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-gray-700"
                  >
                    <Download className="h-4 w-4" />
                    Download (With Watermark)
                  </button>
                </div>

                {/* Audio Only */}
                <div className="rounded-lg border border-gray-300 p-4">
                  <h5 className="font-medium text-gray-900 mb-2">
                    Audio Only
                  </h5>
                  <p className="text-sm text-gray-600 mb-3">
                    Extract audio as MP3 file
                  </p>
                  <button
                    onClick={() => alert("Audio download would start")}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 hover:bg-purple-700 border-2 border-purple-700 hover:border-purple-800 px-4 py-2 font-semibold text-white transition-all shadow-sm hover:shadow-md"
                  >
                    <Download className="h-4 w-4" />
                    Download MP3
                  </button>
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
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-pink-50 text-xs font-semibold text-pink-600">
                1
              </span>
              <span>Open TikTok and find the video you want to download</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-pink-50 text-xs font-semibold text-pink-600">
                2
              </span>
              <span>Tap the "Share" button and copy the video link</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-pink-50 text-xs font-semibold text-pink-600">
                3
              </span>
              <span>Paste the URL in the input field above</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-pink-50 text-xs font-semibold text-pink-600">
                4
              </span>
              <span>Click "Get Video Info" and choose your download option</span>
            </li>
          </ol>
        </div>

        <SEOContent whatIsIt={seoContent.whatIsIt} howToUse={seoContent.howToUse} features={seoContent.features} faq={seoContent.faq} />
        <RelatedTools tools={relatedTools} />
      </main>

      <Footer />
    </div>
  );
}
