"use client";

import { useState } from "react";
import { CaseSensitive, Copy, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOContent from "@/components/SEOContent";
import RelatedTools from "@/components/RelatedTools";
import { getToolSEOContent } from "@/lib/seo-content";
import { getRelatedTools } from "@/lib/seo";

export default function TextCaseConverterClient() {
  const seoContent = getToolSEOContent("text-case-converter");
  const relatedTools = getRelatedTools("text-case-converter");
  const [inputText, setInputText] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const convertText = (text: string, type: string): string => {
    switch (type) {
      case "uppercase":
        return text.toUpperCase();
      case "lowercase":
        return text.toLowerCase();
      case "title":
        return text.replace(/\w\S*/g, (txt) =>
          txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
      case "sentence":
        return text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) =>
          c.toUpperCase()
        );
      case "camel":
        return text
          .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
            index === 0 ? word.toLowerCase() : word.toUpperCase()
          )
          .replace(/\s+/g, "");
      case "pascal":
        return text
          .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
          .replace(/\s+/g, "");
      case "snake":
        return text.toLowerCase().replace(/\s+/g, "_");
      case "kebab":
        return text.toLowerCase().replace(/\s+/g, "-");
      case "alternating":
        return text
          .split("")
          .map((char, index) =>
            index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
          )
          .join("");
      case "inverse":
        return text
          .split("")
          .map((char) =>
            char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
          )
          .join("");
      default:
        return text;
    }
  };

  const copyToClipboard = async (text: string, index: number) => {
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
      
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      alert("Failed to copy to clipboard. Please copy manually.");
    }
  };

  const conversions = [
    {
      name: "UPPERCASE",
      description: "Convert all letters to uppercase",
      type: "uppercase",
      example: "HELLO WORLD",
    },
    {
      name: "lowercase",
      description: "Convert all letters to lowercase",
      type: "lowercase",
      example: "hello world",
    },
    {
      name: "Title Case",
      description: "Capitalize the first letter of each word",
      type: "title",
      example: "Hello World",
    },
    {
      name: "Sentence case",
      description: "Capitalize the first letter of each sentence",
      type: "sentence",
      example: "Hello world. This is a sentence.",
    },
    {
      name: "camelCase",
      description: "First word lowercase, subsequent words capitalized",
      type: "camel",
      example: "helloWorld",
    },
    {
      name: "PascalCase",
      description: "First letter of each word capitalized, no spaces",
      type: "pascal",
      example: "HelloWorld",
    },
    {
      name: "snake_case",
      description: "All lowercase with underscores instead of spaces",
      type: "snake",
      example: "hello_world",
    },
    {
      name: "kebab-case",
      description: "All lowercase with hyphens instead of spaces",
      type: "kebab",
      example: "hello-world",
    },
    {
      name: "aLtErNaTiNg CaSe",
      description: "Alternating uppercase and lowercase letters",
      type: "alternating",
      example: "hElLo WoRlD",
    },
    {
      name: "iNVERSE cASE",
      description: "Invert the case of each letter",
      type: "inverse",
      example: "hELLO wORLD",
    },
  ];

  const handleSampleText = () => {
    setInputText("Hello World! This is a sample text for case conversion.");
  };

  const handleClear = () => {
    setInputText("");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-purple-600 p-3">
              <CaseSensitive className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Text Case Converter
          </h1>
          <p className="text-lg text-gray-600">
            Convert text to different cases: uppercase, lowercase, title case, and more
          </p>
        </div>

        {/* Input Section */}
        <div className="mb-8">
          <div className="rounded-lg bg-white p-6 shadow-lg border border-gray-200">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Enter Your Text</h2>
              <div className="flex gap-2">
                <button
                  onClick={handleSampleText}
                  className="rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200"
                >
                  Sample Text
                </button>
                <button
                  onClick={handleClear}
                  className="rounded-md bg-red-100 px-3 py-1 text-sm text-red-700 hover:bg-red-200"
                >
                  Clear
                </button>
              </div>
            </div>
            
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type or paste your text here..."
              className="w-full h-32 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
            />
          </div>
        </div>

        {/* Conversions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Converted Text</h2>
          
          {conversions.map((conversion, index) => {
            const convertedText = inputText ? convertText(inputText, conversion.type) : conversion.example;
            const isCopied = copiedIndex === index;
            
            return (
              <div key={index} className="rounded-lg bg-white p-4 shadow-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{conversion.name}</h3>
                    <p className="text-sm text-gray-600">{conversion.description}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(convertedText, index)}
                    className={`flex items-center gap-2 rounded-md px-3 py-1 text-sm transition-colors ${
                      isCopied
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                    }`}
                  >
                    {isCopied ? (
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
                
                <div className="bg-gray-50 rounded-md p-3 border">
                  <p className="text-sm text-gray-800 font-mono break-words">
                    {convertedText || "Enter text above to see conversion..."}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Instructions */}
        <div className="mt-8 rounded-lg bg-blue-50 p-6 border border-blue-200">
          <h3 className="mb-3 text-lg font-semibold text-blue-900">How to use:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
            <li>Enter or paste your text in the input field</li>
            <li>View all case conversions automatically</li>
            <li>Click "Copy" next to any conversion to copy it to clipboard</li>
            <li>Use "Sample Text" to try with example content</li>
          </ol>
          <div className="mt-4 p-3 bg-blue-100 rounded-md">
            <p className="text-xs text-blue-700">
              <strong>Tip:</strong> Different case styles are useful for programming, writing, and formatting text for various purposes.
            </p>
          </div>
        </div>

        <SEOContent whatIsIt={seoContent.whatIsIt} howToUse={seoContent.howToUse} features={seoContent.features} faq={seoContent.faq} />
        <RelatedTools tools={relatedTools} />
      </main>

      <Footer />
    </div>
  );
}
