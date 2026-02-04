"use client";

import { useState } from "react";
import { Hash, Copy, CheckCircle, ArrowUpDown, Upload, Download } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Base64Encoder() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const encodeBase64 = (text: string): string => {
    try {
      return btoa(unescape(encodeURIComponent(text)));
    } catch (err) {
      throw new Error("Failed to encode text");
    }
  };

  const decodeBase64 = (text: string): string => {
    try {
      return decodeURIComponent(escape(atob(text)));
    } catch (err) {
      throw new Error("Invalid Base64 string");
    }
  };

  const processText = () => {
    if (!inputText.trim()) {
      setOutputText("");
      setError("");
      return;
    }

    try {
      if (mode === "encode") {
        setOutputText(encodeBase64(inputText));
      } else {
        setOutputText(decodeBase64(inputText));
      }
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Processing failed");
      setOutputText("");
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      
      if (mode === "encode") {
        // For encoding, read as text
        reader.onload = (e) => {
          const content = e.target?.result as string;
          setInputText(content);
          setError("");
        };
        reader.readAsText(file);
      } else {
        // For decoding, read as binary and convert to base64
        reader.onload = (e) => {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          const bytes = new Uint8Array(arrayBuffer);
          let binary = '';
          bytes.forEach((byte) => binary += String.fromCharCode(byte));
          const base64 = btoa(binary);
          setInputText(base64);
          setError("");
        };
        reader.readAsArrayBuffer(file);
      }
    }
  };

  const downloadResult = () => {
    if (!outputText) return;

    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${mode}d_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSampleText = () => {
    if (mode === "encode") {
      setInputText("Hello World! This is a sample text for Base64 encoding. 🚀");
    } else {
      setInputText("SGVsbG8gV29ybGQhIFRoaXMgaXMgYSBzYW1wbGUgdGV4dCBmb3IgQmFzZTY0IGVuY29kaW5nLiDwn5qA");
    }
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
    setError("");
  };

  const swapInputOutput = () => {
    const temp = inputText;
    setInputText(outputText);
    setOutputText(temp);
    setMode(mode === "encode" ? "decode" : "encode");
    setError("");
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
            <div className="rounded-full bg-amber-700 p-3">
              <Hash className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Base64 Encoder/Decoder
          </h1>
          <p className="text-lg text-gray-600">
            Encode and decode text or files using Base64 encoding
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
              Encode to Base64
            </button>
            <button
              onClick={() => setMode("decode")}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                mode === "decode"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Decode from Base64
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={processText}
            className="rounded-md bg-amber-700 px-4 py-2 text-sm text-white hover:bg-amber-800"
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

          <div className="flex items-center gap-2">
            <input
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer rounded-md bg-green-100 px-4 py-2 text-sm text-green-700 hover:bg-green-200 flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Upload File
            </label>
          </div>

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
                  {mode === "encode" ? "Original Text" : "Base64 Encoded Text"}
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
                      ? "Enter text to encode to Base64..."
                      : "Enter Base64 encoded text to decode..."
                  }
                  className="w-full h-64 rounded-md border border-gray-300 px-3 py-2 text-sm font-mono focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                />
                <div className="mt-2 text-xs text-gray-500">
                  Characters: {inputText.length}
                </div>
              </div>
            </div>
          </div>

          {/* Output */}
          <div>
            <div className="rounded-lg bg-white shadow-lg border border-gray-200">
              <div className="border-b border-gray-200 px-4 py-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {mode === "encode" ? "Base64 Encoded" : "Decoded Text"}
                  </h2>
                  <div className="flex items-center gap-2">
                    {outputText && (
                      <>
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
                        <button
                          onClick={downloadResult}
                          className="flex items-center gap-1 rounded-md bg-green-100 px-3 py-1 text-sm text-green-700 hover:bg-green-200"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <textarea
                  value={outputText}
                  readOnly
                  placeholder={
                    mode === "encode"
                      ? "Base64 encoded text will appear here..."
                      : "Decoded text will appear here..."
                  }
                  className="w-full h-64 rounded-md border border-gray-300 px-3 py-2 text-sm font-mono bg-gray-50 resize-none"
                />
                <div className="mt-2 text-xs text-gray-500">
                  Characters: {outputText.length}
                  {mode === "encode" && inputText && (
                    <span className="ml-4">
                      Size increase: ~{Math.round((outputText.length / inputText.length - 1) * 100)}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-6 rounded-md bg-red-50 p-4 border border-red-200">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Base64 Information */}
        <div className="mt-8 rounded-lg bg-gray-50 p-6 border border-gray-200">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">About Base64 Encoding</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">What is Base64?</h4>
              <p className="text-gray-600 mb-3">
                Base64 is a binary-to-text encoding scheme that represents binary data in ASCII string format.
                It uses 64 characters: A-Z, a-z, 0-9, +, and /.
              </p>
              <h4 className="font-semibold text-gray-800 mb-2">Common Uses:</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Email attachments (MIME)</li>
                <li>• Data URLs in web pages</li>
                <li>• API authentication tokens</li>
                <li>• Storing binary data in text format</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Characteristics:</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Increases data size by ~33%</li>
                <li>• Safe for text-based protocols</li>
                <li>• Reversible encoding (not encryption)</li>
                <li>• Case-sensitive</li>
              </ul>
              <h4 className="font-semibold text-gray-800 mb-2 mt-4">Example:</h4>
              <div className="bg-white p-3 rounded border font-mono text-xs">
                <div><span className="text-gray-500">Text:</span> Hello</div>
                <div><span className="text-gray-500">Base64:</span> SGVsbG8=</div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 rounded-lg bg-blue-50 p-6 border border-blue-200">
          <h3 className="mb-3 text-lg font-semibold text-blue-900">How to use:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
            <li>Choose between "Encode to Base64" or "Decode from Base64" mode</li>
            <li>Enter your text or upload a file</li>
            <li>The conversion happens automatically as you type</li>
            <li>Click "Copy" to copy the result or "Download" to save as file</li>
            <li>Use "Swap & Switch Mode" to reverse input/output and toggle mode</li>
          </ol>
          
          <div className="mt-4 p-3 bg-blue-100 rounded-md">
            <p className="text-xs text-blue-700">
              <strong>Note:</strong> Base64 is encoding, not encryption. It's easily reversible and should not be used for security purposes.
              For secure data, use proper encryption methods.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
