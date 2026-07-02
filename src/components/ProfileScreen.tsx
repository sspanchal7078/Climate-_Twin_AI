/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  User, 
  MapPin, 
  Sprout, 
  Layers, 
  Globe, 
  Moon, 
  Sun, 
  LogOut, 
  Cpu, 
  Check, 
  Save, 
  ShieldCheck,
  RefreshCw
} from "lucide-react";
import { defaultProfile } from "../data";
import { FarmerProfile } from "../types";

interface ProfileScreenProps {
  farmerName: string;
  setFarmerName: (name: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onLogout: () => void;
}

export default function ProfileScreen({ 
  farmerName, 
  setFarmerName, 
  darkMode, 
  onToggleDarkMode, 
  onLogout 
}: ProfileScreenProps) {
  
  const [profile, setProfile] = useState<FarmerProfile>({
    ...defaultProfile,
    name: farmerName
  });
  const [isSaved, setIsSaved] = useState(false);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrationSuccess, setCalibrationSuccess] = useState(false);

  // Form saving handler
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setFarmerName(profile.name);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  // Station Node Calibration trigger simulation
  const handleCalibrate = () => {
    setIsCalibrating(true);
    setCalibrationSuccess(false);
    setTimeout(() => {
      setIsCalibrating(false);
      setCalibrationSuccess(true);
      setTimeout(() => setCalibrationSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100 pb-10 text-left">
      
      {/* Header Panel */}
      <div className="bg-white/40 dark:bg-slate-900/40 p-6 rounded-3xl border border-white/60 dark:border-white/10 shadow-lg backdrop-blur-xl">
        <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-slate-900 dark:text-white">
          Twin Station Profile & Configurations
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
          Configure sub-soil IoT transceivers, farm parameters, telemetry units, and customize dashboard views.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Avatar Display & Node Settings */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Avatar Card */}
          <div className="rounded-3xl glass-panel p-6 shadow-lg border border-white/60 dark:border-white/10 text-center relative overflow-hidden">
            {/* Ambient accent bubble */}
            <div className="absolute -top-12 -left-12 w-24 h-24 bg-emerald-500/15 rounded-full blur-xl animate-pulse" />
            <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-sky-500/15 rounded-full blur-xl animate-pulse" />

            <div className="relative mx-auto w-24 h-24 rounded-full border-4 border-white dark:border-slate-800 shadow-lg bg-gradient-to-tr from-emerald-500 to-sky-500 flex items-center justify-center text-white mb-4">
              <User className="w-12 h-12" />
              <div className="absolute bottom-0 right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-800 flex items-center justify-center text-white" title="Station Active">
                <Cpu className="w-3 h-3 animate-pulse" />
              </div>
            </div>

            <h3 className="text-xl font-display font-black text-slate-900 dark:text-white tracking-tight">
              {profile.name}
            </h3>
            <p className="text-xs text-emerald-700 font-semibold uppercase tracking-wider mt-0.5">
              Principal Farm Operator
            </p>

            <div className="mt-4 pt-4 border-t border-slate-200/50 space-y-2.5 text-xs text-slate-600 font-mono text-left">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">{profile.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sprout className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">{profile.cropType}</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{profile.farmArea} Registered Acres</span>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="mt-6 w-full py-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 hover:text-rose-800 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Disconnect Twin Terminal</span>
            </button>
          </div>

          {/* IoT Node Sync calibrator */}
          <div className="rounded-2xl glass-panel p-5 shadow-xs border border-white/60">
            <h4 className="font-display font-bold text-slate-800 text-sm mb-1.5 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-emerald-600 animate-spin-slow" />
              <span>IoT Node Hard Synchronization</span>
            </h4>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Recalibrate microclimate temperature and moisture sensors to minimize deviations.
            </p>

            {calibrationSuccess && (
              <div className="p-2.5 mb-3 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Sync Calibration Complete!</span>
              </div>
            )}

            <button
              onClick={handleCalibrate}
              disabled={isCalibrating}
              className="w-full py-2 bg-slate-800 hover:bg-slate-900 disabled:bg-slate-600 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isCalibrating ? "animate-spin" : ""}`} />
              <span>{isCalibrating ? "Calibrating Nodes..." : "Trigger Hard Calibrate"}</span>
            </button>
          </div>

        </div>

        {/* Right Side: Configuration Form */}
        <div className="lg:col-span-8">
          <form onSubmit={handleSave} className="rounded-2xl glass-panel p-6 shadow-sm border border-white/60 bg-white/70 space-y-6">
            
            <div className="border-b border-slate-200/50 pb-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-display font-bold text-slate-800">
                  Farmer Details & Variables
                </h3>
                <p className="text-xs text-slate-500">
                  Modifying fields instantly synchronizes data telemetry across the twin environment.
                </p>
              </div>

              {isSaved && (
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-100 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Saved
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              
              {/* Farmer Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Farmer Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-slate-800 bg-white/60 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  required
                />
              </div>

              {/* Farm Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Farm Corporate Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-slate-800 bg-white/60 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  value={profile.farmName}
                  onChange={(e) => setProfile({ ...profile, farmName: e.target.value })}
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Farm Latitude/Longitude Location
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-slate-800 bg-white/60 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  required
                />
              </div>

              {/* Crop Type */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Active Crop Models
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-slate-800 bg-white/60 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  value={profile.cropType}
                  onChange={(e) => setProfile({ ...profile, cropType: e.target.value })}
                  required
                />
              </div>

              {/* Farm Area */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Farm Area (Acres)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 text-slate-800 bg-white/60 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  value={profile.farmArea}
                  onChange={(e) => setProfile({ ...profile, farmArea: parseInt(e.target.value) || 0 })}
                  required
                />
              </div>

              {/* Language Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  System Language Select
                </label>
                <select
                  className="w-full px-3 py-2 text-slate-800 bg-white/60 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  value={profile.language}
                  onChange={(e) => setProfile({ ...profile, language: e.target.value })}
                >
                  <option value="English">English (US)</option>
                  <option value="Spanish">Español (ES)</option>
                  <option value="French">Français (FR)</option>
                  <option value="German">Deutsch (DE)</option>
                </select>
              </div>

            </div>

            {/* Application Theme settings (Dark Mode) */}
            <div className="pt-4 border-t border-slate-200/50 space-y-4">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Twin Dashboard Preferences
              </h4>

              <div className="flex justify-between items-center bg-slate-50/50 p-3.5 rounded-xl border border-slate-200/30 text-xs text-slate-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-600">
                    {darkMode ? <Moon className="w-4 h-4 text-indigo-500" /> : <Sun className="w-4 h-4 text-amber-500" />}
                  </div>
                  <div>
                    <span className="font-bold block">Application Dark Theme Mode</span>
                    <span className="text-slate-400 text-[10px]">Adjusts interface luminosity for eye safety.</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onToggleDarkMode}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-all duration-300 cursor-pointer ${
                    darkMode ? "bg-emerald-600 justify-end" : "bg-slate-300 justify-start"
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-md" />
                </button>
              </div>
            </div>

            {/* Save Buttons */}
            <div className="pt-4 border-t border-slate-200/50 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Farmer Profile Settings</span>
              </button>
            </div>

          </form>
        </div>

      </div>

    </div>
  );
}
