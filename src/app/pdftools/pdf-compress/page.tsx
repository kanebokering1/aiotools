import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import PDFCompressClient from "./PDFCompressClient";

export const metadata: Metadata = generateToolMetadata("pdf-compress");

export default function PDFCompressPage() {
  return <PDFCompressClient />;
}
