"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOContent from "@/components/SEOContent";
import RelatedTools from "@/components/RelatedTools";
import { Download, Youtube, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
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

  const extractVideoId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
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
      const videoId = extractVideoId(url);
      if (!videoId) {
        setError("Could not extract video ID from URL. Please check your URL.");
        setIsLoading(false);
        return;
      }

      // Use YouTube oEmbed API to get video info (no API key needed)
      const oEmbedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
      
      const response = await fetch(oEmbedUrl);
      
      if (!response.ok) {
        throw new Error("Failed to fetch video information");
      }

      const data = await response.json();
      
      // Get thumbnail URL (high quality)
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      
      // Extract author from HTML or use provider name
      const author = data.author_name || "Unknown Channel";
      
      setVideoInfo({
        title: data.title,
        thumbnail: thumbnailUrl,
        videoId: videoId,
        author: author,
        // Note: oEmbed doesn't provide duration and views, these would need YouTube Data API
        duration: "N/A",
        views: "N/A",
        embedUrl: `https://www.youtube.com/embed/${videoId}`
      });
      
    } catch (err) {
      console.error("Error fetching video info:", err);
      setError("Failed to fetch video information. Please make sure the URL is correct and the video is publicly available.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (format: string, quality: string) => {
    if (!videoInfo || !videoInfo.videoId) {
      setError("Video information not available");
      return;
    }

    // Note: Direct download from browser is not possible due to CORS and YouTube's ToS
    // This would require a backend API service
    // For now, we'll provide instructions and alternative solutions
    
    const message = `To download this video:\n\n` +
      `1. Use a YouTube downloader service (like y2mate.com, savefrom.net)\n` +
      `2. Or use a browser extension\n` +
      `3. Or use a desktop application (like yt-dlp)\n\n` +
      `Video ID: ${videoInfo.videoId}\n` +
      `Format: ${format}\n` +
      `Quality: ${quality}\n\n` +
      `Note: Direct download requires server-side processing due to YouTube's terms of service.`;
    
    alert(message);
    
    // Alternative: Open video in new tab for user to use browser extension
    // window.open(`https://www.youtube.com/watch?v=${videoInfo.videoId}`, '_blank');
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
        <div className="mb-8 rounded-lg bg-blue-50 border border-blue-200 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-800 mb-1">
                How to Download Videos
              </p>
              <p className="text-blue-700">
                This tool extracts video information and displays it. For actual downloads, you can use browser extensions, 
                desktop applications (like yt-dlp), or online services. Please respect copyright laws and YouTube's terms of service.
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
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Fetching Video Info...</span>
                </>
              ) : (
                <>
                  <Youtube className="h-5 w-5" />
                  <span>Get Video Info</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="mb-8 rounded-xl bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 p-8">
            <div className="flex flex-col items-center justify-center text-center">
              <Loader2 className="h-12 w-12 animate-spin text-red-600 mb-4" />
              <p className="text-lg font-semibold text-gray-900 mb-2">
                Fetching Video Information...
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Please wait while we retrieve video details from YouTube
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="h-2 w-2 animate-bounce rounded-full bg-red-600" style={{ animationDelay: '0ms' }}></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-red-600" style={{ animationDelay: '150ms' }}></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-red-600" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
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
                  Choose your preferred download format and quality below.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Video Preview */}
              <div>
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100 mb-3">
                  <img
                    src={videoInfo.thumbnail}
                    alt={videoInfo.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to medium quality thumbnail if maxresdefault fails
                      const target = e.target as HTMLImageElement;
                      if (videoInfo.videoId) {
                        target.src = `https://img.youtube.com/vi/${videoInfo.videoId}/hqdefault.jpg`;
                      }
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity">
                    <a
                      href={`https://www.youtube.com/watch?v=${videoInfo.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-0 hover:opacity-100 transition-opacity"
                    >
                      <div className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                        <Youtube className="h-5 w-5" />
                        <span>Watch on YouTube</span>
                      </div>
                    </a>
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-gray-900">
                  {videoInfo.title}
                </h4>
                <p className="text-gray-600 mt-1">
                  {videoInfo.author}
                  {videoInfo.views !== "N/A" && ` • ${videoInfo.views} views`}
                  {videoInfo.duration !== "N/A" && ` • ${videoInfo.duration}`}
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
