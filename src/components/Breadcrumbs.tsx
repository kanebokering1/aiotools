"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  toolName: string;
}

export default function Breadcrumbs({ items, toolName }: BreadcrumbsProps) {
  const baseUrl = "https://aiotools.arthacodestudio.com";
  
  // Generate schema.org JSON-LD
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        ...(item.href && { "item": `${baseUrl}${item.href}` })
      })),
      {
        "@type": "ListItem",
        "position": items.length + 2,
        "name": toolName
      }
    ]
  };

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Visual Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex items-center gap-2 text-sm text-gray-600"
      >
        <Link
          href="/"
          className="flex items-center gap-1 hover:text-blue-600 transition-colors"
        >
          <Home className="h-4 w-4" />
          <span>Home</span>
        </Link>

        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4 text-gray-400" />
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-blue-600 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}
          </div>
        ))}

        <ChevronRight className="h-4 w-4 text-gray-400" />
        <span className="font-medium text-gray-900">{toolName}</span>
      </nav>
    </>
  );
}

