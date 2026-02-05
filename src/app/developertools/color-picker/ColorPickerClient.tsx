"use client";

import { useState, useEffect } from "react";
import { Palette, Copy, CheckCircle, Pipette, Shuffle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOContent from "@/components/SEOContent";
import RelatedTools from "@/components/RelatedTools";
import { getToolSEOContent } from "@/lib/seo-content";
import { getRelatedTools } from "@/lib/seo";

export default function ColorPickerClient() {
  const seoContent = getToolSEOContent("color-picker");
  const relatedTools = getRelatedTools("color-picker");
  const [selectedColor, setSelectedColor] = useState("#3B82F6");
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  // Color format conversions
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const getColorFormats = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    
    return {
      hex: hex.toUpperCase(),
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      rgba: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      hsla: `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, 1)`,
      css: `--color: ${hex};`,
      tailwind: getTailwindColor(hex),
    };
  };

  const getTailwindColor = (hex: string) => {
    const colors = [
      { name: "red", values: ["#FEF2F2", "#FEE2E2", "#FECACA", "#FCA5A5", "#F87171", "#EF4444", "#DC2626", "#B91C1C", "#991B1B", "#7F1D1D"] },
      { name: "orange", values: ["#FFF7ED", "#FFEDD5", "#FED7AA", "#FDBA74", "#FB923C", "#F97316", "#EA580C", "#C2410C", "#9A3412", "#7C2D12"] },
      { name: "yellow", values: ["#FEFCE8", "#FEF3C7", "#FDE68A", "#FCD34D", "#FBBF24", "#F59E0B", "#D97706", "#B45309", "#92400E", "#78350F"] },
      { name: "green", values: ["#F0FDF4", "#DCFCE7", "#BBF7D0", "#86EFAC", "#4ADE80", "#22C55E", "#16A34A", "#15803D", "#166534", "#14532D"] },
      { name: "blue", values: ["#EFF6FF", "#DBEAFE", "#BFDBFE", "#93C5FD", "#60A5FA", "#3B82F6", "#2563EB", "#1D4ED8", "#1E40AF", "#1E3A8A"] },
      { name: "purple", values: ["#FAF5FF", "#F3E8FF", "#E9D5FF", "#D8B4FE", "#C084FC", "#A855F7", "#9333EA", "#7C3AED", "#6D28D9", "#5B21B6"] },
      { name: "pink", values: ["#FDF2F8", "#FCE7F3", "#FBCFE8", "#F9A8D4", "#F472B6", "#EC4899", "#DB2777", "#BE185D", "#9D174D", "#831843"] },
    ];

    let closestColor = "gray-500";
    let minDistance = Infinity;

    colors.forEach(color => {
      color.values.forEach((value, index) => {
        const distance = getColorDistance(hex, value);
        if (distance < minDistance) {
          minDistance = distance;
          const weight = index === 0 ? "50" : index === 1 ? "100" : index === 2 ? "200" : index === 3 ? "300" : index === 4 ? "400" : index === 5 ? "500" : index === 6 ? "600" : index === 7 ? "700" : index === 8 ? "800" : "900";
          closestColor = `${color.name}-${weight}`;
        }
      });
    });

    return closestColor;
  };

  const getColorDistance = (hex1: string, hex2: string) => {
    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);
    if (!rgb1 || !rgb2) return Infinity;

    return Math.sqrt(
      Math.pow(rgb1.r - rgb2.r, 2) +
      Math.pow(rgb1.g - rgb2.g, 2) +
      Math.pow(rgb1.b - rgb2.b, 2)
    );
  };

  const copyToClipboard = async (text: string, format: string) => {
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
      
      setCopiedFormat(format);
      setTimeout(() => setCopiedFormat(null), 2000);
    } catch (err) {
      console.error("Failed to copy color: ", err);
      alert("Failed to copy to clipboard. Please copy manually.");
    }
  };

  const generateRandomColor = () => {
    const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setSelectedColor(randomColor);
  };

  const presetColors = [
    "#FF0000", "#FF8000", "#FFFF00", "#80FF00", "#00FF00", "#00FF80",
    "#00FFFF", "#0080FF", "#0000FF", "#8000FF", "#FF00FF", "#FF0080",
    "#000000", "#404040", "#808080", "#C0C0C0", "#FFFFFF", "#8B4513",
    "#FFC0CB", "#FFB6C1", "#FF69B4", "#FF1493", "#DC143C", "#B22222",
  ];

  const colorFormats = getColorFormats(selectedColor);
  const rgb = hexToRgb(selectedColor);
  const isLight = rgb ? (rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114) > 128 : false;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-amber-800 p-3">
              <Palette className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Color Picker
          </h1>
          <p className="text-lg text-gray-600">
            Pick colors and convert between different color formats
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Color Picker */}
          <div className="lg:col-span-1">
            <div className="rounded-lg bg-white p-6 shadow-lg border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Color Picker</h2>
              
              <div className="space-y-4">
                {/* Color Preview */}
                <div
                  className="w-full h-32 rounded-lg border-2 border-gray-300 flex items-center justify-center"
                  style={{ backgroundColor: selectedColor }}
                >
                  <span className={`text-lg font-semibold ${isLight ? 'text-black' : 'text-white'}`}>
                    {selectedColor}
                  </span>
                </div>

                {/* Color Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color Value
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm font-mono focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Random Color Button */}
                <button
                  onClick={generateRandomColor}
                  className="w-full rounded-md bg-amber-800 px-4 py-2 text-white font-medium hover:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 flex items-center justify-center gap-2"
                >
                  <Shuffle className="h-4 w-4" />
                  Random Color
                </button>

                {/* Preset Colors */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preset Colors
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {presetColors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded border-2 hover:scale-110 transition-transform ${
                          selectedColor === color ? 'border-gray-800' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Color Formats */}
          <div className="lg:col-span-2">
            <div className="rounded-lg bg-white p-6 shadow-lg border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Color Formats</h2>
              
              {colorFormats && (
                <div className="space-y-4">
                  {Object.entries(colorFormats).map(([format, value]) => (
                    <div key={format} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-700 uppercase">
                          {format === "rgba" ? "RGB with Alpha" : 
                           format === "hsla" ? "HSL with Alpha" : 
                           format === "css" ? "CSS Variable" :
                           format === "tailwind" ? "Tailwind CSS" :
                           format.toUpperCase()}
                        </div>
                        <div className="text-sm font-mono text-gray-900 mt-1">
                          {value}
                        </div>
                      </div>
                      <button
                        onClick={() => copyToClipboard(value, format)}
                        className={`ml-3 flex items-center gap-1 rounded-md px-3 py-1 text-sm transition-colors ${
                          copiedFormat === format
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                        }`}
                      >
                        {copiedFormat === format ? (
                          <>
                            <CheckCircle className="h-4 w-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Color Harmony */}
            <div className="mt-6 rounded-lg bg-white p-6 shadow-lg border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Color Harmony</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {rgb && (() => {
                  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
                  const complementary = `hsl(${(hsl.h + 180) % 360}, ${hsl.s}%, ${hsl.l}%)`;
                  const triadic1 = `hsl(${(hsl.h + 120) % 360}, ${hsl.s}%, ${hsl.l}%)`;
                  const triadic2 = `hsl(${(hsl.h + 240) % 360}, ${hsl.s}%, ${hsl.l}%)`;
                  const analogous1 = `hsl(${(hsl.h + 30) % 360}, ${hsl.s}%, ${hsl.l}%)`;
                  const analogous2 = `hsl(${(hsl.h - 30 + 360) % 360}, ${hsl.s}%, ${hsl.l}%)`;
                  
                  const harmonies = [
                    { name: "Original", color: selectedColor },
                    { name: "Complementary", color: complementary },
                    { name: "Triadic 1", color: triadic1 },
                    { name: "Triadic 2", color: triadic2 },
                    { name: "Analogous 1", color: analogous1 },
                    { name: "Analogous 2", color: analogous2 },
                  ];

                  return harmonies.map((harmony, index) => (
                    <div key={index} className="text-center">
                      <div
                        className="w-full h-16 rounded-lg border border-gray-300 mb-2 cursor-pointer hover:scale-105 transition-transform"
                        style={{ backgroundColor: harmony.color }}
                        onClick={() => setSelectedColor(harmony.color)}
                        title={`Click to select ${harmony.name}`}
                      />
                      <div className="text-xs font-medium text-gray-700">{harmony.name}</div>
                      <div className="text-xs font-mono text-gray-500">{harmony.color}</div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 rounded-lg bg-blue-50 p-6 border border-blue-200">
          <h3 className="mb-3 text-lg font-semibold text-blue-900">How to use:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
            <li>Use the color picker or enter a hex value to select a color</li>
            <li>View the color in different formats (HEX, RGB, HSL, etc.)</li>
            <li>Click "Copy" next to any format to copy it to clipboard</li>
            <li>Use preset colors or generate random colors for inspiration</li>
            <li>Explore color harmonies for complementary color schemes</li>
          </ol>
          
          <div className="mt-4 p-3 bg-blue-100 rounded-md">
            <h4 className="font-semibold text-blue-900 mb-2">Color Format Uses:</h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• <strong>HEX:</strong> Web development, CSS styling</li>
              <li>• <strong>RGB:</strong> Digital displays, image editing</li>
              <li>• <strong>HSL:</strong> Intuitive color adjustments</li>
              <li>• <strong>CSS Variables:</strong> Maintainable stylesheets</li>
              <li>• <strong>Tailwind:</strong> Utility-first CSS framework</li>
            </ul>
          </div>
        </div>

        <SEOContent whatIsIt={seoContent.whatIsIt} howToUse={seoContent.howToUse} features={seoContent.features} faq={seoContent.faq} />
        <RelatedTools tools={relatedTools} />
      </main>

      <Footer />
    </div>
  );
}
