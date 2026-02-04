"use client";

import { useState } from "react";
import { Code, Copy, CheckCircle, AlertCircle, Download, Upload } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function JSONFormatter() {
  const [inputJson, setInputJson] = useState("");
  const [outputJson, setOutputJson] = useState("");
  const [indentSize, setIndentSize] = useState(2);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const formatJSON = () => {
    if (!inputJson.trim()) {
      setError("Please enter JSON to format");
      setOutputJson("");
      return;
    }

    try {
      const parsed = JSON.parse(inputJson);
      const formatted = JSON.stringify(parsed, null, indentSize);
      setOutputJson(formatted);
      setError("");
    } catch (err) {
      setError("Invalid JSON format. Please check your syntax.");
      setOutputJson("");
    }
  };

  const minifyJSON = () => {
    if (!inputJson.trim()) {
      setError("Please enter JSON to minify");
      setOutputJson("");
      return;
    }

    try {
      const parsed = JSON.parse(inputJson);
      const minified = JSON.stringify(parsed);
      setOutputJson(minified);
      setError("");
    } catch (err) {
      setError("Invalid JSON format. Please check your syntax.");
      setOutputJson("");
    }
  };

  const validateJSON = () => {
    if (!inputJson.trim()) {
      setError("Please enter JSON to validate");
      return;
    }

    try {
      JSON.parse(inputJson);
      setError("");
      alert("✅ Valid JSON!");
    } catch (err) {
      setError(`Invalid JSON: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const copyToClipboard = async () => {
    if (!outputJson) return;
    
    try {
      // Try modern Clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(outputJson);
      } else {
        // Fallback for older browsers or non-HTTPS
        const textArea = document.createElement("textarea");
        textArea.value = outputJson;
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
      console.error("Failed to copy JSON: ", err);
      alert("Failed to copy to clipboard. Please copy manually.");
    }
  };

  const downloadJSON = () => {
    if (!outputJson) return;

    const blob = new Blob([outputJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `formatted_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setInputJson(content);
        setError("");
      };
      reader.readAsText(file);
    } else {
      setError("Please select a valid JSON file");
    }
  };

  const handleSampleJSON = () => {
    const sample = `{
  "name": "John Doe",
  "age": 30,
  "city": "New York",
  "hobbies": ["reading", "swimming", "coding"],
  "address": {
    "street": "123 Main St",
    "zipCode": "10001"
  },
  "isActive": true,
  "balance": 1250.50
}`;
    setInputJson(sample);
    setError("");
  };

  const handleClear = () => {
    setInputJson("");
    setOutputJson("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-amber-500 p-3">
              <Code className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            JSON Formatter
          </h1>
          <p className="text-lg text-gray-600">
            Format, minify, and validate JSON data with syntax highlighting
          </p>
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Indent:</label>
            <select
              value={indentSize}
              onChange={(e) => setIndentSize(parseInt(e.target.value))}
              className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={8}>8 spaces</option>
            </select>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={formatJSON}
              className="rounded-md bg-blue-600 hover:bg-blue-700 border-2 border-blue-700 hover:border-blue-800 px-3 py-1 text-sm text-white font-semibold transition-all shadow-sm hover:shadow-md"
            >
              Format
            </button>
            <button
              onClick={minifyJSON}
              className="rounded-md bg-green-600 hover:bg-green-700 border-2 border-green-700 hover:border-green-800 px-3 py-1 text-sm text-white font-semibold transition-all shadow-sm hover:shadow-md"
            >
              Minify
            </button>
            <button
              onClick={validateJSON}
              className="rounded-md bg-purple-600 hover:bg-purple-700 border-2 border-purple-700 hover:border-purple-800 px-3 py-1 text-sm text-white font-semibold transition-all shadow-sm hover:shadow-md"
            >
              Validate
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSampleJSON}
              className="rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200"
            >
              Sample
            </button>
            <button
              onClick={handleClear}
              className="rounded-md bg-red-100 px-3 py-1 text-sm text-red-700 hover:bg-red-200"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div>
            <div className="rounded-lg bg-white shadow-lg border border-gray-200">
              <div className="border-b border-gray-200 px-4 py-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Input JSON</h2>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="json-upload"
                    />
                    <label
                      htmlFor="json-upload"
                      className="cursor-pointer flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700 hover:bg-gray-200"
                    >
                      <Upload className="h-3 w-3" />
                      Upload
                    </label>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <textarea
                  value={inputJson}
                  onChange={(e) => setInputJson(e.target.value)}
                  placeholder="Paste your JSON here..."
                  className="w-full h-96 rounded-md border border-gray-300 px-3 py-2 text-sm font-mono focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Output */}
          <div>
            <div className="rounded-lg bg-white shadow-lg border border-gray-200">
              <div className="border-b border-gray-200 px-4 py-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Formatted JSON</h2>
                  <div className="flex items-center gap-2">
                    {outputJson && (
                      <>
                        <button
                          onClick={copyToClipboard}
                          className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-colors ${
                            copied
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700 hover:bg-blue-200"
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
                              Copy
                            </>
                          )}
                        </button>
                        <button
                          onClick={downloadJSON}
                          className="flex items-center gap-1 rounded-md bg-green-100 px-2 py-1 text-xs text-green-700 hover:bg-green-200"
                        >
                          <Download className="h-3 w-3" />
                          Download
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <textarea
                  value={outputJson}
                  readOnly
                  placeholder="Formatted JSON will appear here..."
                  className="w-full h-96 rounded-md border border-gray-300 px-3 py-2 text-sm font-mono bg-gray-50 resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-6 rounded-md bg-red-50 p-4 border border-red-200">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 rounded-lg bg-blue-50 p-6 border border-blue-200">
          <h3 className="mb-3 text-lg font-semibold text-blue-900">How to use:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
            <li>Paste your JSON data in the input area or upload a JSON file</li>
            <li>Choose your preferred indentation (2, 4, or 8 spaces)</li>
            <li>Click "Format" to beautify, "Minify" to compress, or "Validate" to check syntax</li>
            <li>Copy the result or download it as a file</li>
          </ol>
          
          <div className="mt-4 p-3 bg-blue-100 rounded-md">
            <h4 className="font-semibold text-blue-900 mb-2">Features:</h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• <strong>Format:</strong> Beautify JSON with proper indentation</li>
              <li>• <strong>Minify:</strong> Remove whitespace to reduce file size</li>
              <li>• <strong>Validate:</strong> Check if JSON syntax is correct</li>
              <li>• <strong>Upload/Download:</strong> Work with JSON files directly</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
