import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ImageResizeClient from "./ImageResizeClient";

export const metadata: Metadata = generateToolMetadata("image-resize");

export default function ImageResizePage() {
  return <ImageResizeClient />;
}
