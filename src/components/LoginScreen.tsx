/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Sprout, 
  Lock, 
  Mail, 
  ArrowRight, 
  Cpu, 
  CloudSun, 
  MapPin, 
  Database,
  Eye,
  EyeOff,
  Globe,
  Leaf
} from "lucide-react";

interface LoginScreenProps {
  onLoginSuccess: (farmerName: string) => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [email, setEmail] = useState("alexander.mercer@greenwood.io");
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [signUpName, setSignUpName] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all credentials");
      return;
    }
    setLoading(true);
    setError("");
    
    // Simulate minor network delay for high fidelity prototype
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(isSignUp && signUpName ? signUpName : "Alexander Mercer");
    }, 1000);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-gradient-to-br from-green-50 via-emerald-100 to-blue-200 select-none">
      {/* Decorative agronomy tech grid overlay */}
      <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Dynamic tech-grid connections visual overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="10%" y1="20%" x2="40%" y2="50%" stroke="#059669" strokeWidth="1.5" strokeDasharray="5,5" />
          <line x1="90%" y1="80%" x2="60%" y2="50%" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="5,5" />
          <line x1="20%" y1="80%" x2="50%" y2="30%" stroke="#059669" strokeWidth="1.5" />
          <circle cx="40%" cy="50%" r="5" fill="#059669" />
          <circle cx="60%" cy="50%" r="5" fill="#0284c7" />
          <circle cx="50%" cy="30%" r="4" fill="#059669" />
        </svg>
      </div>

      <div className="relative w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left column - Value proposition / application pitch */}
        <div className="lg:col-span-7 text-slate-800 space-y-6 text-left p-4 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 border border-white/60 text-emerald-800 text-xs font-semibold shadow-xs backdrop-blur-md">
            <Cpu className="w-4 h-4 text-emerald-600 animate-spin-slow" />
            <span>Digital twin IoT infrastructure active</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight leading-none bg-gradient-to-r from-emerald-800 via-teal-700 to-sky-800 bg-clip-text text-transparent">
            Climate Twin AI
          </h1>
          
          <p className="text-base sm:text-lg text-slate-600 max-w-lg font-medium leading-relaxed">
            Empower your agricultural strategy with our real-time Digital Climate Twin. Monitor microclimates, optimize resources, predict diseases, and boost yield through AI-driven telemetry.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 max-w-lg">
            <div className="p-5 rounded-2xl bg-white/40 border border-white/60 backdrop-blur-lg space-y-2 shadow-xs hover:shadow-md transition-shadow">
              <CloudSun className="w-6 h-6 text-sky-600" />
              <h3 className="font-bold text-slate-950 text-sm">Hyper-local Weather</h3>
              <p className="text-xs text-slate-500 font-medium">Predictive storm & rain radar modeling down to the meter.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/40 border border-white/60 backdrop-blur-lg space-y-2 shadow-xs hover:shadow-md transition-shadow">
              <Database className="w-6 h-6 text-emerald-600" />
              <h3 className="font-bold text-slate-950 text-sm">Sub-soil IoT Sensors</h3>
              <p className="text-xs text-slate-500 font-medium">Real-time deep root soil chemistry monitoring (N-P-K & Moisture).</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-[11px] text-slate-500 font-bold font-mono pt-2">
            <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-emerald-600" /> Zone 8b Precision</span>
            <span className="flex items-center gap-1.5"><Leaf className="w-3.5 h-3.5 text-emerald-600" /> 100% Organic Wheat Model</span>
          </div>
        </div>

        {/* Right column - Clean glassmorphic Login form */}
        <div className="lg:col-span-5 w-full z-10" id="login-form-container">
          <div className="w-full rounded-3xl bg-white/40 border border-white/60 backdrop-blur-xl p-8 shadow-2xl relative">
            {/* Soft decorative glow behind form */}
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-emerald-400/20 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-sky-400/20 rounded-full blur-xl" />

            <div className="flex flex-col items-center text-center space-y-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-sky-500 flex items-center justify-center text-white shadow-lg shadow-emerald-600/20">
                <Sprout className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-extrabold text-slate-900 tracking-tight">
                  {isSignUp ? "Create Farm Twin Account" : "Access Farm Twin"}
                </h2>
                <p className="text-xs text-slate-500 font-semibold mt-1">
                  {isSignUp ? "Register your IoT sensors and fields" : "Smart agriculture dashboard login"}
                </p>
              </div>
            </div>

            {error && (
              <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-xs font-semibold text-left">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              {isSignUp && (
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Farmer Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full pl-9 pr-3 py-2 text-slate-800 bg-white/60 border border-white/80 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-xs"
                      placeholder="e.g. Alexander Mercer"
                      value={signUpName}
                      onChange={(e) => setSignUpName(e.target.value)}
                      required
                    />
                    <Sprout className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Registered Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    className="w-full pl-9 pr-3 py-2 text-slate-800 bg-white/60 border border-white/80 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-xs"
                    placeholder="alexander.mercer@greenwood.io"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Password
                  </label>
                  {!isSignUp && (
                    <a href="#" className="text-xs text-emerald-700 hover:underline font-bold">
                      Forgot?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-9 pr-10 py-2 text-slate-800 bg-white/60 border border-white/80 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-xs"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {!isSignUp && (
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    defaultChecked 
                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                  />
                  <label htmlFor="remember" className="text-xs text-slate-500 select-none font-medium">
                    Remember my farm station node
                  </label>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{isSignUp ? "Generate Twin Profile" : "Connect Dashboard"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-white/60 flex flex-col items-center gap-3">
              <button
                onClick={() => {
                  setError("");
                  setIsSignUp(!isSignUp);
                }}
                className="text-xs text-slate-600 hover:text-emerald-800 font-bold"
              >
                {isSignUp ? "Already have a twin? Sign In" : "Don't have sensors yet? Request Setup"}
              </button>

              <button
                onClick={() => {
                  setEmail("alexander.mercer@greenwood.io");
                  setPassword("pass123");
                  onLoginSuccess("Alexander Mercer");
                }}
                className="w-full py-2 px-3 rounded-xl bg-white/60 hover:bg-white border border-white/80 text-emerald-800 hover:border-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
              >
                <Cpu className="w-3.5 h-3.5 text-emerald-600" />
                <span>Demo Fast-Pass (Instant Access)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
