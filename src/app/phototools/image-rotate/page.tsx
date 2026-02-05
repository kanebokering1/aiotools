import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ImageRotateClient from "./ImageRotateClient";

export const metadata: Metadata = generateToolMetadata("image-rotate");

export default function ImageRotatePage() {
  return <ImageRotateClient />;
}
