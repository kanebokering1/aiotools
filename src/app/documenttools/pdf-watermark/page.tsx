import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import PDFWatermarkClient from "./PDFWatermarkClient";

export const metadata: Metadata = generateToolMetadata("pdf-watermark");

export default function PDFWatermarkPage() {
  return <PDFWatermarkClient />;
}
