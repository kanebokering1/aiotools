import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import DocumentViewerClient from "./DocumentViewerClient";

export const metadata: Metadata = generateToolMetadata("document-viewer");

// Force dynamic rendering to avoid SSR issues with PDF.js
export const dynamic = 'force-dynamic';

export default function DocumentViewerPage() {
  return <DocumentViewerClient />;
}
