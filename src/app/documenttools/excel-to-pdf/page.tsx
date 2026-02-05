import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ExcelToPDFClient from "./ExcelToPDFClient";

export const metadata: Metadata = generateToolMetadata("excel-to-pdf");

export default function ExcelToPDFPage() {
  return <ExcelToPDFClient />;
}
