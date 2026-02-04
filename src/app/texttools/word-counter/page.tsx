"use client";

import { useState, useEffect } from "react";
import { Type, FileText, Hash, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function WordCounter() {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
  });

  useEffect(() => {
    const calculateStats = () => {
      const characters = text.length;
      const charactersNoSpaces = text.replace(/\s/g, "").length;
      
      // Count words (split by whitespace and filter empty strings)
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      
      // Count sentences (split by sentence endings)
      const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0;
      
      // Count paragraphs (split by double line breaks)
      const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length : 0;
      
      // Calculate reading time (average 200 words per minute)
      const readingTime = Math.ceil(words / 200);

      setStats({
        characters,
        charactersNoSpaces,
        words,
        sentences,
        paragraphs,
        readingTime,
      });
    };

    calculateStats();
  }, [text]);

  const handleClear = () => {
    setText("");
  };

  const handleSampleText = () => {
    const sample = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`;
    setText(sample);
  };

  const statCards = [
    {
      icon: Type,
      label: "Characters",
      value: stats.characters.toLocaleString(),
      color: "bg-blue-500",
    },
    {
      icon: Hash,
      label: "Characters (no spaces)",
      value: stats.charactersNoSpaces.toLocaleString(),
      color: "bg-green-500",
    },
    {
      icon: FileText,
      label: "Words",
      value: stats.words.toLocaleString(),
      color: "bg-purple-500",
    },
    {
      icon: Type,
      label: "Sentences",
      value: stats.sentences.toLocaleString(),
      color: "bg-orange-500",
    },
    {
      icon: FileText,
      label: "Paragraphs",
      value: stats.paragraphs.toLocaleString(),
      color: "bg-red-500",
    },
    {
      icon: Clock,
      label: "Reading Time",
      value: `${stats.readingTime} min`,
      color: "bg-indigo-500",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-purple-500 p-3">
              <Type className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Word Counter
          </h1>
          <p className="text-lg text-gray-600">
            Count words, characters, sentences, and paragraphs in your text
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Text Input */}
          <div className="lg:col-span-2">
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
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text here..."
                className="w-full h-96 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>

          {/* Statistics */}
          <div className="lg:col-span-1">
            <div className="rounded-lg bg-white p-6 shadow-lg border border-gray-200">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Statistics</h2>
              
              <div className="space-y-4">
                {statCards.map((stat, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className={`rounded-full ${stat.color} p-2 mr-3`}>
                      <stat.icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">{stat.label}</p>
                      <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">Quick Facts</h3>
                <div className="space-y-1 text-xs text-blue-800">
                  <p>• Average word length: {stats.words > 0 ? (stats.charactersNoSpaces / stats.words).toFixed(1) : 0} characters</p>
                  <p>• Average sentence length: {stats.sentences > 0 ? (stats.words / stats.sentences).toFixed(1) : 0} words</p>
                  <p>• Average paragraph length: {stats.paragraphs > 0 ? (stats.words / stats.paragraphs).toFixed(1) : 0} words</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 rounded-lg bg-blue-50 p-6 border border-blue-200">
          <h3 className="mb-3 text-lg font-semibold text-blue-900">How to use:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
            <li>Type or paste your text in the text area</li>
            <li>View real-time statistics as you type</li>
            <li>Use "Sample Text" to try with example content</li>
            <li>Use "Clear" to start over</li>
          </ol>
          <div className="mt-4 p-3 bg-blue-100 rounded-md">
            <p className="text-xs text-blue-700">
              <strong>Reading Time:</strong> Calculated based on average reading speed of 200 words per minute.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
