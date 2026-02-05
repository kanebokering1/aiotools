import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ImageCropClient from "./ImageCropClient";

export const metadata: Metadata = generateToolMetadata("image-crop");

export default function ImageCropPage() {
  return <ImageCropClient />;
}
