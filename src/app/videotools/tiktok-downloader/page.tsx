import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import TikTokDownloaderClient from "./TikTokDownloaderClient";

export const metadata: Metadata = generateToolMetadata("tiktok-downloader");

export default function TikTokDownloaderPage() {
  return <TikTokDownloaderClient />;
}
