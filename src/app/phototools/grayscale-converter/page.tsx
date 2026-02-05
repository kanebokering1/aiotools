import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import GrayscaleConverterClient from "./GrayscaleConverterClient";

export const metadata: Metadata = generateToolMetadata("grayscale-converter");

export default function GrayscaleConverterPage() {
  return <GrayscaleConverterClient />;
}
