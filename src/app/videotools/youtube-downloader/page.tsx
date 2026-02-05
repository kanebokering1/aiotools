import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import YouTubeDownloaderClient from "./YouTubeDownloaderClient";

export const metadata: Metadata = generateToolMetadata("youtube-downloader");

export default function YouTubeDownloaderPage() {
  return <YouTubeDownloaderClient />;
}
