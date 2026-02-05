import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import QRCodeGeneratorClient from "./QRCodeGeneratorClient";

export const metadata: Metadata = generateToolMetadata("qr-code-generator");

export default function QRCodeGeneratorPage() {
  return <QRCodeGeneratorClient />;
}
