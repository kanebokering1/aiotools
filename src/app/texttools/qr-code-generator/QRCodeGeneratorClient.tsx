"use client";

import { useState } from "react";
import { QrCode, Download, Copy, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOContent from "@/components/SEOContent";
import RelatedTools from "@/components/RelatedTools";
import QRCodeLib from "qrcode";
import { getToolSEOContent } from "@/lib/seo-content";
import { getRelatedTools } from "@/lib/seo";

export default function QRCodeGeneratorClient() {
  const seoContent = getToolSEOContent("qr-code-generator");
  const relatedTools = getRelatedTools("qr-code-generator");
  const [text, setText] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [size, setSize] = useState(256);
  const [errorLevel, setErrorLevel] = useState("M");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const errorLevels = [
    { value: "L", label: "Low (7%)" },
    { value: "M", label: "Medium (15%)" },
    { value: "Q", label: "Quartile (25%)" },
    { value: "H", label: "High (30%)" },
  ];

  const generateQRCode = async () => {
    if (!text.trim()) {
      setError("Please enter text or URL to generate QR code");
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      const qrCodeDataUrl = await QRCodeLib.toDataURL(text, {
        width: size,
        margin: 2,
        errorCorrectionLevel: errorLevel as any,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });

      setQrCodeUrl(qrCodeDataUrl);
    } catch (err) {
      setError("Failed to generate QR code. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = `qrcode_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = async () => {
    try {
      // Try modern Clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers or non-HTTPS
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        textArea.remove();
        
        if (!successful) throw new Error('Copy failed');
      }
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      alert("Failed to copy to clipboard. Please copy manually.");
    }
  };

  const handleSampleText = () => {
    setText("https://example.com");
    setError("");
  };

  const handleClear = () => {
    setText("");
    setQrCodeUrl("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-purple-700 p-3">
              <QrCode className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            QR Code Generator
          </h1>
          <p className="text-lg text-gray-600">
            Generate QR codes for text, URLs, contact info, and more
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div>
            <div className="rounded-lg bg-white p-6 shadow-lg border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">QR Code Content</h2>
              
              <div className="space-y-4">
                {/* Text Input */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">
                      Text or URL
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSampleText}
                        className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700 hover:bg-gray-200"
                      >
                        Sample
                      </button>
                      <button
                        onClick={handleClear}
                        className="rounded-md bg-red-100 px-2 py-1 text-xs text-red-700 hover:bg-red-200"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text, URL, email, phone number, or any data..."
                    className="w-full h-32 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                  />
                  {text && (
                    <button
                      onClick={copyToClipboard}
                      className={`mt-2 flex items-center gap-1 text-xs ${
                        copied ? "text-green-600" : "text-blue-600 hover:text-blue-700"
                      }`}
                    >
                      {copied ? (
                        <>
                          <CheckCircle className="h-3 w-3" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          Copy text
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Size Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size: {size}x{size} pixels
                  </label>
                  <input
                    type="range"
                    min="128"
                    max="512"
                    step="32"
                    value={size}
                    onChange={(e) => setSize(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>128px</span>
                    <span>512px</span>
                  </div>
                </div>

                {/* Error Correction Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Error Correction Level
                  </label>
                  <select
                    value={errorLevel}
                    onChange={(e) => setErrorLevel(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    {errorLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Higher levels allow more damage recovery but create denser codes
                  </p>
                </div>

                {/* Generate Button */}
                <button
                  onClick={generateQRCode}
                  disabled={!text.trim() || isGenerating}
                  className="w-full rounded-md bg-purple-700 px-4 py-2 text-white font-medium hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <QrCode className="h-5 w-5" />
                      <span>Generate QR Code</span>
                    </>
                  )}
                </button>

                {/* Error Message */}
                {error && (
                  <div className="rounded-md bg-red-50 p-3 border border-red-200">
                    <div className="flex">
                      <AlertCircle className="h-4 w-4 text-red-400" />
                      <div className="ml-2">
                        <p className="text-sm text-red-800">{error}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* QR Code Display */}
          <div>
            <div className="rounded-lg bg-white p-6 shadow-lg border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Generated QR Code</h2>
              
              <div className="flex flex-col items-center">
                {isGenerating ? (
                  <div className="flex h-64 flex-col items-center justify-center rounded-lg bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 w-full">
                    <Loader2 className="h-12 w-12 animate-spin text-purple-600 mb-4" />
                    <p className="text-lg font-semibold text-gray-900 mb-2">
                      Generating QR Code...
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      Please wait while we create your QR code
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-purple-600" style={{ animationDelay: '0ms' }}></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-purple-600" style={{ animationDelay: '150ms' }}></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-purple-600" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                ) : qrCodeUrl ? (
                  <>
                    <div className="mb-4 p-4 bg-white border-2 border-gray-200 rounded-lg">
                      <img
                        src={qrCodeUrl}
                        alt="Generated QR Code"
                        className="max-w-full h-auto"
                        style={{ imageRendering: "pixelated" }}
                      />
                    </div>
                    <button
                      onClick={downloadQRCode}
                      className="w-full rounded-md bg-green-600 hover:bg-green-700 border-2 border-green-700 hover:border-green-800 px-4 py-2 text-white font-semibold transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download QR Code
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                    <QrCode className="h-16 w-16 mb-4" />
                    <p className="text-sm">Enter text and click "Generate QR Code"</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 rounded-lg bg-blue-50 p-6 border border-blue-200">
          <h3 className="mb-3 text-lg font-semibold text-blue-900">How to use:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
            <li>Enter your text, URL, or data in the input field</li>
            <li>Adjust the size and error correction level as needed</li>
            <li>Click "Generate QR Code" to create your QR code</li>
            <li>Download the QR code image to your device</li>
          </ol>
          
          <div className="mt-4 p-3 bg-blue-100 rounded-md">
            <h4 className="font-semibold text-blue-900 mb-2">Common QR Code Uses:</h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Website URLs: https://example.com</li>
              <li>• Email addresses: mailto:user@example.com</li>
              <li>• Phone numbers: tel:+1234567890</li>
              <li>• WiFi credentials: WIFI:T:WPA;S:NetworkName;P:Password;;</li>
              <li>• SMS messages: sms:+1234567890:Hello World</li>
            </ul>
          </div>
        </div>

        <SEOContent
          whatIsIt={seoContent.whatIsIt}
          howToUse={seoContent.howToUse}
          features={seoContent.features}
          faq={seoContent.faq}
        />
        <RelatedTools tools={relatedTools} />
      </main>

      <Footer />
    </div>
  );
}
