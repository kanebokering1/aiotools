"use client";

import { useState } from "react";
import { FileCode, Copy, CheckCircle, ArrowUpDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOContent from "@/components/SEOContent";
import RelatedTools from "@/components/RelatedTools";
import { getToolSEOContent } from "@/lib/seo-content";
import { getRelatedTools } from "@/lib/seo";

export default function HTMLEncoderClient() {
  const seoContent = getToolSEOContent("html-encoder");
  const relatedTools = getRelatedTools("html-encoder");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);

  const htmlEntities: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;",
    "`": "&#x60;",
    "=": "&#x3D;",
    " ": "&nbsp;", // Non-breaking space (optional)
  };

  const reverseHtmlEntities: { [key: string]: string } = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&#x2F;": "/",
    "&#x2f;": "/",
    "&#x60;": "`",
    "&#x3D;": "=",
    "&#x3d;": "=",
    "&nbsp;": " ",
    "&apos;": "'",
  };

  const encodeHTML = (text: string): string => {
    return text.replace(/[&<>"'\/`=]/g, (match) => htmlEntities[match] || match);
  };

  const decodeHTML = (text: string): string => {
    let decoded = text;
    
    // Handle named entities
    Object.entries(reverseHtmlEntities).forEach(([entity, char]) => {
      decoded = decoded.replace(new RegExp(entity, "gi"), char);
    });
    
    // Handle numeric entities (decimal)
    decoded = decoded.replace(/&#(\d+);/g, (match, dec) => {
      return String.fromCharCode(parseInt(dec, 10));
    });
    
    // Handle numeric entities (hexadecimal)
    decoded = decoded.replace(/&#x([0-9a-f]+);/gi, (match, hex) => {
      return String.fromCharCode(parseInt(hex, 16));
    });
    
    return decoded;
  };

  const processText = () => {
    if (!inputText.trim()) {
      setOutputText("");
      return;
    }

    if (mode === "encode") {
      setOutputText(encodeHTML(inputText));
    } else {
      setOutputText(decodeHTML(inputText));
    }
  };

  const copyToClipboard = async () => {
    if (!outputText) return;
    
    try {
      // Try modern Clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(outputText);
      } else {
        // Fallback for older browsers or non-HTTPS
        const textArea = document.createElement("textarea");
        textArea.value = outputText;
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
    if (mode === "encode") {
      setInputText('<div class="example">Hello & welcome to "HTML Encoding"!</div>');
    } else {
      setInputText('&lt;div class=&quot;example&quot;&gt;Hello &amp; welcome to &quot;HTML Encoding&quot;!&lt;/div&gt;');
    }
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
  };

  const swapInputOutput = () => {
    const temp = inputText;
    setInputText(outputText);
    setOutputText(temp);
    setMode(mode === "encode" ? "decode" : "encode");
  };

  // Auto-process when input changes
  useState(() => {
    processText();
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-amber-600 p-3">
              <FileCode className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            HTML Encoder/Decoder
          </h1>
          <p className="text-lg text-gray-600">
            Encode and decode HTML entities for safe display in web pages
          </p>
        </div>

        {/* Mode Selection */}
        <div className="mb-6 flex justify-center">
          <div className="flex rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => setMode("encode")}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                mode === "encode"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Encode HTML
            </button>
            <button
              onClick={() => setMode("decode")}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                mode === "decode"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Decode HTML
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={processText}
            className="rounded-md bg-amber-600 hover:bg-amber-700 border-2 border-amber-700 hover:border-amber-800 px-4 py-2 text-sm text-white font-semibold transition-all shadow-sm hover:shadow-md"
          >
            {mode === "encode" ? "Encode" : "Decode"}
          </button>
          
          <button
            onClick={swapInputOutput}
            className="rounded-md bg-blue-600 hover:bg-blue-700 border-2 border-blue-700 hover:border-blue-800 px-4 py-2 text-sm text-white font-semibold transition-all shadow-sm hover:shadow-md flex items-center gap-2"
          >
            <ArrowUpDown className="h-4 w-4" />
            Swap & Switch Mode
          </button>

          <button
            onClick={handleSampleText}
            className="rounded-md bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
          >
            Sample Text
          </button>
          
          <button
            onClick={handleClear}
            className="rounded-md bg-red-100 px-4 py-2 text-sm text-red-700 hover:bg-red-200"
          >
            Clear
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div>
            <div className="rounded-lg bg-white shadow-lg border border-gray-200">
              <div className="border-b border-gray-200 px-4 py-3">
                <h2 className="text-lg font-semibold text-gray-900">
                  {mode === "encode" ? "Original Text" : "Encoded HTML"}
                </h2>
              </div>
              <div className="p-4">
                <textarea
                  value={inputText}
                  onChange={(e) => {
                    setInputText(e.target.value);
                    // Auto-process on input change
                    setTimeout(() => processText(), 100);
                  }}
                  placeholder={
                    mode === "encode"
                      ? "Enter text with HTML characters to encode..."
                      : "Enter HTML entities to decode..."
                  }
                  className="w-full h-64 rounded-md border border-gray-300 px-3 py-2 text-sm font-mono focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Output */}
          <div>
            <div className="rounded-lg bg-white shadow-lg border border-gray-200">
              <div className="border-b border-gray-200 px-4 py-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {mode === "encode" ? "Encoded HTML" : "Decoded Text"}
                  </h2>
                  {outputText && (
                    <button
                      onClick={copyToClipboard}
                      className={`flex items-center gap-1 rounded-md px-3 py-1 text-sm transition-colors ${
                        copied
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                      }`}
                    >
                      {copied ? (
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
                  )}
                </div>
              </div>
              <div className="p-4">
                <textarea
                  value={outputText}
                  readOnly
                  placeholder={
                    mode === "encode"
                      ? "Encoded HTML entities will appear here..."
                      : "Decoded text will appear here..."
                  }
                  className="w-full h-64 rounded-md border border-gray-300 px-3 py-2 text-sm font-mono bg-gray-50 resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Common HTML Entities Reference */}
        <div className="mt-8 rounded-lg bg-gray-50 p-6 border border-gray-200">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Common HTML Entities</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="space-y-2">
              <div className="font-mono">
                <span className="font-semibold">&amp;</span> → <span className="text-blue-600">&amp;amp;</span>
              </div>
              <div className="font-mono">
                <span className="font-semibold">&lt;</span> → <span className="text-blue-600">&amp;lt;</span>
              </div>
              <div className="font-mono">
                <span className="font-semibold">&gt;</span> → <span className="text-blue-600">&amp;gt;</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="font-mono">
                <span className="font-semibold">"</span> → <span className="text-blue-600">&amp;quot;</span>
              </div>
              <div className="font-mono">
                <span className="font-semibold">'</span> → <span className="text-blue-600">&amp;#39;</span>
              </div>
              <div className="font-mono">
                <span className="font-semibold">/</span> → <span className="text-blue-600">&amp;#x2F;</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="font-mono">
                <span className="font-semibold">`</span> → <span className="text-blue-600">&amp;#x60;</span>
              </div>
              <div className="font-mono">
                <span className="font-semibold">=</span> → <span className="text-blue-600">&amp;#x3D;</span>
              </div>
              <div className="font-mono">
                <span className="font-semibold">space</span> → <span className="text-blue-600">&amp;nbsp;</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-xs text-gray-600">
                <div>Numeric: <span className="font-mono">&amp;#65;</span> (decimal)</div>
                <div>Hex: <span className="font-mono">&amp;#x41;</span> (hexadecimal)</div>
                <div>Both represent: <span className="font-semibold">A</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 rounded-lg bg-blue-50 p-6 border border-blue-200">
          <h3 className="mb-3 text-lg font-semibold text-blue-900">How to use:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
            <li>Choose between "Encode HTML" or "Decode HTML" mode</li>
            <li>Enter your text in the input area</li>
            <li>The conversion happens automatically as you type</li>
            <li>Click "Copy" to copy the result to clipboard</li>
            <li>Use "Swap & Switch Mode" to reverse input/output and toggle mode</li>
          </ol>
          
          <div className="mt-4 p-3 bg-blue-100 rounded-md">
            <h4 className="font-semibold text-blue-900 mb-2">When to use:</h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• <strong>Encoding:</strong> Before displaying user input in HTML to prevent XSS attacks</li>
              <li>• <strong>Decoding:</strong> To convert HTML entities back to readable text</li>
              <li>• <strong>Data Processing:</strong> When working with HTML content in APIs or databases</li>
              <li>• <strong>Security:</strong> Sanitizing user input for safe display</li>
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
