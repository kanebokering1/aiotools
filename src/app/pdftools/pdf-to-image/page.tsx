import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import PDFToImageClient from "./PDFToImageClient";

export const metadata: Metadata = generateToolMetadata("pdf-to-image");

export default function PDFToImagePage() {
  return <PDFToImageClient />;
}
