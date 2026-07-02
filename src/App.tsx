/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Sprout, 
  LayoutDashboard, 
  TrendingUp, 
  Bell, 
  Sparkles, 
  User, 
  Moon, 
  Sun, 
  LogOut, 
  Menu, 
  X,
  Cpu,
  Globe
} from "lucide-react";

// Import Screens
import LoginScreen from "./components/LoginScreen";
import DashboardScreen from "./components/DashboardScreen";
import AnalyticsScreen from "./components/AnalyticsScreen";
import AlertsScreen from "./components/AlertsScreen";
import RecommendationsScreen from "./components/RecommendationsScreen";
import ProfileScreen from "./components/ProfileScreen";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [farmerName, setFarmerName] = useState<string>("Alexander Mercer");
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Quick logout trigger
  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab("dashboard");
  };

  const handleLoginSuccess = (name: string) => {
    setFarmerName(name);
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className={`min-h-screen transition-all duration-300 font-sans ${
      darkMode 
        ? "dark bg-gradient-to-br from-slate-950 via-emerald-950/40 to-blue-950/50 text-slate-100" 
        : "bg-gradient-to-br from-green-50 via-emerald-100 to-blue-200 text-slate-800"
    }`}>
      
      {/* Top Glassmorphic Navigation Bar */}
      <header className="sticky top-0 z-50 w-full bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border-b border-white/40 dark:border-white/10 shadow-lg shadow-slate-900/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* App Branding Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-sky-500 flex items-center justify-center text-white shadow-lg shadow-emerald-600/20 shrink-0">
                <Sprout className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-black text-lg tracking-tight bg-gradient-to-r from-emerald-800 via-teal-800 to-sky-800 dark:from-emerald-300 dark:via-teal-200 dark:to-sky-300 bg-clip-text text-transparent">
                    Climate Twin AI
                  </span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 uppercase tracking-widest font-mono">PRO</span>
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block -mt-0.5">Smart Agriculture Cockpit</span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex space-x-1.5">
              {[
                { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
                { id: "analytics", label: "Crop Analytics", icon: <TrendingUp className="w-4 h-4" /> },
                { id: "recommendations", label: "AI Recommendations", icon: <Sparkles className="w-4 h-4" /> },
                { id: "alerts", label: "Alert Center", icon: <Bell className="w-4 h-4" /> },
                { id: "profile", label: "Twin Profile", icon: <User className="w-4 h-4" /> }
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      isActive 
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 border border-emerald-500/30" 
                        : "text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white border border-transparent hover:border-white/40 dark:hover:border-white/10"
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* User Details & Theme Shortcut */}
            <div className="hidden md:flex items-center gap-3">
              {/* Quick Dark Mode toggle shortcut */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-md text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60 border border-white/50 dark:border-white/10 transition-colors cursor-pointer shadow-sm"
                title="Toggle visual mode"
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
              </button>

              <div className="flex items-center gap-2 pl-2 border-l border-white/40 dark:border-white/10 text-left">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 to-emerald-400 flex items-center justify-center text-white text-xs font-bold font-mono shadow-sm">
                  AM
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block truncate max-w-28">{farmerName}</span>
                  <span className="text-[9px] text-slate-500 dark:text-slate-400 font-mono block -mt-0.5">Pacific NW (Zone 8)</span>
                </div>
              </div>
            </div>

            {/* Mobile Hamburger Menu button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-1.5 rounded-xl bg-white/40 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 border border-white/50 dark:border-white/10 cursor-pointer"
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-800/40 border border-transparent hover:border-white/40 dark:hover:border-white/10 focus:outline-none cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg px-4 pt-2 pb-4 space-y-1 text-left animate-slide-down">
            {[
              { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
              { id: "analytics", label: "Crop Analytics", icon: <TrendingUp className="w-4 h-4" /> },
              { id: "recommendations", label: "AI Recommendations", icon: <Sparkles className="w-4 h-4" /> },
              { id: "alerts", label: "Alert Center", icon: <Bell className="w-4 h-4" /> },
              { id: "profile", label: "Twin Profile", icon: <User className="w-4 h-4" /> }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive 
                      ? "bg-emerald-600 text-white" 
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}

            {/* Logout shortcut */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Disconnect Session</span>
            </button>
          </div>
        )}
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Render screens based on state */}
        {activeTab === "dashboard" && (
          <DashboardScreen 
            farmerName={farmerName} 
            onNavigateToTab={(tabId) => setActiveTab(tabId)} 
          />
        )}
        {activeTab === "analytics" && <AnalyticsScreen />}
        {activeTab === "recommendations" && <RecommendationsScreen />}
        {activeTab === "alerts" && <AlertsScreen />}
        {activeTab === "profile" && (
          <ProfileScreen
            farmerName={farmerName}
            setFarmerName={setFarmerName}
            darkMode={darkMode}
            onToggleDarkMode={() => setDarkMode(!darkMode)}
            onLogout={handleLogout}
          />
        )}

      </main>

      {/* Aesthetic Footer */}
      <footer className="py-6 border-t border-slate-200/40 dark:border-slate-800/40 bg-white/20 dark:bg-slate-950/20 backdrop-blur-xs text-xs text-slate-400 dark:text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span>Climate Twin AI Terminal • Stable connection v2.4</span>
          </div>
          <div>
            © 2026 Greenwood Agritech Systems Inc. • All Telemetry Secure
          </div>
        </div>
      </footer>

    </div>
  );
}
