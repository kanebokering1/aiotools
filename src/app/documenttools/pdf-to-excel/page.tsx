import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import PDFToExcelClient from "./PDFToExcelClient";

export const metadata: Metadata = generateToolMetadata("pdf-to-excel");

export default function PDFToExcelPage() {
  return <PDFToExcelClient />;
}
