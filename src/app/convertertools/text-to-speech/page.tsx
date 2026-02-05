import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import TextToSpeechClient from "./TextToSpeechClient";

export const metadata: Metadata = generateToolMetadata("text-to-speech");

export default function TextToSpeechPage() {
  return <TextToSpeechClient />;
}
