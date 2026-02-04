import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { categories, tools } from "@/data/tools";
import AdBanner from "@/components/Ads/AdBanner";
import AdWrapper from "@/components/Ads/AdWrapper";
import { AdManager } from "@/components/Ads/AdManager";
import { 
  ArrowRight, Zap, Shield, Globe, 
  Video, Image, FileText, Code2, PenTool, 
  Sparkles, CheckCircle
} from "lucide-react";
import Link from "next/link";
import CategoryTabs from "@/components/CategoryTabs";

export default function Home() {
  // Get featured tools (first 4) for the popular section
  const featuredTools = tools.filter(t => t.featured).slice(0, 4);

  return (
    <AdManager>
      <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-blue-100 selection:text-blue-900">
        <Header />

        <main>
          {/* Hero Section - Split Layout */}
          <section className="relative pt-12 pb-16 lg:pt-24 lg:pb-24 overflow-hidden bg-white border-b border-slate-200">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-blue-50/50 to-transparent"></div>
            
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                
                {/* Left Content */}
                <div className="max-w-2xl text-left">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold mb-8 shadow-sm">
                    <Sparkles className="h-4 w-4 text-blue-600" />
                    <span>All-in-One Digital Tools Suite</span>
                  </div>
                  
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
                    Manage Your Files <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                      Faster & Easier.
                    </span>
                  </h1>
                  
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
                    We provide free, secure, and professional tools for your daily tasks. 
                    Convert videos, edit PDFs, process images - all in one place.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 mb-10">
                    <Link
                      href="#tools"
                      className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/30 hover:shadow-blue-600/40 hover:-translate-y-1"
                    >
                      Start Using Tools
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    <Link
                      href="#categories"
                      className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-slate-700 transition-all duration-200 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 shadow-sm"
                    >
                      Browse Categories
                    </Link>
                  </div>

                  <div className="flex items-center gap-6 text-sm font-medium text-slate-500">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Free Forever</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>No Registration</span>
                    </div>
                  </div>
                </div>

                {/* Right Visual - Assistant/Tools Visual */}
                <div className="relative lg:pl-10 flex justify-center lg:justify-end">
                  {/* Abstract Representation of "Assistant" Tools */}
                  <div className="relative w-full max-w-md aspect-square">
                    {/* Main Circle/Bg */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-indigo-50/50 rounded-full blur-3xl animate-pulse"></div>
                    
                    {/* Center Piece */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center border border-slate-100 z-10">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 mb-4">
                        <Globe className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">All-in-One Tools</h3>
                      <p className="text-slate-500 text-sm mt-2">Tools Digital Platform for Everything</p>
                    </div>

                    {/* Floating Elements (Orbiting Tools) */}
                    <div className="absolute top-0 right-10 p-4 bg-white rounded-2xl shadow-lg border border-slate-100 animate-bounce" style={{ animationDuration: '3s' }}>
                      <Video className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="absolute bottom-10 left-0 p-4 bg-white rounded-2xl shadow-lg border border-slate-100 animate-bounce" style={{ animationDuration: '4s' }}>
                      <Image className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="absolute top-10 left-10 p-4 bg-white rounded-2xl shadow-lg border border-slate-100 animate-bounce" style={{ animationDuration: '5s' }}>
                      <FileText className="h-6 w-6 text-red-500" />
                    </div>
                    <div className="absolute bottom-0 right-20 p-4 bg-white rounded-2xl shadow-lg border border-slate-100 animate-bounce" style={{ animationDuration: '3.5s' }}>
                      <Code2 className="h-6 w-6 text-purple-500" />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Ad Space */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <AdWrapper>
              <AdBanner size="728x90" position="top" className="mx-auto" />
            </AdWrapper>
          </div>

          {/* Popular Tools */}
          <section id="tools" className="pb-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900">Most Popular Tools</h2>
                <p className="mt-3 text-slate-600">Quick access to our most used utilities</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.id}
                      href={tool.href}
                      className="group flex flex-col items-center p-8 bg-white rounded-2xl border border-slate-200 transition-all duration-200 hover:border-blue-500 hover:ring-1 hover:ring-blue-500 hover:shadow-lg hover:shadow-blue-500/10"
                    >
                      <div className="h-16 w-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 transition-transform duration-200 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white">
                        <Icon className="h-8 w-8" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-slate-500 text-center line-clamp-2">
                        {tool.description}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* New Category Box Section */}
          <section id="categories" className="py-20 bg-white border-t border-slate-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900">Explore All Tools</h2>
                <p className="mt-3 text-slate-600">Select a category to filter the tools you need</p>
              </div>

              {/* The New Tabbed Interface Box */}
              <CategoryTabs categories={categories} />
              
            </div>
          </section>

          {/* Features */}
          <section className="py-20 bg-slate-50 border-t border-slate-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Zap,
                    title: "Lightning Fast",
                    desc: "Instant processing directly in your browser. No server uploads, no waiting time."
                  },
                  {
                    icon: Shield,
                    title: "100% Secure",
                    desc: "Your files never leave your device. All magic happens locally on your computer."
                  },
                  {
                    icon: Globe,
                    title: "Free Forever",
                    desc: "No hidden costs, no premium plans, no registration required. Just free tools."
                  }
                ].map((feature, i) => (
                  <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 transition-all duration-200 hover:border-blue-500 hover:ring-1 hover:ring-blue-500 hover:shadow-lg hover:shadow-blue-500/10 text-center group">
                    <div className="mx-auto h-14 w-14 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-200">
                      <feature.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed group-hover:text-slate-700">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Bottom Ad */}
          <div className="py-12 bg-white border-t border-slate-200">
            <AdWrapper>
              <AdBanner size="728x90" position="bottom" className="mx-auto" />
            </AdWrapper>
          </div>
        </main>

        <Footer />
      </div>
    </AdManager>
  );
}
