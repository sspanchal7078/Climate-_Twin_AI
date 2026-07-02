/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  TrendingUp, 
  Sprout, 
  Droplets, 
  Activity, 
  Calendar, 
  ArrowDown, 
  ArrowUp, 
  CheckCircle, 
  Flame, 
  Info,
  Layers,
  Thermometer,
  CloudRain,
  Sliders
} from "lucide-react";
import { 
  cropMilestones, 
  sampleSoil, 
  sampleCropHealth, 
  weatherHistory, 
  soilMoistureTrend 
} from "../data";

export default function AnalyticsScreen() {
  const [selectedCrop, setSelectedCrop] = useState<string>("Winter Durum Wheat");
  const [hoveredWaterIdx, setHoveredWaterIdx] = useState<number | null>(null);

  // Soil health index calculation
  const totalNPK = sampleSoil.nitrogenMgKg + sampleSoil.phosphorusMgKg + sampleSoil.potassiumMgKg;
  const soilHealthScore = 89; // Out of 100

  // Water usage monthly simulated logs (mm)
  const waterUsageMonths = [
    { month: "Jan", irrigation: 140, rain: 220 },
    { month: "Feb", irrigation: 120, rain: 180 },
    { month: "Mar", irrigation: 160, rain: 110 },
    { month: "Apr", irrigation: 210, rain: 90 },
    { month: "May", irrigation: 240, rain: 60 },
    { month: "Jun", irrigation: 280, rain: 45 } // June is dry, heavy irrigation
  ];

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100 pb-10 text-left">
      
      {/* Header Panel */}
      <div className="bg-white/40 dark:bg-slate-900/40 p-6 rounded-3xl border border-white/60 dark:border-white/10 shadow-lg backdrop-blur-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-100 dark:border-emerald-900/30 uppercase tracking-wider mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span>Telemetry & Growth Analytics</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-slate-900 dark:text-white">
            Agronomy Analytics & Yield Prognosis
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Detailed breakdown of soil health chemistry, historical water deployment, and forecasted crop milestones.
          </p>
        </div>

        <div className="shrink-0">
          <label className="block text-[10px] uppercase text-slate-500 dark:text-slate-400 font-mono mb-1 font-bold tracking-wider">Active Model Focus</label>
          <select 
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-white/80 dark:border-white/10 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500 transition-all shadow-xs"
          >
            <option value="Winter Durum Wheat">Organic Winter Durum Wheat</option>
            <option value="Premium Soybean">Premium Soybeans (Sector D)</option>
            <option value="Barley Cover">Barley Cover (Sector C)</option>
          </select>
        </div>
      </div>

      {/* Top statistics overview row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Soil Health Score card */}
        <div className="p-5 rounded-3xl glass-panel shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono text-slate-500 dark:text-slate-400 font-bold block">Soil Health Score</span>
            <span className="text-2xl font-display font-black text-emerald-700 dark:text-emerald-400">{soilHealthScore}/100</span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block font-semibold">✓ Rich Mineral Balance</span>
          </div>
          <div className="w-14 h-14 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 dark:border-emerald-400/20 dark:border-t-emerald-400 flex items-center justify-center font-bold text-xs text-emerald-700 dark:text-emerald-400">
            89%
          </div>
        </div>

        {/* Growth Curve Progress */}
        <div className="p-5 rounded-3xl glass-panel shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono text-slate-500 dark:text-slate-400 font-bold block">Growth Progress</span>
            <span className="text-2xl font-display font-black text-slate-900 dark:text-slate-100">Flowering</span>
            <span className="text-[10px] text-slate-500 block">Day 84 of 130 cycle</span>
          </div>
          <div className="w-14 h-14 rounded-full border-4 border-slate-100 border-t-emerald-600 border-r-emerald-600 flex items-center justify-center font-bold text-xs text-slate-700">
            64%
          </div>
        </div>

        {/* Expected Yield prognostics */}
        <div className="p-5 rounded-xl glass-panel border border-white/60 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block">Expected Yield</span>
            <span className="text-2xl font-display font-black text-teal-700">64.5 Bu/Ac</span>
            <span className="text-[10px] text-teal-600 block font-semibold flex items-center gap-1">
              <ArrowUp className="w-3 h-3" /> +8.2% vs History
            </span>
          </div>
          <div className="p-3 rounded-lg bg-teal-500/10 text-teal-600">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* Water usage seasonal sum */}
        <div className="p-5 rounded-xl glass-panel border border-white/60 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block">Seasonal Water Duty</span>
            <span className="text-2xl font-display font-black text-sky-700">1,090 mm</span>
            <span className="text-[10px] text-slate-500 block font-semibold flex items-center gap-1">
              <ArrowDown className="w-3 h-3" /> -12% due to rain capture
            </span>
          </div>
          <div className="p-3 rounded-lg bg-sky-500/10 text-sky-600">
            <Droplets className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Main Analysis Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Growth Milestones & Soil Chemistry */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Crop Growth Timeline Progress */}
          <div className="p-6 rounded-2xl glass-panel border border-white/60 shadow-xs bg-white/70">
            <h3 className="text-base font-display font-bold text-slate-800 mb-2 flex items-center gap-1.5">
              <Sprout className="w-5 h-5 text-emerald-600" />
              <span>Winter Wheat Growth Milestone Trajectory</span>
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Tracking physiological stages. The model forecasts physiological maturity on July 24th, 2026.
            </p>

            <div className="space-y-4">
              {cropMilestones.map((stage, idx) => {
                let statusBadge = null;
                if (stage.progressPercent === 100) {
                  statusBadge = <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-sans">Completed</span>;
                } else if (stage.progressPercent > 0) {
                  statusBadge = <span className="text-[9px] font-bold bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full font-sans animate-pulse">64% Active</span>;
                } else {
                  statusBadge = <span className="text-[9px] font-bold bg-slate-100 text-slate-400 px-2 py-0.5 rounded-full font-sans">Upcoming</span>;
                }

                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <div className="flex items-center gap-2 text-slate-700">
                        <span className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 text-[10px] flex items-center justify-center font-bold text-slate-500 font-mono">
                          {idx + 1}
                        </span>
                        <span>{stage.stage}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {statusBadge}
                        <span className="text-slate-400 text-[10px] font-mono">{stage.durationDays} Days</span>
                      </div>
                    </div>
                    
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden relative">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          stage.progressPercent === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-emerald-500 to-sky-500'
                        }`} 
                        style={{ width: `${stage.progressPercent === 100 ? 100 : stage.progressPercent * 0.8}%` }} 
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Sub-Soil Chemistry Breakdown (N-P-K & pH) */}
          <div className="p-6 rounded-2xl glass-panel border border-white/60 shadow-xs bg-white/70">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-display font-bold text-slate-800 flex items-center gap-1.5">
                  <Sliders className="w-5 h-5 text-emerald-600" />
                  <span>Sub-Soil N-P-K Elemental Breakdown</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Target chemical values based on ideal organic requirements for wheat flowering.
                </p>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-md font-semibold">
                PH Level: {sampleSoil.phLevel}
              </span>
            </div>

            <div className="space-y-4 pt-1">
              {/* Nitrogen */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">Nitrogen (N) - Soil Soluble</span>
                  <span className="text-slate-500 font-mono">{sampleSoil.nitrogenMgKg} mg/kg <strong className="text-amber-600">(Deficient)</strong></span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden relative">
                  {/* Ideal range target zone overlay */}
                  <div className="absolute left-[50%] right-[20%] top-0 bottom-0 bg-emerald-500/10 border-x border-emerald-500/20" title="Ideal Range: 50-80 mg/kg" />
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '42%' }} />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Ideal Range: 50 - 80 mg/kg • AI urea feeding advised prior to rainfall.</p>
              </div>

              {/* Phosphorus */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">Phosphorus (P) - Lab Equivalent</span>
                  <span className="text-slate-500 font-mono">{sampleSoil.phosphorusMgKg} mg/kg <strong className="text-emerald-600">(Optimal)</strong></span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden relative">
                  <div className="absolute left-[30%] right-[30%] top-0 bottom-0 bg-emerald-500/10 border-x border-emerald-500/20" title="Ideal Range: 15-30 mg/kg" />
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '60%' }} />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Ideal Range: 15 - 30 mg/kg • Soil phosphorous values remain perfectly stable.</p>
              </div>

              {/* Potassium */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">Potassium (K) - Readily Available</span>
                  <span className="text-slate-500 font-mono">{sampleSoil.potassiumMgKg} mg/kg <strong className="text-emerald-600">(Optimal)</strong></span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden relative">
                  <div className="absolute left-[40%] right-[30%] top-0 bottom-0 bg-emerald-500/10 border-x border-emerald-500/20" title="Ideal Range: 120-180 mg/kg" />
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '75%' }} />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Ideal Range: 120 - 180 mg/kg • Deep roots registering optimal potash reserves.</p>
              </div>
            </div>

            {/* Other subsoil values */}
            <div className="mt-5 grid grid-cols-2 gap-4 pt-4 border-t border-slate-200/50 text-xs text-slate-600 font-mono">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Soil Acidity Index</span>
                <span className="font-bold text-slate-800 text-sm">{sampleSoil.phLevel} pH (Slightly Acidic)</span>
                <span className="text-[10px] text-emerald-600 block font-sans">✓ Ideal for nutrient ion exchange</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Electrical Salinity</span>
                <span className="font-bold text-slate-800 text-sm">{sampleSoil.salinityDsm} dS/m (Safe)</span>
                <span className="text-[10px] text-emerald-600 block font-sans">✓ No risk of sodium intoxication</span>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Water Usage & Weather History logs */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Water Usage monthly layout */}
          <div className="p-6 rounded-2xl glass-panel border border-white/60 shadow-xs bg-white/70">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-base font-display font-bold text-slate-800 flex items-center gap-1.5">
                  <Droplets className="w-5 h-5 text-sky-600" />
                  <span>Historical Seasonal Water Usage</span>
                </h3>
                <p className="text-xs text-slate-500">Irrigation versus environmental precipitation.</p>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Values in Liters</span>
            </div>

            {/* Custom SVG Bar Chart */}
            <div className="relative pt-2">
              <svg className="w-full h-44 overflow-visible" viewBox="0 0 300 150">
                {/* Horizontal grid lines */}
                <line x1="25" y1="20" x2="280" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="25" y1="60" x2="280" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="25" y1="100" x2="280" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="25" y1="130" x2="280" y2="130" stroke="#cbd5e1" strokeWidth="1" />

                {/* Left labels */}
                <text x="2" y="25" fill="#94a3b8" className="text-[8px] font-mono">300k L</text>
                <text x="2" y="65" fill="#94a3b8" className="text-[8px] font-mono">150k L</text>
                <text x="2" y="105" fill="#94a3b8" className="text-[8px] font-mono">50k L</text>
                <text x="2" y="135" fill="#94a3b8" className="text-[8px] font-mono">0L</text>

                {waterUsageMonths.map((item, idx) => {
                  const x = 35 + idx * 40;
                  // Map values to bar height. Y max is 130, Y min is 20. Max capacity: 300. height = val * (110/300)
                  const irriHeight = item.irrigation * 0.36;
                  const rainHeight = item.rain * 0.36;
                  const isHovered = hoveredWaterIdx === idx;

                  return (
                    <g 
                      key={idx}
                      onMouseEnter={() => setHoveredWaterIdx(idx)}
                      onMouseLeave={() => setHoveredWaterIdx(null)}
                      className="cursor-pointer"
                    >
                      {/* Rain Bar (Light sky blue) */}
                      <rect 
                        x={x} 
                        y={130 - rainHeight} 
                        width="11" 
                        height={rainHeight} 
                        fill="#0284c7" 
                        opacity={isHovered ? "0.9" : "0.75"}
                        rx="1" 
                      />
                      {/* Irrigation Bar (Deep emerald blue) */}
                      <rect 
                        x={x + 13} 
                        y={130 - irriHeight} 
                        width="11" 
                        height={irriHeight} 
                        fill="#10b981" 
                        opacity={isHovered ? "0.9" : "0.75"}
                        rx="1" 
                      />
                      {/* Month label */}
                      <text x={x + 5} y="145" fill="#64748b" className="text-[9px] font-medium font-sans">{item.month}</text>
                    </g>
                  );
                })}
              </svg>

              {/* Hover stats */}
              {hoveredWaterIdx !== null ? (
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1 px-2.5 rounded shadow-lg border border-slate-700 flex gap-2 font-mono">
                  <div>
                    <span className="text-emerald-400">Applied Irrigation:</span> {waterUsageMonths[hoveredWaterIdx].irrigation * 1000} L
                  </div>
                  <div>
                    <span className="text-sky-400">Natural Rain:</span> {waterUsageMonths[hoveredWaterIdx].rain * 1000} L
                  </div>
                </div>
              ) : (
                <div className="flex justify-center gap-3 text-[9px] text-slate-500 font-semibold mt-1">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-xs" /> Natural Rain (L)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 bg-sky-600 rounded-xs" /> Active Irrigation (L)
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Weather History Table */}
          <div className="p-6 rounded-2xl glass-panel border border-white/60 shadow-xs bg-white/70">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-display font-bold text-slate-800 flex items-center gap-1.5">
                <Calendar className="w-5 h-5 text-slate-600" />
                <span>Station Weather History (7-Day Logs)</span>
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase font-mono text-[9px] tracking-wider">
                    <th className="py-2">Day</th>
                    <th className="py-2">Min Temp</th>
                    <th className="py-2">Max Temp</th>
                    <th className="py-2">Rainfall</th>
                    <th className="py-2 text-right">Humidity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-slate-700">
                  {weatherHistory.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="py-2.5 font-bold font-sans text-slate-800">{item.day}</td>
                      <td className="py-2.5 flex items-center gap-0.5 text-sky-600"><Thermometer className="w-3 h-3" />{item.tempMin}°C</td>
                      <td className="py-2.5 text-amber-600">{item.tempMax}°C</td>
                      <td className="py-2.5 font-semibold text-slate-800">
                        {item.rainMm > 0 ? (
                          <span className="text-sky-700 font-bold flex items-center gap-0.5"><CloudRain className="w-3 h-3 text-sky-500" />{item.rainMm} mm</span>
                        ) : (
                          <span className="text-slate-400">0.0 mm</span>
                        )}
                      </td>
                      <td className="py-2.5 text-right font-semibold">{item.humidity}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
