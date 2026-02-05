import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import HTMLEncoderClient from "./HTMLEncoderClient";

export const metadata: Metadata = generateToolMetadata("html-encoder");

export default function HTMLEncoderPage() {
  return <HTMLEncoderClient />;
}
