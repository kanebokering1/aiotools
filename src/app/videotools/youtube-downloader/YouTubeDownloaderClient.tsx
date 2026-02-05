"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOContent from "@/components/SEOContent";
import RelatedTools from "@/components/RelatedTools";
import { Download, Youtube, AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";
import { getToolSEOContent } from "@/lib/seo-content";
import { getRelatedTools } from "@/lib/seo";

export default function YouTubeDownloaderClient() {
  const seoContent = getToolSEOContent("youtube-downloader");
  const relatedTools = getRelatedTools("youtube-downloader");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoInfo, setVideoInfo] = useState<any>(null);

  const validateYouTubeUrl = (url: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/)?([a-zA-Z0-9_-]{11})/;
    return youtubeRegex.test(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setError("Please enter a YouTube URL");
      return;
    }

    if (!validateYouTubeUrl(url)) {
      setError("Please enter a valid YouTube URL");
      return;
    }

    setIsLoading(true);
    setError(null);
    setVideoInfo(null);

    try {
      // Note: This is a client-side implementation
      // In a real app, you'd need a backend API to handle YouTube downloads
      // due to CORS and YouTube's terms of service
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock video info (in real implementation, this would come from your backend)
      setVideoInfo({
        title: "Sample YouTube Video",
        thumbnail: "https://via.placeholder.com/320x180?text=YouTube+Video",
        duration: "5:30",
        views: "1,234,567",
        author: "Sample Channel"
      });
      
    } catch (err) {
      setError("Failed to fetch video information. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (format: string, quality: string) => {
    // In a real implementation, this would trigger the download
    alert(`Download would start for ${format} in ${quality} quality`);
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
            <li className="text-gray-900">YouTube Downloader</li>
          </ol>
        </nav>

        {/* Page Title */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 border border-red-200">
              <Youtube className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <h1 className="mb-2 text-4xl font-bold text-gray-900 sm:text-5xl">
            YouTube Downloader
          </h1>
          <p className="text-lg text-gray-600">
            Download videos and audio from YouTube in various formats and qualities
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
                This is a demo implementation. A real YouTube downloader requires server-side processing 
                due to YouTube's terms of service and technical restrictions. Please respect copyright laws 
                and YouTube's terms of service when downloading content.
              </p>
            </div>
          </div>
        </div>

        {/* URL Input */}
        <div className="mb-8 rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="youtube-url" className="block text-sm font-medium text-gray-700 mb-2">
                YouTube URL
              </label>
              <input
                id="youtube-url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
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
                <div className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Fetching Video Info...
                </div>
              ) : (
                "Get Video Info"
              )}
            </button>
          </form>
        </div>

        {/* Video Info & Download Options */}
        {videoInfo && (
          <div className="mb-8 rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Video Found!
                </h3>
                <p className="text-gray-600">
                  Choose your preferred download format and quality below.
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
                  {videoInfo.author} • {videoInfo.views} views • {videoInfo.duration}
                </p>
              </div>

              {/* Download Options */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">
                  Download Options
                </h4>
                
                {/* Video Downloads */}
                <div className="space-y-2">
                  <h5 className="font-medium text-gray-900">Video</h5>
                  <div className="grid gap-2">
                    <button
                      onClick={() => handleDownload("MP4", "1080p")}
                      className="flex w-full items-center justify-between rounded-lg border border-gray-300 px-4 py-3 text-left transition-colors hover:bg-gray-50"
                    >
                      <span>MP4 - 1080p HD</span>
                      <Download className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDownload("MP4", "720p")}
                      className="flex w-full items-center justify-between rounded-lg border border-gray-300 px-4 py-3 text-left transition-colors hover:bg-gray-50"
                    >
                      <span>MP4 - 720p HD</span>
                      <Download className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDownload("MP4", "480p")}
                      className="flex w-full items-center justify-between rounded-lg border border-gray-300 px-4 py-3 text-left transition-colors hover:bg-gray-50"
                    >
                      <span>MP4 - 480p</span>
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Audio Downloads */}
                <div className="space-y-2">
                  <h5 className="font-medium text-gray-900">Audio Only</h5>
                  <div className="grid gap-2">
                    <button
                      onClick={() => handleDownload("MP3", "320kbps")}
                      className="flex w-full items-center justify-between rounded-lg border border-gray-300 px-4 py-3 text-left transition-colors hover:bg-gray-50"
                    >
                      <span>MP3 - 320 kbps</span>
                      <Download className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDownload("MP3", "128kbps")}
                      className="flex w-full items-center justify-between rounded-lg border border-gray-300 px-4 py-3 text-left transition-colors hover:bg-gray-50"
                    >
                      <span>MP3 - 128 kbps</span>
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
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
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-50 text-xs font-semibold text-red-600">
                1
              </span>
              <span>Copy the YouTube video URL from your browser</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-50 text-xs font-semibold text-red-600">
                2
              </span>
              <span>Paste the URL in the input field above</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-50 text-xs font-semibold text-red-600">
                3
              </span>
              <span>Click "Get Video Info" to fetch video details</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-50 text-xs font-semibold text-red-600">
                4
              </span>
              <span>Choose your preferred format and quality, then download</span>
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
