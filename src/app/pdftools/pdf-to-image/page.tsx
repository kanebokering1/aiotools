import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import PDFToImageClient from "./PDFToImageClient";

export const metadata: Metadata = generateToolMetadata("pdf-to-image");

// Force dynamic rendering to avoid SSR issues with PDF.js
export const dynamic = 'force-dynamic';

export default function PDFToImagePage() {
  return <PDFToImageClient />;
}
