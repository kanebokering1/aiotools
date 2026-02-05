import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ImageCompressorClient from "./ImageCompressorClient";

export const metadata: Metadata = generateToolMetadata("image-compressor");

export default function ImageCompressorPage() {
  return <ImageCompressorClient />;
}

