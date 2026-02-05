"use client";

import { useState } from "react";
import { Mail, Check, Loader2 } from "lucide-react";

/**
 * Newsletter Signup Component
 * 
 * Captures email subscribers for:
 * - Tool updates
 * - New features
 * - Tips & tricks
 * - Marketing campaigns
 * 
 * Integration options:
 * 1. Mailchimp
 * 2. SendGrid
 * 3. ConvertKit
 * 4. Custom API endpoint
 */

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");

    try {
      // TODO: Replace with your newsletter service API
      // Example integrations:
      // - Mailchimp API
      // - SendGrid Lists
      // - ConvertKit Forms
      // - Custom backend endpoint

      // For now, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Log to console (replace with actual API call)
      console.log("Newsletter signup:", email);

      // TODO: Send to your email service
      // Example with fetch:
      // const response = await fetch('/api/newsletter', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });
      //
      // if (!response.ok) throw new Error('Failed to subscribe');

      setStatus("success");
      setMessage("Thanks for subscribing! Check your email for confirmation.");
      setEmail("");

      // Reset after 5 seconds
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);

    } catch (error) {
      setStatus("error");
      setMessage("Oops! Something went wrong. Please try again.");
      
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 3000);
    }
  };

  return (
    <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 p-8 shadow-sm">
      <div className="mx-auto max-w-2xl text-center">
        {/* Icon */}
        <div className="mb-4 flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <Mail className="h-6 w-6 text-blue-600" />
          </div>
        </div>

        {/* Heading */}
        <h3 className="mb-2 text-2xl font-bold text-gray-900">
          Stay Updated!
        </h3>
        <p className="mb-6 text-gray-600">
          Get the latest tools, tips, and updates delivered to your inbox. No spam, unsubscribe anytime.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mx-auto max-w-md">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={status === "loading" || status === "success"}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed border-2 border-blue-700 hover:border-blue-800 shadow-sm hover:shadow-md"
            >
              {status === "loading" && (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="hidden sm:inline">Subscribing...</span>
                </>
              )}
              {status === "success" && (
                <>
                  <Check className="h-5 w-5" />
                  <span className="hidden sm:inline">Subscribed!</span>
                </>
              )}
              {(status === "idle" || status === "error") && (
                <>
                  <Mail className="h-5 w-5" />
                  <span className="hidden sm:inline">Subscribe</span>
                  <span className="sm:hidden">Go</span>
                </>
              )}
            </button>
          </div>

          {/* Status Message */}
          {message && (
            <div
              className={`mt-3 rounded-lg p-3 text-sm ${
                status === "success"
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {message}
            </div>
          )}
        </form>

        {/* Trust Badges */}
        <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Check className="h-4 w-4 text-green-600" />
            100% Free
          </span>
          <span className="flex items-center gap-1">
            <Check className="h-4 w-4 text-green-600" />
            No Spam
          </span>
          <span className="flex items-center gap-1">
            <Check className="h-4 w-4 text-green-600" />
            Unsubscribe Anytime
          </span>
        </div>
      </div>
    </div>
  );
}

/*
 * INTEGRATION GUIDE:
 * ==================
 * 
 * OPTION 1: Mailchimp (Recommended)
 * ----------------------------------
 * 1. Go to: https://mailchimp.com/
 * 2. Create account (Free tier: 500 subscribers)
 * 3. Create audience
 * 4. Get API key
 * 5. Create API route: src/app/api/newsletter/route.ts
 * 6. Install: npm install @mailchimp/mailchimp_marketing
 * 7. Implement API endpoint
 * 
 * OPTION 2: SendGrid
 * ------------------
 * 1. Go to: https://sendgrid.com/
 * 2. Create account (Free tier: 100 emails/day)
 * 3. Get API key
 * 4. Create contact list
 * 5. Implement API endpoint
 * 
 * OPTION 3: ConvertKit
 * --------------------
 * 1. Go to: https://convertkit.com/
 * 2. Best for creators/bloggers
 * 3. Free tier: 1,000 subscribers
 * 4. Easy forms & automation
 * 
 * OPTION 4: Simple Form Storage
 * -----------------------------
 * For MVP, just store in database:
 * 1. Create Supabase/Firebase project
 * 2. Store emails in `newsletter_subscribers` table
 * 3. Export later to email service
 * 
 * BENEFITS FOR YOUR WEBSITE:
 * ==========================
 * 
 * 💰 Monetization:
 *    - Direct marketing channel
 *    - Promote new tools → more traffic → more ad revenue
 *    - Send updates → bring users back → increase pageviews
 * 
 * 📈 Growth:
 *    - Build loyal audience
 *    - 1,000 subscribers = ~100 visitors/email
 *    - 10,000 subscribers = 1,000 visitors/email
 * 
 * 🎯 SEO:
 *    - More engaged users = better metrics
 *    - Email traffic signals to Google = trust
 *    - Return visitors = lower bounce rate
 */

