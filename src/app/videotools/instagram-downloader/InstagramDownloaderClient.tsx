"use client";

import { useState } from "react";
import { Download, Instagram, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOContent from "@/components/SEOContent";
import RelatedTools from "@/components/RelatedTools";
import { getToolSEOContent } from "@/lib/seo-content";
import { getRelatedTools } from "@/lib/seo";

export default function InstagramDownloaderClient() {
  const seoContent = getToolSEOContent("instagram-downloader");
  const relatedTools = getRelatedTools("instagram-downloader");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleDownload = async () => {
    if (!url.trim()) {
      setError("Please enter an Instagram URL");
      return;
    }

    if (!url.includes("instagram.com")) {
      setError("Please enter a valid Instagram URL");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      // Note: This is a placeholder implementation
      // In a real app, you would integrate with an Instagram downloader API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess("Instagram content ready for download!");
      setDownloadUrl("#"); // Placeholder URL
    } catch (err) {
      setError("Failed to process Instagram URL. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadFile = () => {
    // Placeholder for actual download functionality
    alert("Download functionality would be implemented here with a real Instagram API");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-3">
              <Instagram className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Instagram Downloader
          </h1>
          <p className="text-lg text-gray-600">
            Download photos and videos from Instagram posts, stories, and reels
          </p>
        </div>

        {/* Main Tool */}
        <div className="mx-auto max-w-2xl">
          <div className="rounded-lg bg-white p-6 shadow-lg border border-gray-200">
            <div className="space-y-4">
              {/* URL Input */}
              <div>
                <label htmlFor="instagram-url" className="block text-sm font-medium text-gray-700 mb-2">
                  Instagram URL
                </label>
                <input
                  type="url"
                  id="instagram-url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.instagram.com/p/..."
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                disabled={isLoading}
                className="w-full rounded-md bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-white font-medium hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Download
                  </>
                )}
              </button>

              {/* Error Message */}
              {error && (
                <div className="rounded-md bg-red-50 p-4 border border-red-200">
                  <div className="flex">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                    <div className="ml-3">
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="rounded-md bg-green-50 p-4 border border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <div className="ml-3">
                        <p className="text-sm text-green-800">{success}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleDownloadFile}
                      className="rounded-md bg-green-600 hover:bg-green-700 border-2 border-green-700 hover:border-green-800 px-3 py-1 text-sm text-white transition-all shadow-sm hover:shadow-md"
                    >
                      Download File
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 rounded-lg bg-blue-50 p-6 border border-blue-200">
            <h3 className="mb-3 text-lg font-semibold text-blue-900">How to use:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
              <li>Copy the Instagram post, story, or reel URL</li>
              <li>Paste the URL in the input field above</li>
              <li>Click the "Download" button</li>
              <li>Wait for processing to complete</li>
              <li>Download your file when ready</li>
            </ol>
            <div className="mt-4 p-3 bg-blue-100 rounded-md">
              <p className="text-xs text-blue-700">
                <strong>Note:</strong> This tool respects Instagram's terms of service. Only download content you have permission to use.
              </p>
            </div>
          </div>
        </div>

        <SEOContent whatIsIt={seoContent.whatIsIt} howToUse={seoContent.howToUse} features={seoContent.features} faq={seoContent.faq} />
        <RelatedTools tools={relatedTools} />
      </main>

      <Footer />
    </div>
  );
}
