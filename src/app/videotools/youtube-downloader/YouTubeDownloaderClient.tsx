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
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
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

      // Use our API route to get video info (FREE - no third-party API!)
      const response = await fetch(`/api/youtube/download?videoId=${videoId}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch video information");
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || "Failed to get video information");
      }
      
      // Format duration
      const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
      };
      
      // Format views
      const formatViews = (views: string | number) => {
        if (!views || views === "N/A") return "N/A";
        const num = typeof views === 'string' ? parseInt(views) : views;
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
      };
      
      setVideoInfo({
        title: data.title,
        thumbnail: data.thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        videoId: videoId,
        author: data.author,
        duration: data.duration ? formatDuration(data.duration) : "N/A",
        views: formatViews(data.views),
        embedUrl: `https://www.youtube.com/embed/${videoId}`
      });
      
    } catch (err: any) {
      console.error("Error fetching video info:", err);
      setError(err.message || "Failed to fetch video information. Please make sure the URL is correct and the video is publicly available.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (format: string, quality: string) => {
    if (!videoInfo || !videoInfo.videoId) {
      setError("Video information not available");
      return;
    }

    const downloadKey = `${format}-${quality}`;
    setIsDownloading(downloadKey);
    setError(null);

    try {
      // Call our API route to get download URL
      const response = await fetch('/api/youtube/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoId: videoInfo.videoId,
          format: format === 'MP3' ? 'audio' : 'video',
          quality: quality.toLowerCase().replace('kbps', '').replace('p', 'p')
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get download URL');
      }

      const data = await response.json();
      
      if (!data.success || !data.downloadUrl) {
        throw new Error('No download URL available');
      }

      // Create download link and trigger download
      const link = document.createElement('a');
      link.href = data.downloadUrl;
      link.download = `${videoInfo.title || 'video'}.${format === 'MP3' ? 'mp3' : 'mp4'}`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Show success message
      setError(null);
      
    } catch (err: any) {
      console.error('Download error:', err);
      setError(err.message || 'Failed to download. Please try again.');
    } finally {
      setIsDownloading(null);
    }
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
        <div className="mb-8 rounded-lg bg-green-50 border border-green-200 p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-green-800 mb-1">
                ✅ Direct Download Available!
              </p>
              <p className="text-green-700">
                This tool now supports direct video and audio downloads! Simply click the download button for your preferred format and quality. 
                Please respect copyright laws and YouTube's terms of service.
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
                      disabled={isDownloading === "MP4-1080p"}
                      className="flex w-full items-center justify-between rounded-lg border border-gray-300 px-4 py-3 text-left transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>MP4 - 1080p HD</span>
                      {isDownloading === "MP4-1080p" ? (
                        <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDownload("MP4", "720p")}
                      disabled={isDownloading === "MP4-720p"}
                      className="flex w-full items-center justify-between rounded-lg border border-gray-300 px-4 py-3 text-left transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>MP4 - 720p HD</span>
                      {isDownloading === "MP4-720p" ? (
                        <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDownload("MP4", "480p")}
                      disabled={isDownloading === "MP4-480p"}
                      className="flex w-full items-center justify-between rounded-lg border border-gray-300 px-4 py-3 text-left transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>MP4 - 480p</span>
                      {isDownloading === "MP4-480p" ? (
                        <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Audio Downloads */}
                <div className="space-y-2">
                  <h5 className="font-medium text-gray-900">Audio Only</h5>
                  <div className="grid gap-2">
                    <button
                      onClick={() => handleDownload("MP3", "320kbps")}
                      disabled={isDownloading === "MP3-320kbps"}
                      className="flex w-full items-center justify-between rounded-lg border border-gray-300 px-4 py-3 text-left transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>MP3 - 320 kbps</span>
                      {isDownloading === "MP3-320kbps" ? (
                        <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDownload("MP3", "128kbps")}
                      disabled={isDownloading === "MP3-128kbps"}
                      className="flex w-full items-center justify-between rounded-lg border border-gray-300 px-4 py-3 text-left transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>MP3 - 128 kbps</span>
                      {isDownloading === "MP3-128kbps" ? (
                        <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
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
