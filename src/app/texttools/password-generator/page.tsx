import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import PasswordGeneratorClient from "./PasswordGeneratorClient";

export const metadata: Metadata = generateToolMetadata("password-generator");

export default function PasswordGeneratorPage() {
  return <PasswordGeneratorClient />;
}
