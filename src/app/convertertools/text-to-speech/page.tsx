"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mic, Volume2, Play, Pause, AlertCircle } from "lucide-react";

export default function TextToSpeechPage() {
  const [text, setText] = useState<string>("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voice, setVoice] = useState<string>("default");

  const handleSpeak = () => {
    if (!text.trim()) return;

    // Use Web Speech API (browser feature)
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported in your browser.");
    }
  };

  const handleStop = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
            <Mic className="h-8 w-8" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-slate-900">Text to Speech</h1>
          <p className="text-slate-600">Convert text into natural-sounding speech</p>
        </div>

        {/* Info Alert */}
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-1">Browser Support:</p>
            <p>This tool uses the Web Speech API available in modern browsers. Voice quality and available voices may vary by browser and operating system.</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Text Input */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Enter Text</h2>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here..."
              rows={8}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
            <p className="mt-2 text-sm text-slate-500">
              {text.length} characters
            </p>
          </div>

          {/* Voice Settings */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Voice Settings</h2>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Voice</label>
              <select
                value={voice}
                onChange={(e) => setVoice(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              >
                <option value="default">Default Voice</option>
                <option value="male">Male Voice</option>
                <option value="female">Female Voice</option>
              </select>
            </div>
          </div>

          {/* Controls */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex gap-3">
              {!isSpeaking ? (
                <button
                  onClick={handleSpeak}
                  disabled={!text.trim()}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 border-2 border-cyan-700 hover:border-cyan-800 px-6 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md disabled:bg-slate-200 disabled:border-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed"
                >
                  <Play className="h-5 w-5" />
                  Speak
                </button>
              ) : (
                <button
                  onClick={handleStop}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 hover:bg-red-700 border-2 border-red-700 hover:border-red-800 px-6 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md"
                >
                  <Pause className="h-5 w-5" />
                  Stop
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

