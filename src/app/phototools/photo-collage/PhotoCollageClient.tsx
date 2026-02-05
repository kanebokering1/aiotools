"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOContent from "@/components/SEOContent";
import RelatedTools from "@/components/RelatedTools";
import { Grid3x3, Upload, AlertCircle } from "lucide-react";
import { getToolSEOContent } from "@/lib/seo-content";
import { getRelatedTools } from "@/lib/seo";

export default function PhotoCollageClient() {
  const seoContent = getToolSEOContent("photo-collage");
  const relatedTools = getRelatedTools("photo-collage");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-50 text-pink-600">
            <Grid3x3 className="h-8 w-8" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-slate-900">Photo Collage Maker</h1>
          <p className="text-slate-600">Create beautiful photo collages and grids</p>
        </div>

        <div className="mb-6 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-1">Note:</p>
            <p>Photo collage creation requires canvas manipulation and layout algorithms. This is a UI demo. For full functionality, integrate with libraries like fabric.js or konva.js.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Upload Photos</h2>
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 transition-colors hover:border-pink-500 hover:bg-pink-50/50">
              <Upload className="mb-4 h-12 w-12 text-slate-400" />
              <label className="cursor-pointer rounded-lg bg-pink-600 hover:bg-pink-700 border-2 border-pink-700 hover:border-pink-800 px-6 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md">
                <input type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" />
                Choose Multiple Images
              </label>
              {selectedFiles.length > 0 && (
                <p className="mt-4 text-sm text-slate-600">
                  Selected: <span className="font-medium">{selectedFiles.length} images</span>
                </p>
              )}
            </div>
          </div>

          {selectedFiles.length > 0 && (
            <>
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">Layout Options</h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {["Grid 2x2", "Grid 3x3", "Vertical", "Horizontal"].map((layout) => (
                    <button
                      key={layout}
                      disabled
                      className="rounded-lg border-2 border-slate-300 bg-slate-200 p-3 text-sm font-semibold text-slate-400 cursor-not-allowed shadow-sm"
                    >
                      {layout}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">Collage Preview</h2>
                <div className="aspect-square rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center">
                  <p className="text-slate-500">Collage preview (Demo Mode)</p>
                </div>
                <p className="mt-4 text-center text-sm text-slate-500">
                  Integration with canvas library required for collage creation
                </p>
              </div>
            </>
          )}
        </div>

        <SEOContent whatIsIt={seoContent.whatIsIt} howToUse={seoContent.howToUse} features={seoContent.features} faq={seoContent.faq} />
        <RelatedTools tools={relatedTools} />
      </main>

      <Footer />
    </div>
  );
}

