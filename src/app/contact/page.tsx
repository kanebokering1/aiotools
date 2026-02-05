import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, MessageSquare, Briefcase, Code, Zap, Shield, Users, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us - Get in Touch | AIO Tools",
  description: "Contact AIO Tools for support, partnerships, or business inquiries. We're here to help! Open for collaboration and custom tool development.",
  keywords: ["contact", "support", "partnership", "collaboration", "business inquiry"],
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-600">
          <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
          <span>/</span>
          <span className="text-gray-900">Contact Us</span>
        </nav>

        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Have questions, suggestions, or want to collaborate? We'd love to hear from you!
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Contact Info & Partnership */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-100 p-8">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white flex-shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Email</h3>
                    <a href="mailto:support@arthacodestudio.com" className="text-blue-600 hover:underline">
                      support@arthacodestudio.com
                    </a>
                    <p className="text-sm text-gray-600 mt-1">We reply within 24 hours!</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-600 text-white flex-shrink-0">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Response Time</h3>
                    <p className="text-gray-700">Usually within 24 hours</p>
                    <p className="text-sm text-gray-600 mt-1">Monday - Friday, 9 AM - 6 PM WIB</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600 text-white flex-shrink-0">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Business Hours</h3>
                    <p className="text-gray-700">Monday - Friday</p>
                    <p className="text-sm text-gray-600 mt-1">9:00 AM - 6:00 PM (WIB)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Partnership Opportunities */}
            <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 p-8">
              <div className="mb-4 flex items-center gap-3">
                <Briefcase className="h-8 w-8 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">Partnership Opportunities</h2>
              </div>
              
              <p className="mb-6 text-gray-700">
                We're always looking for great partnerships and collaboration opportunities!
              </p>

              <div className="space-y-4">
                <div className="rounded-xl bg-white border-2 border-green-200 p-4">
                  <div className="flex items-start gap-3">
                    <Code className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Custom Tool Development</h3>
                      <p className="text-sm text-gray-700">
                        Need a specific tool for your business? We can build custom online tools tailored to your needs.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-white border-2 border-green-200 p-4">
                  <div className="flex items-start gap-3">
                    <Users className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">White Label Solutions</h3>
                      <p className="text-sm text-gray-700">
                        Integrate our tools into your platform. Perfect for SaaS companies, agencies, or enterprises.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-white border-2 border-green-200 p-4">
                  <div className="flex items-start gap-3">
                    <Zap className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">API Integration</h3>
                      <p className="text-sm text-gray-700">
                        Need API access for bulk processing? Contact us for enterprise API solutions.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-white border-2 border-green-200 p-4">
                  <div className="flex items-start gap-3">
                    <Heart className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Affiliate Partnership</h3>
                      <p className="text-sm text-gray-700">
                        Promote our tools and earn commission. Perfect for bloggers, content creators, and influencers.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-white border-2 border-green-200 p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Sponsorship & Advertising</h3>
                      <p className="text-sm text-gray-700">
                        Reach our growing audience of professionals, students, and businesses. Targeted advertising available.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Partner With Us */}
            <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 p-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Why Partner With Us?</h2>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-purple-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Growing user base with high engagement</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-purple-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Professional, reliable infrastructure</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-purple-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Fast development & implementation</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-purple-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Dedicated support & maintenance</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-purple-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Flexible partnership terms</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <div className="sticky top-8 rounded-2xl bg-white border-2 border-gray-200 p-8 shadow-lg">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Send Us a Message</h2>
              
              <form className="space-y-6" action="mailto:support@arthacodestudio.com" method="POST" encType="text/plain">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold text-gray-900">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="John Doe"
                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-900">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="john@example.com"
                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="mb-2 block text-sm font-semibold text-gray-900">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a topic...</option>
                    <option value="support">General Support</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="custom-tool">Custom Tool Development</option>
                    <option value="api">API Access</option>
                    <option value="advertising">Advertising & Sponsorship</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-semibold text-gray-900">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell us more about your inquiry..."
                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-4 text-lg font-semibold text-white transition-colors hover:bg-blue-700 border-2 border-blue-700 hover:border-blue-800 shadow-md hover:shadow-lg"
                >
                  <Mail className="h-5 w-5" />
                  Send Message
                </button>

                <p className="text-center text-sm text-gray-600">
                  We'll respond within 24 hours during business days
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-8 text-center text-white shadow-xl">
          <h2 className="mb-4 text-3xl font-bold">Ready to Collaborate?</h2>
          <p className="mb-6 text-lg text-blue-100">
            Let's build something amazing together. Get in touch with us today!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:support@arthacodestudio.com"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 hover:bg-gray-100 transition-colors shadow-lg"
            >
              <Mail className="h-5 w-5" />
              Email Us
            </a>
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 transition-colors border-2 border-blue-500"
            >
              <Zap className="h-5 w-5" />
              Explore Our Tools
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

