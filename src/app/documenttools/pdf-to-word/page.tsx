import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import PDFToWordClient from "./PDFToWordClient";

export const metadata: Metadata = generateToolMetadata("pdf-to-word");

// Force dynamic rendering to avoid SSR issues with PDF.js
export const dynamic = 'force-dynamic';

export default function PDFToWordPage() {
  return <PDFToWordClient />;
}
