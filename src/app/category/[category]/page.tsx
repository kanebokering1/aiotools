import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { categories, getToolsByCategory, ToolCategory } from "@/data/tools";
import { ArrowRight, Video, Image, FileText, Code2, PenTool, Globe, Search, RefreshCw, FileEdit, Maximize2 } from "lucide-react";
import Link from "next/link";
import AdBanner from "@/components/Ads/AdBanner";
import AdWrapper from "@/components/Ads/AdWrapper";
import { AdManager } from "@/components/Ads/AdManager";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export function generateStaticParams() {
  return categories.map((category) => ({
    category: category.id,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryData = categories.find((c) => c.id === category);
  
  if (!categoryData) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${categoryData.name} - AIO Tools`,
    description: categoryData.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryData = categories.find((c) => c.id === category as ToolCategory);
  
  if (!categoryData) {
    notFound();
  }

  const tools = getToolsByCategory(categoryData.id);

  const categoryIcons: Record<ToolCategory, any> = {
    video: Video,
    image: Image,
    pdf: FileText,
    text: PenTool,
    developer: Code2,
    converter: RefreshCw,
    document: FileEdit,
    photo: Maximize2,
  };

  const IconComponent = categoryIcons[categoryData.id] || Globe;

  return (
    <AdManager>
      <div className="min-h-screen bg-[#F8FAFC] font-sans">
        <Header />

        <main>
          {/* Hero Section - Clean & Modern */}
          <section className="relative pt-20 pb-16 bg-white border-b border-slate-200">
            <div className="mx-auto max-w-7xl px-4 text-center">
              <div className="mx-auto h-20 w-20 rounded-3xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6 shadow-sm">
                <IconComponent className="h-10 w-10" />
              </div>
              <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                {categoryData.name}
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-slate-600 leading-relaxed">
                {categoryData.description}
              </p>
            </div>
          </section>

          {/* Ad Space */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <AdWrapper>
              <AdBanner size="728x90" position="top" className="mx-auto" />
            </AdWrapper>
          </div>

          {/* Tools Grid - Consistent Outline Style */}
          <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">
                Available Tools
              </h2>
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold">
                {tools.length} Tools
              </span>
            </div>

            {tools.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {tools.map((tool) => {
                  const ToolIcon = tool.icon;
                  return (
                    <Link
                      key={tool.id}
                      href={tool.href}
                      className="group flex flex-col p-6 bg-white rounded-2xl border border-slate-200 transition-all duration-200 hover:border-blue-500 hover:ring-1 hover:ring-blue-500 hover:shadow-lg hover:shadow-blue-500/10"
                    >
                      <div className="flex items-start justify-between mb-6">
                        <div className="h-12 w-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                          <ToolIcon className="h-6 w-6" />
                        </div>
                        <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-blue-500">
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed group-hover:text-slate-600">
                        {tool.description}
                      </p>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 border-dashed">
                <div className="mx-auto h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-4">
                  <Search className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">
                  No Tools Found
                </h3>
                <p className="text-slate-500">
                  We're working on adding more tools to this category.
                </p>
              </div>
            )}
          </section>

          {/* Other Categories */}
          <section className="bg-white border-t border-slate-200 mt-20">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
              <h2 className="mb-8 text-2xl font-bold text-slate-900 text-center">
                Explore Other Categories
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {categories
                  .filter((c) => c.id !== categoryData.id)
                  .map((cat) => {
                    const CatIcon = categoryIcons[cat.id] || Globe;
                    return (
                      <Link
                        key={cat.id}
                        href={`/category/${cat.id}`}
                        className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all group"
                      >
                        <div className="h-12 w-12 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                          <CatIcon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 group-hover:text-blue-700">{cat.name}</h3>
                          <span className="text-xs text-slate-500 font-medium group-hover:text-blue-600">View Tools</span>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </AdManager>
  );
}
