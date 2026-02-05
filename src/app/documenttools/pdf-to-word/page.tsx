import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import PDFToWordClient from "./PDFToWordClient";

export const metadata: Metadata = generateToolMetadata("pdf-to-word");

export default function PDFToWordPage() {
  return <PDFToWordClient />;
}
