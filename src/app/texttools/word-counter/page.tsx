import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import WordCounterClient from "./WordCounterClient";

export const metadata: Metadata = generateToolMetadata("word-counter");

export default function WordCounterPage() {
  return <WordCounterClient />;
}
