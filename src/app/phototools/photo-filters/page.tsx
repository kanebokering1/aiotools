import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import PhotoFiltersClient from "./PhotoFiltersClient";

export const metadata: Metadata = generateToolMetadata("photo-filters");

export default function PhotoFiltersPage() {
  return <PhotoFiltersClient />;
}
