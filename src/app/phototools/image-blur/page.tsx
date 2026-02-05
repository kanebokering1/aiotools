import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ImageBlurClient from "./ImageBlurClient";

export const metadata: Metadata = generateToolMetadata("image-blur");

export default function ImageBlurPage() {
  return <ImageBlurClient />;
}
