"use client";

import { useState, useEffect } from "react";
import { Key, Copy, CheckCircle, RefreshCw, Shield, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOContent from "@/components/SEOContent";
import RelatedTools from "@/components/RelatedTools";
import { getToolSEOContent } from "@/lib/seo-content";
import { getRelatedTools } from "@/lib/seo";

export default function PasswordGeneratorClient() {
  const seoContent = getToolSEOContent("password-generator");
  const relatedTools = getRelatedTools("password-generator");
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [copied, setCopied] = useState(false);

  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  const similarChars = "il1Lo0O";

  const generatePassword = () => {
    let charset = "";
    
    if (includeUppercase) charset += uppercaseChars;
    if (includeLowercase) charset += lowercaseChars;
    if (includeNumbers) charset += numberChars;
    if (includeSymbols) charset += symbolChars;

    if (excludeSimilar) {
      charset = charset.split("").filter(char => !similarChars.includes(char)).join("");
    }

    if (charset === "") {
      setPassword("Please select at least one character type");
      return;
    }

    let generatedPassword = "";
    
    // Ensure at least one character from each selected type
    if (includeUppercase) {
      const chars = excludeSimilar ? uppercaseChars.split("").filter(char => !similarChars.includes(char)) : uppercaseChars;
      generatedPassword += chars[Math.floor(Math.random() * chars.length)];
    }
    if (includeLowercase) {
      const chars = excludeSimilar ? lowercaseChars.split("").filter(char => !similarChars.includes(char)) : lowercaseChars;
      generatedPassword += chars[Math.floor(Math.random() * chars.length)];
    }
    if (includeNumbers) {
      const chars = excludeSimilar ? numberChars.split("").filter(char => !similarChars.includes(char)) : numberChars;
      generatedPassword += chars[Math.floor(Math.random() * chars.length)];
    }
    if (includeSymbols) {
      generatedPassword += symbolChars[Math.floor(Math.random() * symbolChars.length)];
    }

    // Fill the rest of the password length
    for (let i = generatedPassword.length; i < length; i++) {
      generatedPassword += charset[Math.floor(Math.random() * charset.length)];
    }

    // Shuffle the password
    const passwordArray = generatedPassword.split("");
    for (let i = passwordArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
    }

    setPassword(passwordArray.join(""));
  };

  const copyToClipboard = async () => {
    if (!password || password.includes("Please select")) return;
    
    try {
      // Try modern Clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(password);
      } else {
        // Fallback for older browsers or non-HTTPS
        const textArea = document.createElement("textarea");
        textArea.value = password;
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
      console.error("Failed to copy password: ", err);
      alert("Failed to copy to clipboard. Please copy manually.");
    }
  };

  const getPasswordStrength = (pwd: string): { strength: string; color: string; score: number } => {
    if (!pwd || pwd.includes("Please select")) return { strength: "None", color: "text-gray-500", score: 0 };
    
    let score = 0;
    
    // Length scoring
    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 1;
    if (pwd.length >= 16) score += 1;
    
    // Character variety scoring
    if (/[a-z]/.test(pwd)) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    
    if (score <= 2) return { strength: "Weak", color: "text-red-600", score };
    if (score <= 4) return { strength: "Medium", color: "text-yellow-600", score };
    if (score <= 6) return { strength: "Strong", color: "text-green-600", score };
    return { strength: "Very Strong", color: "text-green-700", score };
  };

  const strengthInfo = getPasswordStrength(password);

  // Generate initial password on component mount (client-side only)
  useEffect(() => {
    generatePassword();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Password Generator Online",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "All",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
          })
        }}
      />
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-purple-800 p-3">
              <Key className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Password Generator
          </h1>
          <p className="text-lg text-gray-600">
            Generate secure, random passwords with customizable options
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Settings */}
          <div className="lg:col-span-1">
            <div className="rounded-lg bg-white p-6 shadow-lg border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Password Settings</h2>
              
              <div className="space-y-4">
                {/* Length */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Length: {length} characters
                  </label>
                  <input
                    type="range"
                    min="4"
                    max="64"
                    value={length}
                    onChange={(e) => setLength(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>4</span>
                    <span>64</span>
                  </div>
                </div>

                {/* Character Types */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-700">Include Characters</h3>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={includeUppercase}
                      onChange={(e) => setIncludeUppercase(e.target.checked)}
                      className="mr-3"
                    />
                    <span className="text-sm text-gray-700">Uppercase (A-Z)</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={includeLowercase}
                      onChange={(e) => setIncludeLowercase(e.target.checked)}
                      className="mr-3"
                    />
                    <span className="text-sm text-gray-700">Lowercase (a-z)</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={includeNumbers}
                      onChange={(e) => setIncludeNumbers(e.target.checked)}
                      className="mr-3"
                    />
                    <span className="text-sm text-gray-700">Numbers (0-9)</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={includeSymbols}
                      onChange={(e) => setIncludeSymbols(e.target.checked)}
                      className="mr-3"
                    />
                    <span className="text-sm text-gray-700">Symbols (!@#$%^&*)</span>
                  </label>
                </div>

                {/* Additional Options */}
                <div className="border-t pt-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={excludeSimilar}
                      onChange={(e) => setExcludeSimilar(e.target.checked)}
                      className="mr-3"
                    />
                    <span className="text-sm text-gray-700">Exclude similar characters (i, l, 1, L, o, 0, O)</span>
                  </label>
                </div>

                {/* Generate Button */}
                <button
                  onClick={generatePassword}
                  className="w-full rounded-md bg-purple-800 px-4 py-2 text-white font-medium hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center justify-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Generate New Password
                </button>
              </div>
            </div>
          </div>

          {/* Generated Password */}
          <div className="lg:col-span-2">
            <div className="rounded-lg bg-white p-6 shadow-lg border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Generated Password</h2>
              
              <div className="space-y-4">
                {/* Password Display */}
                <div className="relative">
                  <div className="bg-gray-50 border border-gray-300 rounded-md p-4 min-h-[60px] flex items-center">
                    <code className="text-lg font-mono break-all flex-1 select-all">
                      {password || "Click 'Generate New Password' to create a password"}
                    </code>
                  </div>
                  {password && !password.includes("Please select") && (
                    <button
                      onClick={copyToClipboard}
                      className={`absolute top-2 right-2 p-2 rounded-md transition-colors ${
                        copied
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                      }`}
                    >
                      {copied ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  )}
                </div>

                {/* Password Strength */}
                {password && !password.includes("Please select") && (
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Password Strength:</span>
                      <span className={`text-sm font-semibold ${strengthInfo.color}`}>
                        {strengthInfo.strength}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          strengthInfo.score <= 2
                            ? "bg-red-500"
                            : strengthInfo.score <= 4
                            ? "bg-yellow-500"
                            : strengthInfo.score <= 6
                            ? "bg-green-500"
                            : "bg-green-600"
                        }`}
                        style={{ width: `${(strengthInfo.score / 7) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Copy Status */}
                {copied && (
                  <div className="bg-green-50 border border-green-200 rounded-md p-3">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm text-green-800">Password copied to clipboard!</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Security Tips */}
            <div className="mt-6 rounded-lg bg-amber-50 p-6 border border-amber-200">
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-amber-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-amber-900 mb-2">Password Security Tips</h3>
                  <ul className="text-xs text-amber-800 space-y-1">
                    <li>• Use a unique password for each account</li>
                    <li>• Store passwords in a secure password manager</li>
                    <li>• Enable two-factor authentication when available</li>
                    <li>• Avoid using personal information in passwords</li>
                    <li>• Change passwords regularly, especially for important accounts</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <SEOContent
          whatIsIt={seoContent.whatIsIt}
          howToUse={seoContent.howToUse}
          features={seoContent.features}
          faq={seoContent.faq}
        />

        {/* Related Tools */}
        <RelatedTools tools={relatedTools} />
      </main>

      <Footer />
    </div>
  );
}
