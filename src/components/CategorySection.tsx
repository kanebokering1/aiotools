import { ToolCategory, categories, getToolsByCategory } from "@/data/tools";
import ToolCard from "./ToolCard";
import Link from "next/link";

interface CategorySectionProps {
  category: ToolCategory;
  showAll?: boolean;
  limit?: number;
}

export default function CategorySection({
  category,
  showAll = false,
  limit,
}: CategorySectionProps) {
  const categoryData = categories.find((c) => c.id === category);
  const tools = getToolsByCategory(category);
  const displayTools = limit ? tools.slice(0, limit) : tools;

  if (!categoryData) return null;

  const categoryColors: Record<ToolCategory, string> = {
    video: "from-green-500 to-emerald-600",
    image: "from-blue-500 to-cyan-600",
    pdf: "from-red-500 to-rose-600",
    text: "from-purple-500 to-pink-600",
    developer: "from-amber-500 to-orange-600",
    converter: "from-cyan-500 to-blue-600",
    document: "from-indigo-500 to-purple-600",
    photo: "from-rose-500 to-pink-600",
  };

  return (
    <section className="mb-12">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="mb-2 text-2xl font-bold text-gray-900 text-white">
            {categoryData.name}
          </h2>
          <p className="text-gray-600 text-gray-400">
            {categoryData.description}
          </p>
        </div>
        {!showAll && tools.length > (limit || 4) && (
          <Link
            href={`/category/${category}`}
            className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 text-blue-400 hover:text-blue-300"
          >
            View All →
          </Link>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {displayTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
}

