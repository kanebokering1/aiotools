import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import WordToPDFClient from "./WordToPDFClient";

export const metadata: Metadata = generateToolMetadata("word-to-pdf");

export default function WordToPDFPage() {
  return <WordToPDFClient />;
}
