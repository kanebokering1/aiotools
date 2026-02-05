import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import ColorPickerClient from "./ColorPickerClient";

export const metadata: Metadata = generateToolMetadata("color-picker");

export default function ColorPickerPage() {
  return <ColorPickerClient />;
}
