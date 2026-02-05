"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface SEOContentProps {
  whatIsIt: {
    title: string;
    content: string;
  };
  howToUse: {
    title: string;
    steps: string[];
  };
  features: {
    title: string;
    items: string[];
  };
  faq: {
    title: string;
    questions: Array<{ q: string; a: string }>;
  };
}

export default function SEOContent({ whatIsIt, howToUse, features, faq }: SEOContentProps) {
  return (
    <div className="mt-16 space-y-6">
      {/* What Is It Section */}
      <section className="rounded-2xl bg-white border-2 border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-100">
          {whatIsIt.title}
        </h2>
        <p className="text-base text-gray-700 leading-[1.8]">
          {whatIsIt.content}
        </p>
      </section>

      {/* How to Use Section */}
      <section className="rounded-2xl bg-white border-2 border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-100">
          {howToUse.title}
        </h2>
        <ol className="space-y-4">
          {howToUse.steps.map((step, index) => (
            <li key={index} className="flex items-start gap-4 group">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-base font-bold text-white shadow-sm group-hover:shadow-md transition-all">
                {index + 1}
              </span>
              <span className="text-base text-gray-700 pt-1 leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Features Section */}
      <section className="rounded-2xl bg-blue-50 border-2 border-blue-100 p-8 shadow-sm hover:shadow-md transition-shadow">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-200">
          {features.title}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {features.items.map((item, index) => (
            <div key={index} className="flex items-start gap-3 group">
              <div className="flex-shrink-0 mt-0.5">
                <svg
                  className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-base text-gray-700 leading-relaxed font-medium">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="rounded-2xl bg-white border-2 border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-100">
          {faq.title}
        </h2>
        <div className="space-y-3">
          {faq.questions.map((item, index) => (
            <FAQItem key={index} question={item.q} answer={item.a} />
          ))}
        </div>
      </section>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left gap-4 p-5 group hover:bg-blue-50 transition-colors"
      >
        <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
          {question}
        </h3>
        <div className={`flex-shrink-0 rounded-full p-1 bg-blue-100 group-hover:bg-blue-200 transition-all ${isOpen ? 'bg-blue-500' : ''}`}>
          <ChevronDown
            className={`h-5 w-5 ${isOpen ? 'text-white' : 'text-blue-600'} flex-shrink-0 transition-all duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-5 pb-5 pt-2">
          <p className="text-base text-gray-700 leading-[1.8] bg-gray-50 rounded-lg p-4">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

