import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import JSONFormatterClient from "./JSONFormatterClient";

export const metadata: Metadata = generateToolMetadata("json-formatter");

export default function JSONFormatterPage() {
  return <JSONFormatterClient />;
}
