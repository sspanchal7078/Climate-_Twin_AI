/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  AlertTriangle, 
  Bell, 
  BellOff, 
  Check, 
  CheckCircle, 
  CloudRain, 
  Droplets, 
  Flame, 
  Info, 
  ShieldAlert, 
  SlidersHorizontal, 
  Wind,
  Bug,
  Cpu
} from "lucide-react";
import { initialAlerts } from "../data";
import { AlertMessage } from "../types";

export default function AlertsScreen() {
  const [alerts, setAlerts] = useState<AlertMessage[]>(initialAlerts);
  const [filterType, setFilterType] = useState<string>("All"); // All, Active, Acknowledged
  const [filterCategory, setFilterCategory] = useState<string>("All"); // All, Weather, Soil, Pest, Irrigation

  // Interaction: Acknowledge an alert
  const handleAcknowledge = (id: string) => {
    setAlerts(prev =>
      prev.map(alert => alert.id === id ? { ...alert, acknowledged: true } : alert)
    );
  };

  // Interaction: Acknowledge all alerts
  const handleAcknowledgeAll = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, acknowledged: true })));
  };

  // Filter alerts based on active UI selections
  const filteredAlerts = alerts.filter(alert => {
    const matchesType = 
      filterType === "All" || 
      (filterType === "Active" && !alert.acknowledged) || 
      (filterType === "Acknowledged" && alert.acknowledged);
      
    const matchesCategory = 
      filterCategory === "All" || 
      alert.category === filterCategory;

    return matchesType && matchesCategory;
  });

  const activeCount = alerts.filter(a => !a.acknowledged).length;

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100 pb-10 text-left">
      
      {/* Header Panel */}
      <div className="bg-white/40 dark:bg-slate-900/40 p-6 rounded-3xl border border-white/60 dark:border-white/10 shadow-lg backdrop-blur-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 dark:bg-rose-950/40 px-2.5 py-1 rounded-full border border-rose-100 dark:border-rose-900/55 uppercase tracking-wider mb-2">
            <Bell className="w-3.5 h-3.5 text-rose-500 animate-swing" />
            <span>Telemetry Alerts Active</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-slate-900 dark:text-white">
            Smart Farm Alert Center
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Real-time notifications triggered by IoT sensory threshold crossings and localized weather microclimate models.
          </p>
        </div>

        {activeCount > 0 ? (
          <button
            onClick={handleAcknowledgeAll}
            className="px-4 py-2.5 text-xs font-bold rounded-xl bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-900 dark:hover:bg-white transition-all shadow-lg flex items-center gap-2 cursor-pointer border border-transparent dark:border-white/10"
          >
            <CheckCircle className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
            <span>Mute & Acknowledge All ({activeCount})</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 px-4 py-2.5 rounded-xl">
            <Check className="w-4 h-4 text-emerald-500" />
            <span>All sub-systems functioning normally</span>
          </div>
        )}
      </div>

      {/* Control bar */}
      <div className="p-4 rounded-3xl glass-panel shadow-md flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 dark:text-slate-500 mr-1" />
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-2 uppercase tracking-wider">Status Type:</span>
          {[
            { id: "All", label: "All Logs" },
            { id: "Active", label: `Active (${activeCount})` },
            { id: "Acknowledged", label: "Acknowledged" }
          ].map(type => (
            <button
              key={type.id}
              onClick={() => setFilterType(type.id)}
              className={`px-3 py-1.5 text-xs rounded-xl border transition-all cursor-pointer font-bold ${
                filterType === type.id 
                  ? "bg-slate-800 dark:bg-slate-100 border-slate-800 dark:border-slate-100 text-white dark:text-slate-900" 
                  : "bg-white/40 dark:bg-slate-800/40 border-white/60 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white shadow-xs"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <span className="text-xs font-semibold text-slate-500 uppercase mr-1">System Category:</span>
          {["All", "Weather", "Soil", "Pest", "Irrigation"].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 text-xs rounded-md border transition-all cursor-pointer ${
                filterCategory === cat 
                  ? "bg-emerald-600 border-emerald-600 text-white font-medium" 
                  : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Checklist Stack */}
      {filteredAlerts.length === 0 ? (
        <div className="p-16 text-center rounded-2xl glass-panel border border-slate-100 bg-white/40">
          <BellOff className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-700">No Notifications Registered</h3>
          <p className="text-sm text-slate-500 mt-1">There are no flags match the chosen filters. Sub-soil readings are in perfect limits.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAlerts.map((alert) => {
            // Icon configuration
            let alertIcon = <Info className="w-5 h-5" />;
            let borderStyle = "border-sky-100 bg-sky-50/50";
            let leftAccent = "bg-sky-500";
            let textColor = "text-sky-900";
            let descColor = "text-sky-700/80";

            if (alert.type === "danger") {
              alertIcon = <ShieldAlert className="w-5 h-5 text-rose-600" />;
              borderStyle = "border-rose-100 bg-rose-50/30";
              leftAccent = "bg-rose-500";
              textColor = "text-rose-900";
              descColor = "text-rose-700/80";
            } else if (alert.type === "warning") {
              alertIcon = <AlertTriangle className="w-5 h-5 text-amber-600" />;
              borderStyle = "border-amber-100 bg-amber-50/30";
              leftAccent = "bg-amber-500";
              textColor = "text-amber-900";
              descColor = "text-amber-700/80";
            } else if (alert.type === "success") {
              alertIcon = <CheckCircle className="w-5 h-5 text-emerald-600" />;
              borderStyle = "border-emerald-100 bg-emerald-50/30";
              leftAccent = "bg-emerald-500";
              textColor = "text-emerald-900";
              descColor = "text-emerald-700/80";
            }

            // Category icons
            let catTagIcon = null;
            if (alert.category === "Weather") catTagIcon = <CloudRain className="w-3.5 h-3.5 inline mr-1" />;
            else if (alert.category === "Soil") catTagIcon = <Droplets className="w-3.5 h-3.5 inline mr-1" />;
            else if (alert.category === "Pest") catTagIcon = <Bug className="w-3.5 h-3.5 inline mr-1" />;
            else if (alert.category === "Irrigation") catTagIcon = <Cpu className="w-3.5 h-3.5 inline mr-1" />;

            return (
              <div 
                key={alert.id} 
                className={`relative rounded-xl border p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all overflow-hidden ${borderStyle} ${
                  alert.acknowledged ? "opacity-50 border-slate-200 bg-slate-50/50" : "hover:shadow-xs"
                }`}
              >
                {/* Colored left bar */}
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${alert.acknowledged ? "bg-slate-300" : leftAccent}`} />

                <div className="flex items-start gap-3.5 pl-2">
                  <div className="p-2 bg-white rounded-lg border border-slate-200/60 shadow-xs shrink-0">
                    {alertIcon}
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className={`text-sm sm:text-base font-bold ${textColor}`}>
                        {alert.title}
                      </h4>
                      <span className="text-[10px] font-mono bg-white/80 border border-slate-200/50 px-2 py-0.5 rounded text-slate-500 font-bold flex items-center">
                        {catTagIcon}
                        <span>{alert.category}</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{alert.time}</span>
                    </div>
                    <p className={`text-xs ${descColor} leading-relaxed`}>
                      {alert.message}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2 pl-2 md:pl-0">
                  {alert.acknowledged ? (
                    <span className="text-xs text-slate-400 font-medium font-mono flex items-center gap-1 bg-white/50 px-2.5 py-1 rounded border border-slate-100">
                      <Check className="w-3.5 h-3.5 text-slate-400" />
                      <span>Acknowledged</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleAcknowledge(alert.id)}
                      className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-800 hover:text-emerald-700 hover:border-emerald-200 text-xs font-bold shadow-xs hover:shadow-sm transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Resolve & Acknowledge</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Sensor maintenance warning callout */}
      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-600 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
        <div>
          <span className="font-bold text-slate-800 block">Agronomic sensor calibration status</span>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Sensors in Sector C were last calibrated 14 days ago. Automatic diagnostic signals are 100% green. If soil readings seem out-of-sync after high precipitation, trigger standard manual telemetry calibration from your profile page.
          </p>
        </div>
      </div>

    </div>
  );
}
