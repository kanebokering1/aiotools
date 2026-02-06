import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import AudioConverterClient from "./AudioConverterClient";

export const metadata: Metadata = generateToolMetadata("audio-converter");

// Force dynamic rendering to avoid SSR issues with FFmpeg
export const dynamic = 'force-dynamic';

export default function AudioConverterPage() {
  return <AudioConverterClient />;
}
