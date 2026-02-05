import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import AudioConverterClient from "./AudioConverterClient";

export const metadata: Metadata = generateToolMetadata("audio-converter");

export default function AudioConverterPage() {
  return <AudioConverterClient />;
}
