import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ImageConverterClient from "./ImageConverterClient";

export const metadata: Metadata = generateToolMetadata("image-converter");

export default function ImageConverterPage() {
  return <ImageConverterClient />;
}
