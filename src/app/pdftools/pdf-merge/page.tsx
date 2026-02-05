import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import PDFMergeClient from "./PDFMergeClient";

export const metadata: Metadata = generateToolMetadata("pdf-merge");

export default function PDFMergePage() {
  return <PDFMergeClient />;
}
