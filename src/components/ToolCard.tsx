import Link from "next/link";
import { Tool } from "@/data/tools";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const IconComponent = tool.icon;

  return (
    <Link
      href={tool.href}
      className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-lg bg-gray-800"
    >
      {/* Icon */}
      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${tool.color} text-white transition-transform group-hover:scale-110`}
      >
        <IconComponent className="h-6 w-6" />
      </div>

      {/* Content */}
      <h3 className="mb-2 text-xl font-semibold text-gray-900 text-white">
        {tool.name}
      </h3>
      <p className="text-sm text-gray-600 text-gray-400">
        {tool.description}
      </p>

      {/* Featured Badge */}
      {tool.featured && (
        <span className="absolute top-4 right-4 rounded-full bg-yellow-400 px-2 py-1 text-xs font-semibold text-gray-900">
          Popular
        </span>
      )}

      {/* Hover Effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-50 to-white opacity-0 transition-opacity group-hover:opacity-100 from-gray-700 to-gray-800" />
    </Link>
  );
}

