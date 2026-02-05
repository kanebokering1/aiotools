import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import VideoToAudioClient from "./VideoToAudioClient";

export const metadata: Metadata = generateToolMetadata("video-to-audio");

export default function VideoToAudioPage() {
  return <VideoToAudioClient />;
}
