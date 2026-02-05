import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, Users, Zap, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | AIO Tools",
  description: "Learn about AIO Tools - Free online tools for everyone. Our mission, vision, and team.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
            About AIO Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Making productivity tools accessible to everyone, everywhere, for free.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid gap-8 md:grid-cols-2 mb-16">
          <div className="rounded-2xl bg-white border-2 border-blue-200 p-8 shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-gray-900">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              To provide powerful, easy-to-use online tools that help people be more
              productive without the need for expensive software or technical knowledge.
              Everyone deserves access to great tools.
            </p>
          </div>

          <div className="rounded-2xl bg-white border-2 border-purple-200 p-8 shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-gray-900">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              To become the go-to platform for all online tools, trusted by millions
              worldwide. We aim to continuously expand our tool collection based on
              user needs and feedback.
            </p>
          </div>
        </div>

        {/* What We Offer */}
        <div className="rounded-2xl bg-white border-2 border-gray-200 p-8 shadow-lg mb-16">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 text-center">
            What We Offer
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="mb-3 text-4xl">📄</div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">PDF Tools</h3>
              <p className="text-gray-600">
                Merge, split, compress, and convert PDF files with ease
              </p>
            </div>
            <div className="text-center">
              <div className="mb-3 text-4xl">🎥</div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">Video Tools</h3>
              <p className="text-gray-600">
                Download and convert videos from YouTube, TikTok, Instagram
              </p>
            </div>
            <div className="text-center">
              <div className="mb-3 text-4xl">🖼️</div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">Image Tools</h3>
              <p className="text-gray-600">
                Compress, resize, crop, and edit images online
              </p>
            </div>
            <div className="text-center">
              <div className="mb-3 text-4xl">📝</div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">Text Tools</h3>
              <p className="text-gray-600">
                Word counter, case converter, QR generator, and more
              </p>
            </div>
            <div className="text-center">
              <div className="mb-3 text-4xl">💻</div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">Developer Tools</h3>
              <p className="text-gray-600">
                JSON formatter, Base64 encoder, color picker
              </p>
            </div>
            <div className="text-center">
              <div className="mb-3 text-4xl">🔄</div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">Converters</h3>
              <p className="text-gray-600">
                Convert between different file formats instantly
              </p>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 p-8 shadow-lg mb-16">
          <h2 className="mb-8 text-3xl font-bold text-gray-900 text-center">
            Our Core Values
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">User-First</h3>
              <p className="text-gray-700">
                Every decision we make is based on what's best for our users
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-600">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">Privacy & Security</h3>
              <p className="text-gray-700">
                We respect your privacy and never store your files permanently
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-600">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">Always Free</h3>
              <p className="text-gray-700">
                Core tools will always be free, no hidden fees or subscriptions
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="rounded-2xl bg-white border-2 border-gray-200 p-8 shadow-lg mb-16">
          <h2 className="mb-8 text-3xl font-bold text-gray-900 text-center">
            By The Numbers
          </h2>
          <div className="grid gap-8 sm:grid-cols-3 text-center">
            <div>
              <div className="mb-2 text-4xl font-bold text-blue-600">39+</div>
              <div className="text-gray-700 font-medium">Free Tools</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold text-purple-600">100%</div>
              <div className="text-gray-700 font-medium">Free Forever</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold text-green-600">24/7</div>
              <div className="text-gray-700 font-medium">Always Available</div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="rounded-2xl bg-white border-2 border-gray-200 p-8 shadow-lg text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Built by ArthaCode Studio
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
            We're a small team of developers passionate about creating useful tools
            for everyone. Based in Indonesia, serving users worldwide.
          </p>
          <p className="text-gray-600">
            Have questions or suggestions?{" "}
            <a href="mailto:hello@arthacodestudio.com" className="text-blue-600 hover:underline font-semibold">
              Contact us
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

