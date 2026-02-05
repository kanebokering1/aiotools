import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import Base64EncoderClient from "./Base64EncoderClient";

export const metadata: Metadata = generateToolMetadata("base64-encoder");

export default function Base64EncoderPage() {
  return <Base64EncoderClient />;
}
