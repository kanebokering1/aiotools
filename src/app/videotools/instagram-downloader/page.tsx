import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import InstagramDownloaderClient from "./InstagramDownloaderClient";

export const metadata: Metadata = generateToolMetadata("instagram-downloader");

export default function InstagramDownloaderPage() {
  return <InstagramDownloaderClient />;
}
