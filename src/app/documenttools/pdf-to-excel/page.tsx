import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import PDFToExcelClient from "./PDFToExcelClient";

export const metadata: Metadata = generateToolMetadata("pdf-to-excel");

// Force dynamic rendering to avoid SSR issues with PDF.js
export const dynamic = 'force-dynamic';

export default function PDFToExcelPage() {
  return <PDFToExcelClient />;
}
