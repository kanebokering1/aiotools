import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import DocumentViewerClient from "./DocumentViewerClient";

export const metadata: Metadata = generateToolMetadata("document-viewer");

export default function DocumentViewerPage() {
  return <DocumentViewerClient />;
}
