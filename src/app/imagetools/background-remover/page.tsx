import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import BackgroundRemoverClient from "./BackgroundRemoverClient";

export const metadata: Metadata = generateToolMetadata("background-remover");

export default function BackgroundRemoverPage() {
  return <BackgroundRemoverClient />;
}
