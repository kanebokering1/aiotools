import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import UnitConverterClient from "./UnitConverterClient";

export const metadata: Metadata = generateToolMetadata("unit-converter");

export default function UnitConverterPage() {
  return <UnitConverterClient />;
}
