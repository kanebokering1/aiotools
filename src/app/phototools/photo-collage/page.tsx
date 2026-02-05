import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import PhotoCollageClient from "./PhotoCollageClient";

export const metadata: Metadata = generateToolMetadata("photo-collage");

export default function PhotoCollagePage() {
  return <PhotoCollageClient />;
}
