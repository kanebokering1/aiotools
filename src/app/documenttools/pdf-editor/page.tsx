import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import PDFEditorClient from "./PDFEditorClient";

export const metadata: Metadata = generateToolMetadata("pdf-editor");

export default function PDFEditorPage() {
  return <PDFEditorClient />;
}
