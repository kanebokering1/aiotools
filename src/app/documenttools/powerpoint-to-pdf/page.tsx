import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import PowerPointToPDFClient from "./PowerPointToPDFClient";

export const metadata: Metadata = generateToolMetadata("powerpoint-to-pdf");

export default function PowerPointToPDFPage() {
  return <PowerPointToPDFClient />;
}
