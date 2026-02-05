import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import PDFSplitClient from "./PDFSplitClient";

export const metadata: Metadata = generateToolMetadata("pdf-split");

export default function PDFSplitPage() {
  return <PDFSplitClient />;
}
