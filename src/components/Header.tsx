"use client";

import Link from "next/link";
import { ChevronDown, LayoutGrid, Menu, X } from "lucide-react";
import { useState } from "react";
import { categories } from "@/data/tools";
import { 
  Video, Image, FileText, PenTool, Code2, 
  RefreshCw, FileEdit, Maximize2 
} from "lucide-react";

export default function Header() {
  const [isAllToolsOpen, setIsAllToolsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categoryIcons: any = {
    video: Video,
    image: Image,
    pdf: FileText,
    text: PenTool,
    developer: Code2,
    converter: RefreshCw,
    document: FileEdit,
    photo: Maximize2,
  };

  return (
    <header className="sticky top-0 z-[60] border-b border-slate-200 bg-white/95 backdrop-blur-sm shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-auto items-center justify-center">
            <img 
              src="/aio.png" 
              alt="AIO Tools Logo" 
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </div>
          <span className="text-xl font-extrabold text-slate-900 tracking-tight">
            All-in-One Tools
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-2">
          <Link
            href="/"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-50 hover:text-blue-600"
          >
            Home
          </Link>
          
          <Link
            href="/blog"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-50 hover:text-blue-600"
          >
            Blog
          </Link>
          
          {/* All Tools Mega Menu */}
          <div
            className="relative"
            onMouseEnter={() => setIsAllToolsOpen(true)}
            onMouseLeave={() => setIsAllToolsOpen(false)}
          >
            <button
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                isAllToolsOpen 
                  ? "bg-blue-50 text-blue-600" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
              All Tools
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                isAllToolsOpen ? "rotate-180" : ""
              }`} />
            </button>
            
            {/* Mega Menu Dropdown */}
            {isAllToolsOpen && (
              <div className="absolute right-0 top-full pt-2 w-[720px] animate-in fade-in slide-in-from-top-2 duration-200 z-[100]">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-300/50 relative">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">Browse All Categories</h3>
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                      {categories.length} Categories
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-3">
                    {categories.map((category) => {
                      const IconComponent = categoryIcons[category.id];
                      return (
                        <Link
                          key={category.id}
                          href={`/category/${category.id}`}
                          className="group flex flex-col items-center gap-3 rounded-xl p-4 border border-slate-100 bg-slate-50/30 transition-all duration-200 hover:bg-white hover:border-blue-500 hover:ring-1 hover:ring-blue-500 hover:shadow-md hover:shadow-blue-500/10"
                        >
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-slate-200 text-blue-600 transition-all duration-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 group-hover:scale-110">
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-bold text-slate-700 group-hover:text-blue-700 transition-colors mb-0.5">
                              {category.name}
                            </p>
                            <p className="text-xs text-slate-500 line-clamp-2 leading-tight">
                              {category.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  {/* View All Link */}
                  <div className="mt-4 pt-4 border-t border-slate-200 text-center">
                    <Link
                      href="/"
                      className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center gap-1"
                    >
                      <LayoutGrid className="h-4 w-4" />
                      View All 37 Tools
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white">
          <div className="space-y-1 px-4 py-4 max-h-[calc(100vh-80px)] overflow-y-auto">
            <Link
              href="/"
              className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            <div className="py-2">
              <div className="font-bold text-slate-900 px-3 mb-3 text-sm uppercase tracking-wider">All Categories</div>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => {
                  const IconComponent = categoryIcons[category.id];
                  return (
                    <Link
                      key={category.id}
                      href={`/category/${category.id}`}
                      className="flex flex-col items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 hover:border-blue-500 hover:bg-blue-50 transition-all"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-blue-600">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-semibold text-slate-700 text-center">{category.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
