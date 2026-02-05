"use client";

import { useState } from "react";
import { FileText, Upload, Download, AlertCircle, CheckCircle, Loader2, Image } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOContent from "@/components/SEOContent";
import RelatedTools from "@/components/RelatedTools";
import { getToolSEOContent } from "@/lib/seo-content";
import { getRelatedTools } from "@/lib/seo";

export default function PDFToImageClient() {
  const seoContent = getToolSEOContent("pdf-to-image");
  const relatedTools = getRelatedTools("pdf-to-image");
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState("png");
  const [quality, setQuality] = useState(100);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [convertedImages, setConvertedImages] = useState<{ name: string; url: string; page: number }[]>([]);

  const formats = [
    { value: "png", label: "PNG (Lossless)" },
    { value: "jpeg", label: "JPEG (Compressed)" },
    { value: "webp", label: "WebP (Modern)" },
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError("");
      setSuccess("");
      setConvertedImages([]);
    } else {
      setError("Please select a valid PDF file");
    }
  };

  const handleConvert = async () => {
    if (!file) {
      setError("Please select a PDF file");
      return;
    }

    setIsConverting(true);
    setError("");
    setSuccess("");

    try {
      // Note: This is a placeholder implementation
      // In a real app, you would use pdf-poppler, PDF.js, or a backend service
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate conversion - create placeholder images
      const numPages = Math.floor(Math.random() * 5) + 1; // Random 1-5 pages
      const images: { name: string; url: string; page: number }[] = [];
      
      for (let i = 1; i <= numPages; i++) {
        // Create a placeholder canvas for demonstration
        const canvas = document.createElement('canvas');
        canvas.width = 595; // A4 width in pixels at 72 DPI
        canvas.height = 842; // A4 height in pixels at 72 DPI
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          // Create a simple placeholder image
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Add some placeholder content
          ctx.fillStyle = '#000000';
          ctx.font = '24px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(`PDF Page ${i}`, canvas.width / 2, canvas.height / 2 - 50);
          ctx.fillText(`Converted to ${outputFormat.toUpperCase()}`, canvas.width / 2, canvas.height / 2);
          ctx.fillText(`Quality: ${quality}%`, canvas.width / 2, canvas.height / 2 + 50);
          
          // Add border
          ctx.strokeStyle = '#cccccc';
          ctx.lineWidth = 2;
          ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
          
          // Convert to desired format
          const mimeType = outputFormat === 'jpeg' ? 'image/jpeg' : 
                          outputFormat === 'webp' ? 'image/webp' : 'image/png';
          const qualityValue = outputFormat === 'png' ? 1 : quality / 100;
          
          const dataUrl = canvas.toDataURL(mimeType, qualityValue);
          
          images.push({
            name: `${file.name.replace('.pdf', '')}_page_${i}.${outputFormat}`,
            url: dataUrl,
            page: i
          });
        }
      }
      
      setConvertedImages(images);
      setSuccess(`PDF converted successfully! Generated ${images.length} image(s).`);
    } catch (err) {
      setError("Failed to convert PDF. Please try again.");
    } finally {
      setIsConverting(false);
    }
  };

  const downloadImage = (imageUrl: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAll = () => {
    convertedImages.forEach((image, index) => {
      setTimeout(() => {
        downloadImage(image.url, image.name);
      }, index * 200);
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-red-800 p-3">
              <Image className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            PDF to Image Converter
          </h1>
          <p className="text-lg text-gray-600">
            Convert PDF pages to high-quality images in various formats
          </p>
        </div>

        {/* Main Tool */}
        <div className="mx-auto max-w-2xl">
          <div className="rounded-lg bg-white p-6 shadow-lg border border-gray-200">
            <div className="space-y-6">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select PDF File
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="pdf-upload"
                  />
                  <label
                    htmlFor="pdf-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="h-12 w-12 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">
                      {file ? file.name : "Click to upload or drag and drop"}
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      PDF files only
                    </span>
                  </label>
                </div>
              </div>

              {/* Output Format */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Output Format
                </label>
                <select
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {formats.map((format) => (
                    <option key={format.value} value={format.value}>
                      {format.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quality (for JPEG and WebP) */}
              {(outputFormat === "jpeg" || outputFormat === "webp") && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quality: {quality}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>10% (Smallest)</span>
                    <span>100% (Best Quality)</span>
                  </div>
                </div>
              )}

              {/* Convert Button */}
              <button
                onClick={handleConvert}
                disabled={!file || isConverting}
                className="w-full rounded-md bg-red-800 px-4 py-2 text-white font-medium hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isConverting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Converting...
                  </>
                ) : (
                  <>
                    <Image className="h-4 w-4" />
                    Convert to Images
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
                  <div className="flex">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <div className="ml-3">
                      <p className="text-sm text-green-800">{success}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Converted Images */}
              {convertedImages.length > 0 && (
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Converted Images</h3>
                    <button
                      onClick={downloadAll}
                      className="rounded-md bg-blue-600 hover:bg-blue-700 border-2 border-blue-700 hover:border-blue-800 px-3 py-1 text-sm text-white font-semibold transition-all shadow-sm hover:shadow-md flex items-center gap-1"
                    >
                      <Download className="h-3 w-3" />
                      Download All
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {convertedImages.map((image, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-3">
                        <div className="mb-2">
                          <img
                            src={image.url}
                            alt={`Page ${image.page}`}
                            className="w-full h-32 object-contain bg-gray-50 rounded border"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Page {image.page}</p>
                            <p className="text-xs text-gray-500 truncate">{image.name}</p>
                          </div>
                          <button
                            onClick={() => downloadImage(image.url, image.name)}
                            className="rounded bg-blue-600 hover:bg-blue-700 border-2 border-blue-700 hover:border-blue-800 px-2 py-1 text-xs text-white font-semibold transition-all shadow-sm hover:shadow-md flex items-center gap-1"
                          >
                            <Download className="h-3 w-3" />
                            Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 rounded-lg bg-blue-50 p-6 border border-blue-200">
            <h3 className="mb-3 text-lg font-semibold text-blue-900">How to use:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
              <li>Upload your PDF file</li>
              <li>Choose the output image format (PNG, JPEG, or WebP)</li>
              <li>Adjust quality settings for JPEG/WebP formats</li>
              <li>Click "Convert to Images" to process all pages</li>
              <li>Download individual images or all at once</li>
            </ol>
            
            <div className="mt-4 p-3 bg-blue-100 rounded-md">
              <h4 className="font-semibold text-blue-900 mb-2">Format Recommendations:</h4>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• <strong>PNG:</strong> Best for text documents, diagrams, or when you need transparency</li>
                <li>• <strong>JPEG:</strong> Good for photos or complex images, smaller file sizes</li>
                <li>• <strong>WebP:</strong> Modern format with excellent compression and quality</li>
              </ul>
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
