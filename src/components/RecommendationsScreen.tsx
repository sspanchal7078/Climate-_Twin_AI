/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Sparkles, 
  Droplets, 
  Flame, 
  Bug, 
  Calendar, 
  AlertTriangle, 
  Check, 
  X, 
  CheckCircle,
  TrendingUp,
  SlidersHorizontal,
  Info,
  ChevronRight,
  ShieldAlert
} from "lucide-react";
import { initialRecommendations } from "../data";
import { AIRecommendation } from "../types";

export default function RecommendationsScreen() {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>(initialRecommendations);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedPriority, setSelectedPriority] = useState<string>("All");

  // Interaction: mark recommendation as applied
  const handleApply = (id: string) => {
    setRecommendations(prev =>
      prev.map(rec => rec.id === id ? { ...rec, status: "applied" } : rec)
    );
  };

  // Interaction: ignore a recommendation
  const handleIgnore = (id: string) => {
    setRecommendations(prev =>
      prev.map(rec => rec.id === id ? { ...rec, status: "ignored" } : rec)
    );
  };

  // Filter recommendations based on state
  const filteredRecs = recommendations.filter(rec => {
    const matchesCategory = selectedCategory === "All" || rec.category === selectedCategory;
    const matchesPriority = selectedPriority === "All" || rec.priority === selectedPriority;
    return matchesCategory && matchesPriority;
  });

  // Calculate some analytics based on live recommendation status
  const pendingCount = recommendations.filter(r => r.status === "pending").length;
  const appliedCount = recommendations.filter(r => r.status === "applied").length;
  const avgImpactScore = Math.round(
    recommendations.reduce((sum, r) => sum + r.impactScore, 0) / recommendations.length
  );

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100 pb-10 text-left">
      
      {/* Header section */}
      <div className="bg-white/40 dark:bg-slate-900/40 p-6 rounded-3xl border border-white/60 dark:border-white/10 shadow-lg backdrop-blur-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-100 dark:border-emerald-900/30 uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>AI Agronomic Engine v2.4</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-slate-900 dark:text-white">
            Climate Twin AI Recommendations
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Automated recommendations updated every 15 minutes based on satellite sweeps, soil chemical changes, and weather convergence.
          </p>
        </div>

        {/* Dynamic summary widgets */}
        <div className="flex gap-4 font-mono text-xs">
          <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-2.5 rounded-xl">
            <span className="block text-slate-500 dark:text-slate-400 text-[9px] uppercase font-bold mb-0.5">Avg Impact</span>
            <span className="font-bold text-base text-emerald-700 dark:text-emerald-400">{avgImpactScore}/100</span>
          </div>
          <div className="bg-sky-500/10 border border-sky-500/20 px-3 py-2.5 rounded-xl">
            <span className="block text-slate-500 dark:text-slate-400 text-[9px] uppercase font-bold mb-0.5">Pending Actions</span>
            <span className="font-bold text-base text-sky-700 dark:text-sky-400">{pendingCount} Active</span>
          </div>
          <div className="bg-slate-500/10 border border-slate-500/20 px-3 py-2.5 rounded-xl">
            <span className="block text-slate-500 dark:text-slate-400 text-[9px] uppercase font-bold mb-0.5">Applied Suggestions</span>
            <span className="font-bold text-base text-slate-700 dark:text-slate-300">{appliedCount} Applied</span>
          </div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="p-4 rounded-3xl glass-panel shadow-md flex flex-col xl:flex-row gap-4 justify-between items-center">
        <div className="flex flex-wrap items-center gap-2 w-full xl:w-auto">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 dark:text-slate-500 mr-1" />
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-2 uppercase tracking-wider">Filter Category:</span>
          {["All", "Watering", "Fertilizer", "Pest Control", "Harvesting", "Weather Prep"].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs rounded-xl border transition-all cursor-pointer font-bold ${
                selectedCategory === cat 
                  ? "bg-slate-800 dark:bg-slate-100 border-slate-800 dark:border-slate-100 text-white dark:text-slate-900 shadow-xs" 
                  : "bg-white/40 dark:bg-slate-800/40 border-white/60 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white shadow-xs"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 w-full xl:w-auto justify-end">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Priority:</span>
          {["All", "High", "Medium", "Low"].map(pri => (
            <button
              key={pri}
              onClick={() => setSelectedPriority(pri)}
              className={`px-3 py-1.5 text-xs rounded-xl border transition-all cursor-pointer font-bold ${
                selectedPriority === pri 
                  ? "bg-emerald-600 border-emerald-600 text-white font-bold shadow-xs" 
                  : "bg-white/40 dark:bg-slate-800/40 border-white/60 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white shadow-xs"
              }`}
            >
              {pri}
            </button>
          ))}
        </div>
      </div>

      {/* Recommendations Cards Grid */}
      {filteredRecs.length === 0 ? (
        <div className="p-12 text-center rounded-2xl glass-panel border border-slate-100 bg-white/40">
          <CheckCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-700">No Recommendations Match Your Filters</h3>
          <p className="text-sm text-slate-500 mt-1">Adjust filters or check back later when new satellite data arrives.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRecs.map((rec) => {
            // Pick icon and color scheme based on category
            let categoryIcon = <Info className="w-5 h-5" />;
            let colorTheme = "from-sky-500/10 to-sky-500/5 border-sky-200/60";
            let accentText = "text-sky-700 bg-sky-100";
            
            if (rec.category === "Watering") {
              categoryIcon = <Droplets className="w-5 h-5 text-sky-600" />;
              colorTheme = "from-sky-500/5 via-sky-500/10 to-white border-sky-200";
              accentText = "text-sky-700 bg-sky-100";
            } else if (rec.category === "Fertilizer") {
              categoryIcon = <Flame className="w-5 h-5 text-amber-600" />;
              colorTheme = "from-amber-500/5 via-amber-500/10 to-white border-amber-200";
              accentText = "text-amber-800 bg-amber-100";
            } else if (rec.category === "Pest Control") {
              categoryIcon = <Bug className="w-5 h-5 text-rose-600" />;
              colorTheme = "from-rose-500/5 via-rose-500/10 to-white border-rose-200";
              accentText = "text-rose-800 bg-rose-100";
            } else if (rec.category === "Harvesting") {
              categoryIcon = <TrendingUp className="w-5 h-5 text-emerald-600" />;
              colorTheme = "from-emerald-500/5 via-emerald-500/10 to-white border-emerald-200";
              accentText = "text-emerald-800 bg-emerald-100";
            } else if (rec.category === "Weather Prep") {
              categoryIcon = <ShieldAlert className="w-5 h-5 text-violet-600" />;
              colorTheme = "from-violet-500/5 via-violet-500/10 to-white border-violet-200";
              accentText = "text-violet-800 bg-violet-100";
            }

            const isApplied = rec.status === "applied";
            const isIgnored = rec.status === "ignored";

            return (
              <div 
                key={rec.id} 
                className={`rounded-2xl bg-gradient-to-br ${colorTheme} border shadow-xs relative overflow-hidden flex flex-col justify-between p-6 transition-all duration-300 ${
                  isApplied ? "opacity-60 grayscale border-slate-200 bg-slate-50" : ""
                } ${isIgnored ? "opacity-30 border-slate-200 bg-slate-100 scale-95" : "hover:shadow-md hover:translate-y-[-1px]"}`}
              >
                {/* Floating Priority Badge */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-white border border-slate-200/60 shadow-xs">
                      {categoryIcon}
                    </div>
                    <div>
                      <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded ${accentText}`}>
                        {rec.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono ml-2">ID: {rec.id}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      rec.priority === "High" 
                        ? "bg-rose-100 text-rose-800" 
                        : rec.priority === "Medium" 
                        ? "bg-amber-100 text-amber-800" 
                        : "bg-slate-100 text-slate-800"
                    }`}>
                      {rec.priority} Priority
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-display font-bold text-slate-800 flex items-center gap-1.5">
                    {rec.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {rec.description}
                  </p>

                  <div className="p-3 bg-white/70 rounded-xl border border-slate-200/40 text-xs text-slate-700 font-medium">
                    <span className="text-slate-400 text-[10px] block font-mono uppercase">Twin Suggestion:</span>
                    <span className="text-slate-800">{rec.recommendedAction}</span>
                  </div>
                </div>

                {/* Bottom Stats & Controls */}
                <div className="mt-5 pt-4 border-t border-slate-200/50 flex items-center justify-between">
                  <div className="font-mono text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Impact Score: {rec.impactScore}/100</span>
                  </div>

                  <div className="flex gap-2">
                    {isApplied ? (
                      <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                        <Check className="w-3.5 h-3.5" />
                        <span>Applied on Station</span>
                      </span>
                    ) : isIgnored ? (
                      <span className="text-slate-400 text-xs font-medium">Dismissed</span>
                    ) : (
                      <>
                        <button
                          onClick={() => handleIgnore(rec.id)}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-rose-50 hover:border-rose-200 text-slate-500 hover:text-rose-600 text-xs font-medium transition-colors cursor-pointer"
                          title="Dismiss recommended task"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleApply(rec.id)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm hover:shadow-md flex items-center gap-1 transition-all cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Mark Applied</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Advanced Digital Twin forecasting banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950 via-teal-900 to-sky-950 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm border border-emerald-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 opacity-10">
          <Sparkles className="w-32 h-32 text-emerald-400 animate-spin-slow" />
        </div>
        <div>
          <h4 className="font-display font-semibold text-emerald-200 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Need Custom Simulation?</span>
          </h4>
          <p className="text-xs text-emerald-100/70 mt-1 max-w-xl">
            Configure soil nitrate additions, solar radiation fluctuations, and humidity variations inside the Digital Twin Sandbox to observe crops simulation indexes beforehand.
          </p>
        </div>
        <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg whitespace-nowrap transition-colors cursor-pointer">
          Run Climate Sandbox
        </button>
      </div>

    </div>
  );
}
