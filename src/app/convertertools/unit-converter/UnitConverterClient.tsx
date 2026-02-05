"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOContent from "@/components/SEOContent";
import RelatedTools from "@/components/RelatedTools";
import { Calculator, ArrowRight } from "lucide-react";
import { getToolSEOContent } from "@/lib/seo-content";
import { getRelatedTools } from "@/lib/seo";

type UnitCategory = "length" | "weight" | "temperature" | "time";

const units = {
  length: ["Meter", "Kilometer", "Centimeter", "Millimeter", "Mile", "Yard", "Foot", "Inch"],
  weight: ["Kilogram", "Gram", "Milligram", "Pound", "Ounce", "Ton"],
  temperature: ["Celsius", "Fahrenheit", "Kelvin"],
  time: ["Second", "Minute", "Hour", "Day", "Week", "Month", "Year"],
};

const conversionFactors: any = {
  length: {
    Meter: 1,
    Kilometer: 0.001,
    Centimeter: 100,
    Millimeter: 1000,
    Mile: 0.000621371,
    Yard: 1.09361,
    Foot: 3.28084,
    Inch: 39.3701,
  },
  weight: {
    Kilogram: 1,
    Gram: 1000,
    Milligram: 1000000,
    Pound: 2.20462,
    Ounce: 35.274,
    Ton: 0.001,
  },
  time: {
    Second: 1,
    Minute: 1 / 60,
    Hour: 1 / 3600,
    Day: 1 / 86400,
    Week: 1 / 604800,
    Month: 1 / 2592000,
    Year: 1 / 31536000,
  },
};

export default function UnitConverterClient() {
  const seoContent = getToolSEOContent("unit-converter");
  const relatedTools = getRelatedTools("unit-converter");
  const [category, setCategory] = useState<UnitCategory>("length");
  const [fromUnit, setFromUnit] = useState<string>("Meter");
  const [toUnit, setToUnit] = useState<string>("Kilometer");
  const [inputValue, setInputValue] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const handleConvert = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      setResult("Invalid input");
      return;
    }

    if (category === "temperature") {
      // Temperature conversion (special case)
      let celsius = 0;
      if (fromUnit === "Celsius") celsius = value;
      else if (fromUnit === "Fahrenheit") celsius = (value - 32) * (5 / 9);
      else if (fromUnit === "Kelvin") celsius = value - 273.15;

      let output = 0;
      if (toUnit === "Celsius") output = celsius;
      else if (toUnit === "Fahrenheit") output = celsius * (9 / 5) + 32;
      else if (toUnit === "Kelvin") output = celsius + 273.15;

      setResult(output.toFixed(4));
    } else {
      // Other units
      const baseValue = value / conversionFactors[category][fromUnit];
      const converted = baseValue * conversionFactors[category][toUnit];
      setResult(converted.toFixed(4));
    }
  };

  const handleCategoryChange = (newCategory: UnitCategory) => {
    setCategory(newCategory);
    setFromUnit(units[newCategory][0]);
    setToUnit(units[newCategory][1]);
    setResult("");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
            <Calculator className="h-8 w-8" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-slate-900">Unit Converter</h1>
          <p className="text-slate-600">Convert between different units of measurement</p>
        </div>

        <div className="space-y-6">
          {/* Category Selection */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Select Category</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {(["length", "weight", "temperature", "time"] as UnitCategory[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                    className={`rounded-lg border-2 p-3 text-sm font-semibold capitalize transition-all ${
                      category === cat
                        ? "border-cyan-500 bg-cyan-50 text-cyan-700 ring-2 ring-cyan-500 shadow-sm"
                        : "border-slate-300 bg-white text-slate-700 hover:border-cyan-500 hover:bg-cyan-50/30 shadow-sm"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Conversion Section */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Convert</h2>
            
            <div className="grid gap-4 md:grid-cols-3 md:items-end">
              {/* From */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">From</label>
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter value"
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                >
                  {units[category].map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <ArrowRight className="h-6 w-6 text-slate-400" />
              </div>

              {/* To */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">To</label>
                <input
                  type="text"
                  value={result}
                  readOnly
                  placeholder="Result"
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 font-semibold text-cyan-700"
                />
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                >
                  {units[category].map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleConvert}
              className="mt-6 w-full rounded-lg bg-cyan-600 hover:bg-cyan-700 border-2 border-cyan-700 hover:border-cyan-800 px-6 py-3 font-semibold text-white transition-all shadow-sm hover:shadow-md"
            >
              Convert
            </button>
          </div>
        </div>

        <SEOContent whatIsIt={seoContent.whatIsIt} howToUse={seoContent.howToUse} features={seoContent.features} faq={seoContent.faq} />
        <RelatedTools tools={relatedTools} />
      </main>

      <Footer />
    </div>
  );
}

