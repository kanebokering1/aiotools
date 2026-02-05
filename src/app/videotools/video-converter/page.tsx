import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import VideoConverterClient from "./VideoConverterClient";

export const metadata: Metadata = generateToolMetadata("video-converter");

export default function VideoConverterPage() {
  return <VideoConverterClient />;
}
