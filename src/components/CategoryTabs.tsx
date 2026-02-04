"use client";

import { useState } from "react";
import { tools, Category } from "@/data/tools";
import { ArrowRight, Search, Video, Image, FileText, Code2, PenTool, Globe, LayoutGrid, RefreshCw, FileEdit, Maximize2 } from "lucide-react";
import Link from "next/link";

interface CategoryTabsProps {
  categories: Category[];
}

export default function CategoryTabs({ categories }: CategoryTabsProps) {
  const [activeTab, setActiveTab] = useState("all");

  const categoryIcons: Record<string, any> = {
    video: Video,
    image: Image,
    pdf: FileText,
    text: PenTool,
    developer: Code2,
    converter: RefreshCw,
    document: FileEdit,
    photo: Maximize2,
  };

  // Filter tools based on active tab
  const filteredTools = activeTab === "all" 
    ? tools 
    : tools.filter(tool => tool.category === activeTab);

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Box Header - Filters/Tabs */}
      <div className="border-b border-slate-200 bg-slate-50/50 p-2 sm:p-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeTab === "all"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent hover:border-slate-200"
            }`}
          >
            <LayoutGrid className="h-4 w-4" />
            All Tools
          </button>

          {categories.map((category) => {
            const Icon = categoryIcons[category.id] || Globe;
            return (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeTab === category.id
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent hover:border-slate-200"
                }`}
              >
                <Icon className="h-4 w-4" />
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Box Body - Tools Grid */}
      <div className="p-6 sm:p-8 bg-white min-h-[400px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.id}
                href={tool.href}
                className="group flex flex-col p-5 bg-white rounded-xl border border-slate-200 transition-all duration-200 hover:border-blue-500 hover:ring-1 hover:ring-blue-500 hover:shadow-lg hover:shadow-blue-500/10"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="h-6 w-6 rounded-full bg-slate-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-blue-500">
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed group-hover:text-slate-600">
                  {tool.description}
                </p>
              </Link>
            );
          })}
          
          {filteredTools.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-500">
              <Search className="h-12 w-12 mx-auto mb-4 text-slate-300" />
              <p>No tools found in this category yet.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Box Footer - Info */}
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
        <span>Showing {filteredTools.length} tools</span>
        <span className="flex items-center gap-1">
          <Globe className="h-3 w-3" />
          Free & Online
        </span>
      </div>
    </div>
  );
}

