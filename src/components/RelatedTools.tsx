import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

interface RelatedTool {
  id: string;
  name: string;
  href: string;
  description: string;
}

interface RelatedToolsProps {
  tools: RelatedTool[];
}

export default function RelatedTools({ tools }: RelatedToolsProps) {
  if (tools.length === 0) return null;

  return (
    <div className="mt-6 rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-100 p-8 shadow-sm">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center gap-2 mb-3">
          <Sparkles className="h-6 w-6 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900">
            Tools Terkait
          </h2>
          <Sparkles className="h-6 w-6 text-blue-600" />
        </div>
        <p className="text-base text-gray-600 max-w-2xl mx-auto">
          Coba juga tools lainnya yang mungkin Anda butuhkan untuk mempermudah pekerjaan
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={tool.href}
            className="group relative flex items-start gap-4 rounded-xl bg-white border-2 border-blue-200 p-6 transition-all hover:border-blue-400 hover:shadow-lg hover:-translate-y-1"
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex-1 relative z-10">
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                {tool.name}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                {tool.description}
              </p>
            </div>
            
            <div className="relative z-10 flex-shrink-0 mt-1">
              <div className="rounded-full bg-blue-100 p-2 group-hover:bg-blue-500 transition-all">
                <ArrowRight className="h-5 w-5 text-blue-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

