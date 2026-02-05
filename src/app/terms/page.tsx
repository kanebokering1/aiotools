import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | AIO Tools",
  description: "Terms of Service for AIO Tools - Rules and guidelines for using our services.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-center">
          <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-4 shadow-lg">
            <FileText className="h-12 w-12 text-white" />
          </div>
        </div>

        <h1 className="mb-6 text-4xl font-bold text-gray-900 text-center">
          Terms of Service
        </h1>

        <div className="prose prose-lg max-w-none space-y-6 rounded-2xl bg-white border-2 border-gray-200 p-8 shadow-lg">
          <p className="text-gray-600">
            <strong>Effective Date:</strong> February 5, 2026
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using AIO Tools ("the Service"), you agree to be bound by
            these Terms of Service. If you do not agree, please do not use the Service.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            AIO Tools provides free online tools for PDF manipulation, image editing,
            video downloading, text processing, and more. All tools are provided "as is"
            without warranty.
          </p>

          <h2>3. User Responsibilities</h2>
          <p>You agree to:</p>
          <ul>
            <li>Use the Service only for lawful purposes</li>
            <li>Not upload malicious or copyrighted content</li>
            <li>Not attempt to hack, overload, or disrupt the Service</li>
            <li>Not use the Service to harm others</li>
            <li>Respect intellectual property rights</li>
          </ul>

          <h2>4. Prohibited Uses</h2>
          <p>You may NOT use the Service to:</p>
          <ul>
            <li>Process illegal, harmful, or copyrighted content</li>
            <li>Violate any laws or regulations</li>
            <li>Spam, phish, or distribute malware</li>
            <li>Scrape or automate requests excessively</li>
            <li>Resell or redistribute our tools</li>
          </ul>

          <h2>5. Content Ownership</h2>
          <p>
            <strong>Your Content:</strong> You retain all rights to files you upload.
            We do not claim ownership of your content.
          </p>
          <p>
            <strong>Our Content:</strong> The website design, code, and original content
            are owned by ArthaCode Studio. Unauthorized copying is prohibited.
          </p>

          <h2>6. File Processing & Deletion</h2>
          <p>
            Files you upload are processed temporarily and automatically deleted after
            1 hour. We do not permanently store your files.
          </p>

          <h2>7. Disclaimer of Warranties</h2>
          <p>
            The Service is provided "AS IS" and "AS AVAILABLE" without any warranties
            of any kind, either express or implied, including but not limited to:
          </p>
          <ul>
            <li>Accuracy of results</li>
            <li>Uninterrupted service</li>
            <li>Error-free operation</li>
            <li>Security of data</li>
          </ul>

          <h2>8. Limitation of Liability</h2>
          <p>
            AIO Tools and ArthaCode Studio shall not be liable for any damages arising
            from the use or inability to use the Service, including but not limited to:
          </p>
          <ul>
            <li>Data loss</li>
            <li>Business interruption</li>
            <li>Loss of profits</li>
            <li>Indirect or consequential damages</li>
          </ul>

          <h2>9. Copyright & DMCA</h2>
          <p>
            If you believe content on our site infringes your copyright, please contact
            us at privacy@arthacodestudio.com with:
          </p>
          <ul>
            <li>Description of copyrighted work</li>
            <li>URL of infringing content</li>
            <li>Your contact information</li>
            <li>Good faith statement</li>
          </ul>

          <h2>10. Advertising</h2>
          <p>
            We display third-party advertisements (Google AdSense) to support the free
            service. By using the Service, you agree to view these advertisements.
          </p>

          <h2>11. Modifications to Service</h2>
          <p>
            We reserve the right to modify, suspend, or discontinue any part of the
            Service at any time without notice.
          </p>

          <h2>12. Changes to Terms</h2>
          <p>
            We may update these Terms of Service from time to time. Continued use of
            the Service after changes constitutes acceptance of the new terms.
          </p>

          <h2>13. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws
            of Indonesia, without regard to its conflict of law provisions.
          </p>

          <h2>14. Contact Information</h2>
          <p>
            For questions about these Terms of Service, contact us at:
          </p>
          <p>
            <strong>Email:</strong> privacy@arthacodestudio.com<br />
            <strong>Website:</strong> https://aiotools.arthacodestudio.com
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

