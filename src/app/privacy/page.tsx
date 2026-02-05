import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | AIO Tools",
  description: "Privacy Policy for AIO Tools - How we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-center">
          <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-4 shadow-lg">
            <Shield className="h-12 w-12 text-white" />
          </div>
        </div>

        <h1 className="mb-6 text-4xl font-bold text-gray-900 text-center">
          Privacy Policy
        </h1>

        <div className="prose prose-lg max-w-none space-y-6 rounded-2xl bg-white border-2 border-gray-200 p-8 shadow-lg">
          <p className="text-gray-600">
            <strong>Effective Date:</strong> February 5, 2026
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            When you use AIO Tools, we may collect the following information:
          </p>
          <ul>
            <li>Usage data (pages visited, tools used, time spent)</li>
            <li>Device information (browser type, IP address, device type)</li>
            <li>Cookies and similar tracking technologies</li>
            <li>Files you upload (temporarily, for processing only)</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use collected information to:</p>
          <ul>
            <li>Provide and improve our tools and services</li>
            <li>Analyze usage patterns and optimize user experience</li>
            <li>Display relevant advertisements (Google AdSense)</li>
            <li>Prevent fraud and ensure security</li>
          </ul>

          <h2>3. File Processing & Storage</h2>
          <p>
            <strong>Important:</strong> All files you upload for processing (PDFs, images, videos) are:
          </p>
          <ul>
            <li>Processed locally in your browser whenever possible</li>
            <li>Automatically deleted from our servers after 1 hour (if server processing is used)</li>
            <li>Never shared with third parties</li>
            <li>Not used for training or other purposes</li>
          </ul>

          <h2>4. Cookies & Tracking</h2>
          <p>We use cookies for:</p>
          <ul>
            <li><strong>Essential cookies:</strong> Required for tool functionality</li>
            <li><strong>Analytics cookies:</strong> Google Analytics to understand usage</li>
            <li><strong>Advertising cookies:</strong> Google AdSense for personalized ads</li>
          </ul>
          <p>You can disable cookies in your browser settings.</p>

          <h2>5. Third-Party Services</h2>
          <p>We use the following third-party services:</p>
          <ul>
            <li><strong>Google Analytics:</strong> Website analytics</li>
            <li><strong>Google AdSense:</strong> Advertising</li>
            <li><strong>Vercel:</strong> Hosting provider</li>
          </ul>
          <p>
            Each service has its own privacy policy. We recommend reviewing them.
          </p>

          <h2>6. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your data:
          </p>
          <ul>
            <li>SSL/HTTPS encryption for all connections</li>
            <li>Secure server infrastructure</li>
            <li>Regular security audits</li>
            <li>Limited data retention</li>
          </ul>

          <h2>7. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Request data deletion</li>
            <li>Opt-out of analytics tracking</li>
            <li>Disable personalized advertising</li>
          </ul>

          <h2>8. Children's Privacy</h2>
          <p>
            Our service is not directed to children under 13. We do not knowingly collect
            personal information from children.
          </p>

          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. Changes will be posted
            on this page with an updated effective date.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            If you have questions about this privacy policy, please contact us at:
          </p>
          <p>
            <strong>Email:</strong> privacy@arthacodestudio.com<br />
            <strong>Website:</strong> https://aiotools.arthacodestudio.com
          </p>

          <div className="mt-8 rounded-lg bg-blue-50 border-2 border-blue-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Google AdSense & Advertising
            </h3>
            <p className="text-gray-700">
              We use Google AdSense to display advertisements. Google may use cookies
              to serve ads based on your prior visits to this website or other websites.
              You can opt out of personalized advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google Ads Settings
              </a>
              .
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

