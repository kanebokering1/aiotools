import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import BrightnessContrastClient from "./BrightnessContrastClient";

export const metadata: Metadata = generateToolMetadata("brightness-contrast");

export default function BrightnessContrastPage() {
  return <BrightnessContrastClient />;
}
