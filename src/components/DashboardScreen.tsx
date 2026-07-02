/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  CloudRain, 
  Droplets, 
  Thermometer, 
  Wind, 
  Sprout, 
  Flame, 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Sparkles, 
  Navigation, 
  Calendar, 
  ArrowUpRight, 
  Search,
  Check,
  Bug,
  Compass,
  Cpu,
  Info,
  Layers,
  MapPin
} from "lucide-react";
import { 
  sampleWeather, 
  sampleSoil, 
  sampleCropHealth, 
  farmZones, 
  FarmZone,
  weatherHistory, 
  soilMoistureTrend 
} from "../data";

interface DashboardScreenProps {
  farmerName: string;
  onNavigateToTab: (tabId: string) => void;
}

export default function DashboardScreen({ farmerName, onNavigateToTab }: DashboardScreenProps) {
  // Sector selection state (simulating real map selection)
  const [selectedZone, setSelectedZone] = useState<FarmZone>(farmZones[1]); // Default to Central Meadows
  
  // Interactive chart hover states
  const [hoveredTempIdx, setHoveredTempIdx] = useState<number | null>(null);
  const [hoveredMoistureIdx, setHoveredMoistureIdx] = useState<number | null>(null);

  // Dynamic simulation controls to let the evaluator test soil variations
  const [currentMoisture, setCurrentMoisture] = useState<number>(selectedZone.soilMoisture);
  
  const handleZoneClick = (zone: FarmZone) => {
    setSelectedZone(zone);
    setCurrentMoisture(zone.soilMoisture);
  };

  // Quick helper to simulate a water application
  const handleSimulateIrrigation = () => {
    setCurrentMoisture(prev => Math.min(prev + 5, 100));
  };

  return (
    <div className="space-y-6 text-slate-800 pb-10">
      
      {/* Top Header - Welcome Section & Map-Zone Picker status */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/40 dark:bg-slate-900/40 p-6 rounded-3xl border border-white/60 dark:border-white/10 shadow-lg backdrop-blur-xl text-slate-800 dark:text-slate-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Telemetry online • Greenwood Station #048</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-slate-900 dark:text-white">
            Welcome, {farmerName}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Digital Climate Twin is synchronized with satellite orbit and local weather grids.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold font-mono uppercase tracking-wider">Current Time (Local)</div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-200">June 29, 2026 — 06:17 AM</div>
          </div>
          <button 
            onClick={handleSimulateIrrigation}
            className="px-4 py-2.5 text-xs font-bold rounded-xl bg-sky-500 hover:bg-sky-600 text-white shadow-lg shadow-sky-500/20 flex items-center gap-2 transition-all cursor-pointer border border-sky-400/30"
            title="Simulate quick watering to observe telemetry responses"
          >
            <Droplets className="w-3.5 h-3.5" />
            <span>Irrigate 5L (Simulate)</span>
          </button>
        </div>
      </div>

      {/* Primary Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT / MAIN COLUMN - 8 units in desktop */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Top section: Weather & IoT Quick Meters */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Current Weather Card */}
            <div className="md:col-span-5 rounded-3xl bg-gradient-to-br from-sky-500/80 to-blue-600/80 dark:from-sky-950/70 dark:to-blue-950/70 backdrop-blur-xl border border-white/40 dark:border-white/10 p-6 text-white shadow-xl relative overflow-hidden">
              {/* Sun & Cloud SVG Background decoration */}
              <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 opacity-15">
                <Compass className="w-48 h-48 animate-spin-slow" />
              </div>
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[10px] font-bold bg-white/20 px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
                    Local Microclimate
                  </span>
                  <h3 className="text-lg font-display font-black mt-2 tracking-tight">Storm Front Impending</h3>
                </div>
                <CloudRain className="w-10 h-10 text-sky-100 animate-bounce" />
              </div>

              <div className="flex items-baseline gap-2 my-4">
                <span className="text-4xl sm:text-5xl font-display font-black tracking-tight">{sampleWeather.temp}°C</span>
                <span className="text-sky-100/80 text-xs font-semibold">Feels like 29°C</span>
              </div>

              <div className="grid grid-cols-2 gap-x-2 gap-y-3 pt-3 border-t border-white/20 text-xs text-sky-100/95 font-mono">
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-sky-200" />
                  <div>
                    <span className="block text-white/60 text-[9px] uppercase font-bold">Humidity</span>
                    <span className="font-semibold text-sm">{sampleWeather.humidity}%</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CloudRain className="w-4 h-4 text-sky-200" />
                  <div>
                    <span className="block text-white/60 text-[9px] uppercase font-bold">Rain Prob</span>
                    <span className="font-semibold text-sm">{sampleWeather.rainProbability}%</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="w-4 h-4 text-sky-200" />
                  <div>
                    <span className="block text-white/60 text-[9px] uppercase font-bold">Wind Speed</span>
                    <span className="font-semibold text-sm">{sampleWeather.windSpeed} km/h</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-sky-200" />
                  <div>
                    <span className="block text-white/60 text-[9px] uppercase font-bold">UV Index</span>
                    <span className="font-semibold text-sm">{sampleWeather.uvIndex} (High)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* IoT Live readings - Soil & Crop Summary */}
            <div className="md:col-span-7 grid grid-cols-2 gap-4">
              
              {/* Crop Health Status */}
              <div className="rounded-xl glass-panel p-4 shadow-xs relative border border-white/60 text-left flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600">
                    <Sprout className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Optimal
                  </span>
                </div>
                <div className="mt-3">
                  <span className="text-[11px] text-slate-400 font-mono uppercase block">Crop Health (NDVI)</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-display font-bold text-slate-800">
                      {selectedZone.health === "Attention" ? "Fair" : "Excellent"}
                    </span>
                    <span className="text-xs text-emerald-600 font-mono font-bold">({selectedZone.ndvi} index)</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">
                    {selectedZone.crop}: Uniform chlorophyll density registered.
                  </p>
                </div>
              </div>

              {/* Soil Moisture */}
              <div className="rounded-xl glass-panel p-4 shadow-xs relative border border-white/60 text-left flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="p-2 rounded-lg bg-sky-500/10 text-sky-600">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${currentMoisture < 28 ? "bg-amber-100 text-amber-800" : "bg-sky-100 text-sky-800"}`}>
                    {currentMoisture}%
                  </span>
                </div>
                <div className="mt-3">
                  <span className="text-[11px] text-slate-400 font-mono uppercase block">Root Soil Moisture</span>
                  <div className="w-full bg-slate-200/50 h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${currentMoisture < 28 ? 'bg-amber-500' : 'bg-sky-500'}`} 
                      style={{ width: `${currentMoisture}%` }} 
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2">
                    {currentMoisture < 28 ? "⚠️ Low - Alert Triggered" : "✓ Hydrated Level"}
                  </p>
                </div>
              </div>

              {/* Soil Temp */}
              <div className="rounded-xl glass-panel p-4 shadow-xs relative border border-white/60 text-left flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600">
                    <Thermometer className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                    {sampleSoil.temperatureC}°C
                  </span>
                </div>
                <div className="mt-3">
                  <span className="text-[11px] text-slate-400 font-mono uppercase block">Soil Temp (10cm)</span>
                  <span className="text-xl font-display font-bold text-slate-800">22.8°C</span>
                  <p className="text-[10px] text-emerald-600 font-semibold mt-1">
                    ✓ Optimal for biological life
                  </p>
                </div>
              </div>

              {/* Water Requirement */}
              <div className="rounded-xl glass-panel p-4 shadow-xs relative border border-white/60 text-left flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="p-2 rounded-lg bg-teal-500/10 text-teal-600">
                    <Activity className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800">
                    {currentMoisture < 28 ? "1,550 L" : "1,250 L"}
                  </span>
                </div>
                <div className="mt-3">
                  <span className="text-[11px] text-slate-400 font-mono uppercase block">Daily Water Demand</span>
                  <span className="text-xl font-display font-bold text-slate-800">
                    {currentMoisture < 28 ? "High Demand" : "Stable"}
                  </span>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Req: {currentMoisture < 28 ? "1.5K L/acre" : "1.2K L/acre"}
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Interactive Farm Map Placeholder (High visual quality) */}
          <div className="rounded-2xl glass-panel p-6 shadow-sm border border-white/60 text-left relative overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
              <div>
                <h3 className="text-lg font-display font-bold text-slate-800 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-emerald-600" />
                  <span>Interactive Farm Map (Satellite Twin View)</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Tap on a sector zone below to focus the telemetry and soil telemetry meters.
                </p>
              </div>
              <div className="flex gap-2 text-[10px] font-mono">
                <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded font-semibold">Wheat Fields</span>
                <span className="px-2 py-1 bg-sky-100 text-sky-800 rounded font-semibold">Soybeans</span>
              </div>
            </div>

            {/* Farm layout design map placeholder */}
            <div className="w-full h-64 rounded-xl relative overflow-hidden bg-slate-900 border border-slate-700 p-2 shadow-inner">
              
              {/* Fake satellite layout lines & imagery placeholder */}
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(16,185,129,0.1)_1px,transparent_1px)] [background-size:40px_40px]" />
              
              {/* Compass grid markers */}
              <div className="absolute top-2 left-2 text-[10px] font-mono text-white/50 space-y-1 bg-black/40 p-2 rounded border border-white/5">
                <div>COORD: 45.385° N, 122.103° W</div>
                <div>ALT: 212m AMSL</div>
                <div>PASS: Sentinel-2 (6h ago)</div>
              </div>

              {/* Grid map zones representing fields */}
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-3 p-4 pt-16">
                {farmZones.map((zone) => {
                  const isSelected = selectedZone.id === zone.id;
                  let colorClass = "bg-emerald-500/20 border-emerald-500 hover:bg-emerald-500/30";
                  let badgeColor = "bg-emerald-500/80 text-white";
                  
                  if (zone.health === "Attention") {
                    colorClass = "bg-amber-500/20 border-amber-500 hover:bg-amber-500/30";
                    badgeColor = "bg-amber-500 text-white";
                  } else if (zone.health === "Critical") {
                    colorClass = "bg-rose-500/20 border-rose-500 hover:bg-rose-500/30";
                    badgeColor = "bg-rose-500 text-white";
                  }

                  return (
                    <button
                      key={zone.id}
                      onClick={() => handleZoneClick(zone)}
                      className={`relative rounded-lg border-2 flex flex-col justify-end p-3 text-left transition-all backdrop-blur-xs cursor-pointer ${colorClass} ${
                        isSelected ? "ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-[1.01] shadow-lg shadow-emerald-500/10" : "opacity-75 hover:opacity-100"
                      }`}
                    >
                      <div className="absolute top-2 right-2 flex items-center gap-1">
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded font-mono ${badgeColor}`}>
                          {zone.health}
                        </span>
                        {isSelected && (
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-900 animate-ping absolute -top-1 -right-1" />
                        )}
                      </div>
                      
                      <div>
                        <span className="text-[10px] text-white/60 font-mono tracking-wider block">ZONE: {zone.id.toUpperCase()}</span>
                        <h4 className="text-sm font-bold text-white leading-tight">{zone.name}</h4>
                        <div className="flex justify-between items-center text-[10px] text-white/80 mt-1 font-mono">
                          <span>{zone.crop}</span>
                          <span>Moisture: {zone.id === selectedZone.id ? currentMoisture : zone.soilMoisture}%</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Live telemetry scan line animation */}
              <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-lg shadow-emerald-500 animate-pulse" style={{ top: '45%' }} />
            </div>

            {/* Focused Sector info summary bar */}
            <div className="mt-3 p-3 rounded-lg bg-emerald-50/50 border border-emerald-100 flex flex-wrap gap-4 items-center justify-between text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Focused: <strong className="text-slate-800">{selectedZone.name}</strong> ({selectedZone.areaAcres} Acres)</span>
              </div>
              <div className="flex gap-4 font-mono">
                <span>NDVI index: <strong className="text-emerald-700">{selectedZone.ndvi}</strong></span>
                <span>Subsurface moisture: <strong className="text-sky-700">{currentMoisture}%</strong></span>
              </div>
            </div>
          </div>

          {/* Interactive SVG Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Chart 1: Weekly Temperature Graph & Rainfall prediction */}
            <div className="rounded-2xl glass-panel p-5 shadow-xs border border-white/60 text-left">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="text-sm font-display font-bold text-slate-800 flex items-center gap-1.5">
                    <Thermometer className="w-4 h-4 text-emerald-600" />
                    <span>Weekly Temp & Precipitation Forecast</span>
                  </h4>
                  <p className="text-[11px] text-slate-500">Interact with the nodes to read values</p>
                </div>
                <span className="text-[10px] font-mono bg-sky-50 text-sky-700 px-2 py-0.5 rounded border border-sky-100 font-semibold">7-Day Curve</span>
              </div>

              {/* Custom SVG line-chart with hover tracking */}
              <div className="relative pt-2">
                <svg className="w-full h-44 overflow-visible" viewBox="0 0 400 150">
                  {/* Grid Lines */}
                  <line x1="30" y1="20" x2="380" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="30" y1="60" x2="380" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="30" y1="100" x2="380" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="30" y1="130" x2="380" y2="130" stroke="#cbd5e1" strokeWidth="1" />

                  {/* Left Temp scale axis */}
                  <text x="5" y="25" fill="#94a3b8" className="text-[8px] font-mono">40°C</text>
                  <text x="5" y="65" fill="#94a3b8" className="text-[8px] font-mono">25°C</text>
                  <text x="5" y="105" fill="#94a3b8" className="text-[8px] font-mono">15°C</text>
                  <text x="5" y="135" fill="#94a3b8" className="text-[8px] font-mono">0°C</text>

                  {/* Generate the graph path */}
                  {/* Temperatures: Mon:26, Tue:28, Wed:29, Thu:32, Fri:35, Sat:38, Sun:37 */}
                  {/* We map temperatures to SVG Y coordinates. (130 is 0 deg, 20 is 40 deg. diff is 110. scale is 110/40 = 2.75. Y = 130 - temp * 2.75) */}
                  {/* Points X coords: Mon:50, Tue:100, Wed:150, Thu:200, Fri:250, Sat:300, Sun:350 */}
                  <path
                    d="M 50,58.5 L 100,53 L 150,50.25 L 200,42 L 250,33.75 L 300,25.5 L 350,28.25"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {/* Precipitation bars underneath */}
                  {/* Rain: Mon:0, Tue:1.2, Wed:24.5, Thu:4.0, Fri:0, Sat:0, Sun:0 */}
                  {/* Wed rain bars: height mapped to rain. scale is 4 */}
                  <rect x="45" y="125" width="10" height="5" fill="#0ea5e9" opacity="0.3" rx="1" />
                  <rect x="95" y="120" width="10" height="10" fill="#0ea5e9" opacity="0.4" rx="1" />
                  <rect x="145" y="60" width="10" height="70" fill="#0ea5e9" opacity="0.75" rx="1" />
                  <rect x="195" y="112" width="10" height="18" fill="#0ea5e9" opacity="0.4" rx="1" />

                  {/* Interactive Nodes */}
                  {weatherHistory.map((item, idx) => {
                    const x = 50 + idx * 50;
                    // Temp Max points mapping
                    const temps = [26, 28, 29, 32, 35, 38, 37];
                    const y = 130 - temps[idx] * 2.75;
                    const isHovered = hoveredTempIdx === idx;

                    return (
                      <g 
                        key={idx} 
                        onMouseEnter={() => setHoveredTempIdx(idx)}
                        onMouseLeave={() => setHoveredTempIdx(null)}
                        className="cursor-pointer"
                      >
                        {isHovered && (
                          <>
                            <line x1={x} y1="20" x2={x} y2="130" stroke="#10b981" strokeWidth="1" strokeDasharray="3,3" />
                            <circle cx={x} cy={y} r="8" fill="#10b981" opacity="0.3" />
                          </>
                        )}
                        <circle 
                          cx={x} 
                          cy={y} 
                          r={isHovered ? "5" : "4"} 
                          fill="#ffffff" 
                          stroke="#10b981" 
                          strokeWidth="2.5" 
                        />
                        <text x={x - 10} y="145" fill="#64748b" className="text-[9px] font-medium font-sans">{item.day}</text>
                      </g>
                    );
                  })}
                </svg>

                {/* Floating Rich Tooltip state */}
                {hoveredTempIdx !== null ? (
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-[11px] py-1.5 px-3 rounded-lg shadow-lg border border-slate-700 flex gap-3 font-mono">
                    <div>
                      <span className="text-slate-400">Day:</span> {weatherHistory[hoveredTempIdx].day}
                    </div>
                    <div>
                      <span className="text-emerald-400">Max Temp:</span> {weatherHistory[hoveredTempIdx].tempMax}°C
                    </div>
                    <div>
                      <span className="text-sky-400">Rainfall:</span> {weatherHistory[hoveredTempIdx].rainMm} mm
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center gap-4 text-[10px] text-slate-500 font-medium">
                    <span className="flex items-center gap-1"><span className="w-2.5 h-1 bg-emerald-500 rounded" /> Max Temperature (°C)</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-sky-500/60 rounded" /> Simulated Rainfall (mm)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Chart 2: Soil Moisture Trend Graph (Multi-depth) */}
            <div className="rounded-2xl glass-panel p-5 shadow-xs border border-white/60 text-left">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="text-sm font-display font-bold text-slate-800 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span>Soil Moisture Trend by Root Depth</span>
                  </h4>
                  <p className="text-[11px] text-slate-500">Root zones 10cm, 30cm, & 60cm levels</p>
                </div>
                <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-100 font-semibold">Active</span>
              </div>

              {/* Custom SVG line-chart representing 3 depths */}
              <div className="relative pt-2">
                <svg className="w-full h-44 overflow-visible" viewBox="0 0 400 150">
                  {/* Grid Lines */}
                  <line x1="30" y1="20" x2="380" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="30" y1="60" x2="380" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="30" y1="100" x2="380" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="30" y1="130" x2="380" y2="130" stroke="#cbd5e1" strokeWidth="1" />

                  {/* Left moisture axis */}
                  <text x="5" y="25" fill="#94a3b8" className="text-[8px] font-mono">100%</text>
                  <text x="5" y="65" fill="#94a3b8" className="text-[8px] font-mono">50%</text>
                  <text x="5" y="105" fill="#94a3b8" className="text-[8px] font-mono">20%</text>
                  <text x="5" y="135" fill="#94a3b8" className="text-[8px] font-mono">0%</text>

                  {/* Depth lines */}
                  {/* 10cm: Mon:42, Tue:39, Wed:58, Thu:48, Fri:40, Sat:33, Sun:28 */}
                  {/* Y = 130 - value * 1.1 */}
                  <path
                    d="M 50,83.8 L 100,87.1 L 150,66.2 L 200,77.2 L 250,86 L 300,93.7 L 350,99.2"
                    fill="none"
                    stroke="#0ea5e9" // light blue for shallow moisture
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* 30cm depth: Mon:45, Tue:44, Wed:52, Thu:49, Fri:46, Sat:42, Sun:38 */}
                  <path
                    d="M 50,80.5 L 100,81.6 L 150,72.8 L 200,76.1 L 250,79.4 L 300,83.8 L 350,88.2"
                    fill="none"
                    stroke="#0284c7" // deeper blue
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* 60cm depth: Mon:48, Tue:48, Wed:50, Thu:49, Fri:49, Sat:48, Sun:47 */}
                  <path
                    d="M 50,77.2 L 100,77.2 L 150,75 L 200,76.1 L 250,76.1 L 300,77.2 L 350,78.3"
                    fill="none"
                    stroke="#0369a1" // very deep blue
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Interactive node hover triggers */}
                  {soilMoistureTrend.map((item, idx) => {
                    const x = 50 + idx * 50;
                    const isHovered = hoveredMoistureIdx === idx;
                    return (
                      <g
                        key={idx}
                        onMouseEnter={() => setHoveredMoistureIdx(idx)}
                        onMouseLeave={() => setHoveredMoistureIdx(null)}
                        className="cursor-pointer"
                      >
                        {isHovered && (
                          <line x1={x} y1="20" x2={x} y2="130" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="3,3" />
                        )}
                        <circle cx={x} cy={130 - item.depth10cm * 1.1} r="3" fill="#ffffff" stroke="#0ea5e9" strokeWidth="1.5" />
                        <text x={x - 10} y="145" fill="#64748b" className="text-[9px] font-medium font-sans">{item.time}</text>
                      </g>
                    );
                  })}
                </svg>

                {/* Legend & Hover popup */}
                {hoveredMoistureIdx !== null ? (
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1.5 px-3 rounded-lg shadow-lg border border-slate-700 flex gap-2 font-mono">
                    <div>
                      <span className="text-sky-300">10cm:</span> {soilMoistureTrend[hoveredMoistureIdx].depth10cm}%
                    </div>
                    <div>
                      <span className="text-sky-400">30cm:</span> {soilMoistureTrend[hoveredMoistureIdx].depth30cm}%
                    </div>
                    <div>
                      <span className="text-sky-500">60cm:</span> {soilMoistureTrend[hoveredMoistureIdx].depth60cm}%
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center gap-3 text-[9px] text-slate-500 font-medium">
                    <span className="flex items-center gap-1"><span className="w-2.5 h-1 bg-sky-400 rounded" /> Shallow (10cm)</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-1 bg-sky-600 rounded" /> Medium (30cm)</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-1 bg-sky-800 rounded" /> Deep Root (60cm)</span>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN - SIDEBAR WIDGETS - 4 units in desktop */}
        <div className="lg:col-span-4 space-y-6 text-left">
          
          {/* Smart Agriculture AI Recommendation Panel quick view */}
          <div className="rounded-2xl glass-panel p-5 shadow-sm border border-white/60 relative overflow-hidden bg-gradient-to-b from-white/80 to-white/40">
            <div className="absolute top-0 right-0 p-3 bg-emerald-500/10 text-emerald-600 rounded-bl-xl">
              <Sparkles className="w-4 h-4 animate-bounce" />
            </div>

            <h3 className="text-base font-display font-bold text-slate-800 mb-1 flex items-center gap-1.5">
              <span>Climate Twin AI Advisors</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Real-time suggestions based on current soil parameters & storm front data.
            </p>

            <div className="space-y-3.5">
              
              <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-slate-700 hover:bg-amber-500/10 transition-colors">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">High Priority</span>
                  <span className="text-[10px] text-slate-400 font-mono">Sector C</span>
                </div>
                <h4 className="text-xs font-bold text-slate-800 mt-1.5">Schedule Irrigation in Next 12 Hours</h4>
                <p className="text-[11px] text-slate-500 mt-1">
                  Soil moisture dropped to 24% at Hillside. Run system for 45 minutes to safeguard vegetative growth.
                </p>
                <div className="mt-2.5 flex justify-between items-center text-[10px]">
                  <span className="font-semibold text-emerald-600">Impact Score: 92/100</span>
                  <button 
                    onClick={() => onNavigateToTab("recommendations")}
                    className="text-emerald-700 hover:underline font-bold flex items-center gap-0.5"
                  >
                    <span>Execute</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-slate-700 hover:bg-emerald-500/10 transition-colors">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">Medium Priority</span>
                  <span className="text-[10px] text-slate-400 font-mono">Sector B</span>
                </div>
                <h4 className="text-xs font-bold text-slate-800 mt-1.5">Apply Targeted Nitrogen (N-P-K)</h4>
                <p className="text-[11px] text-slate-500 mt-1">
                  Chlorophyll density shows mild dip. Apply 15 kg/acre urea before tomorrow's expected rainfall.
                </p>
                <div className="mt-2.5 flex justify-between items-center text-[10px]">
                  <span className="font-semibold text-emerald-600">Impact Score: 84/100</span>
                  <button 
                    onClick={() => onNavigateToTab("recommendations")}
                    className="text-emerald-700 hover:underline font-bold flex items-center gap-0.5"
                  >
                    <span>View Detail</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>

            <button 
              onClick={() => onNavigateToTab("recommendations")}
              className="w-full mt-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold text-center transition-colors block cursor-pointer"
            >
              Open Complete AI Recommendation Suite (5)
            </button>
          </div>

          {/* Quick Active Alerts Checklist widget */}
          <div className="rounded-2xl glass-panel p-5 shadow-xs border border-white/60">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-display font-bold text-slate-800 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Station Alert Flags</span>
              </h3>
              <span className="text-xs font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
                3 Critical
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-100 flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 animate-ping shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-rose-900 leading-tight">Heavy Rainfall Warning</h4>
                  <p className="text-[10px] text-rose-700 mt-0.5">Convective storms with local storm intensity exceeding 15mm/hr.</p>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-100 flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-amber-900 leading-tight">Extreme Heatwave Advisory</h4>
                  <p className="text-[10px] text-amber-700 mt-0.5">Temperatures exceeding 38.5°C over next 72 hours forecast.</p>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-100 flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-amber-900 leading-tight">Pest Risk (Aphids Index)</h4>
                  <p className="text-[10px] text-amber-700 mt-0.5">Thermal humidity indices reflect peak breeding thresholds.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigateToTab("alerts")}
              className="w-full text-center text-xs text-emerald-700 hover:text-emerald-800 font-bold mt-4"
            >
              Open Sensor Alerts Screen &rarr;
            </button>
          </div>

        </div>

      </div>

      {/* BOTTOM METRICS CARDS GRID */}
      <div className="space-y-4 text-left">
        <h3 className="text-lg font-display font-black tracking-tight text-slate-900 dark:text-white">
          Digital Twin Risk & Agronomic Projections
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Disease Risk */}
          <div className="p-5 rounded-3xl glass-panel shadow-lg hover:shadow-xl transition-all duration-300">
            <span className="text-[10px] uppercase font-mono font-bold text-slate-500 dark:text-slate-400 block mb-1.5">Disease Risk Index</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-display font-black text-slate-900 dark:text-slate-100">18% (Low)</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-[10.5px] text-slate-600 dark:text-slate-400 font-medium mt-1.5 leading-snug">
              Mild fungal score. Root rot risk negligible.
            </p>
          </div>

          {/* Pest Alert */}
          <div className="p-5 rounded-3xl glass-panel shadow-lg hover:shadow-xl transition-all duration-300">
            <span className="text-[10px] uppercase font-mono font-bold text-slate-500 dark:text-slate-400 block mb-1.5">Pest Activity Alert</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-display font-black text-amber-700 dark:text-amber-400">Elevated</span>
              <Bug className="w-4 h-4 text-amber-500 animate-pulse" />
            </div>
            <p className="text-[10.5px] text-slate-600 dark:text-slate-400 font-medium mt-1.5 leading-snug">
              Aphid risk elevated around Sector B grass borders.
            </p>
          </div>

          {/* Irrigation Recommendation */}
          <div className="p-5 rounded-3xl glass-panel shadow-lg hover:shadow-xl transition-all duration-300">
            <span className="text-[10px] uppercase font-mono font-bold text-slate-500 dark:text-slate-400 block mb-1.5">Irrigation Schedule</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-display font-black text-slate-900 dark:text-slate-100">Scheduled</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-lg bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 font-bold font-mono">12h</span>
            </div>
            <p className="text-[10.5px] text-slate-600 dark:text-slate-400 font-medium mt-1.5 leading-snug">
              Automatic start tonight at 10 PM in Sector C.
            </p>
          </div>

          {/* Fertilizer Recommendation */}
          <div className="p-5 rounded-3xl glass-panel shadow-lg hover:shadow-xl transition-all duration-300">
            <span className="text-[10px] uppercase font-mono font-bold text-slate-500 dark:text-slate-400 block mb-1.5">Fertilizer Application</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-display font-black text-slate-900 dark:text-slate-100">Pre-Rain</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold font-mono">Urea</span>
            </div>
            <p className="text-[10.5px] text-slate-600 dark:text-slate-400 font-medium mt-1.5 leading-snug">
              Apply 15kg/acre Nitrogen in Meadows prior to rain.
            </p>
          </div>

          {/* Yield Prediction */}
          <div className="p-5 rounded-3xl glass-panel shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-tr from-emerald-500/5 to-white/40 dark:from-emerald-950/10 dark:to-slate-900/30">
            <span className="text-[10px] uppercase font-mono font-bold text-slate-500 dark:text-slate-400 block mb-1.5">AI Yield Prediction</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-display font-black text-emerald-700 dark:text-emerald-400">64.5 Bu/Ac</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-[10.5px] text-slate-600 dark:text-slate-400 font-medium mt-1.5 leading-snug">
              94% confidence. Exceeds historical average by 8.2%.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
