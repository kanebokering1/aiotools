import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import VideoToAudioClient from "./VideoToAudioClient";

export const metadata: Metadata = generateToolMetadata("video-to-audio");

// Force dynamic rendering to avoid SSR issues with FFmpeg
export const dynamic = 'force-dynamic';

export default function VideoToAudioPage() {
  return <VideoToAudioClient />;
}
