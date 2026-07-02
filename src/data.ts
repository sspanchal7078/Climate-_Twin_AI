/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  WeatherInfo,
  SoilSensorReadings,
  CropHealth,
  AlertMessage,
  AIRecommendation,
  WeatherHistoryItem,
  SoilMoistureTrendItem,
  CropGrowthMilestone,
  FarmerProfile
} from "./types";

// Current weather status
export const sampleWeather: WeatherInfo = {
  temp: 27.4,
  humidity: 62,
  rainProbability: 78,
  windSpeed: 14.5,
  condition: "Sunny",
  uvIndex: 6
};

// Current soil conditions
export const sampleSoil: SoilSensorReadings = {
  moisturePercent: 38,
  temperatureC: 22.8,
  nitrogenMgKg: 42,
  phosphorusMgKg: 18,
  potassiumMgKg: 135,
  phLevel: 6.5,
  salinityDsm: 1.2
};

// Current crop health metrics
export const sampleCropHealth: CropHealth = {
  status: "Good",
  ndviIndex: 0.74,
  waterRequirementLiters: 1250, // per acre daily
  growthStage: "Flowering",
  cropName: "Organic Wheat (Winter Durum)"
};

// Farm Map Zones details
export interface FarmZone {
  id: string;
  name: string;
  crop: string;
  areaAcres: number;
  health: "Excellent" | "Good" | "Attention" | "Critical";
  soilMoisture: number;
  ndvi: number;
  boundaries: string; // for representation
}

export const farmZones: FarmZone[] = [
  {
    id: "zone-1",
    name: "North Quadrant - Sector A",
    crop: "Organic Wheat",
    areaAcres: 12.5,
    health: "Excellent",
    soilMoisture: 42,
    ndvi: 0.82,
    boundaries: "Top Left Section"
  },
  {
    id: "zone-2",
    name: "Central Meadows - Sector B",
    crop: "Organic Wheat",
    areaAcres: 18.2,
    health: "Good",
    soilMoisture: 38,
    ndvi: 0.74,
    boundaries: "Middle Section"
  },
  {
    id: "zone-3",
    name: "Hillside Slopes - Sector C",
    crop: "Barley (Cover Crop)",
    areaAcres: 9.3,
    health: "Attention",
    soilMoisture: 24,
    ndvi: 0.58,
    boundaries: "Right Section"
  },
  {
    id: "zone-4",
    name: "Southern Basin - Sector D",
    crop: "Soybeans",
    areaAcres: 15.0,
    health: "Excellent",
    soilMoisture: 45,
    ndvi: 0.79,
    boundaries: "Bottom Section"
  }
];

// Sample AI recommendations
export const initialRecommendations: AIRecommendation[] = [
  {
    id: "rec-1",
    priority: "High",
    category: "Watering",
    title: "Schedule Irrigation within Next 12 Hours",
    description: "Soil moisture in Hillside Slopes (Sector C) has declined to 24%, falling below the critical threshold of 28% for Barley in its vegetative stage. Run center pivot for 45 minutes to restore root zone moisture.",
    impactScore: 92,
    recommendedAction: "Irrigate Sector C (45 mins, 850L/acre)",
    status: "pending"
  },
  {
    id: "rec-2",
    priority: "Medium",
    category: "Fertilizer",
    title: "Apply Targeted Nitrogen Fertilizer",
    description: "Recent satellite multispectral imagery indicates a slight decrease in chlorophyll density in Central Meadows (Sector B). Soil sensors register 42 mg/kg Nitrogen. Recommend applying 15 kg/acre of slow-release urea before tomorrow's light rains.",
    impactScore: 84,
    recommendedAction: "Apply urea in Sector B (15kg/acre)",
    status: "pending"
  },
  {
    id: "rec-3",
    priority: "High",
    category: "Weather Prep",
    title: "Prepare Drainage for High Rainfall Expected",
    description: "A precipitation front is converging tomorrow evening, with expected accumulation of 28mm. Ensure retention ditches in the Southern Basin (Sector D) are clear to prevent waterlogging, as clay soil moisture is already at 45%.",
    impactScore: 89,
    recommendedAction: "Inspect and open drainage valves in Southern Basin",
    status: "pending"
  },
  {
    id: "rec-4",
    priority: "Medium",
    category: "Pest Control",
    title: "Monitor Central Meadows for Wheat Rust",
    description: "Climate Twin local relative humidity of 62% combined with 27.4°C temperature profile aligns with high-probability spore germination conditions for Puccinia graminis. Inspect crop undersides in morning.",
    impactScore: 76,
    recommendedAction: "Scout Sector B and deploy sentinel cameras",
    status: "pending"
  },
  {
    id: "rec-5",
    priority: "Low",
    category: "Harvesting",
    title: "Optimize Harvesting Window Prediction",
    description: "Winter Durum Wheat growth curve model forecasts physiological maturity on July 24th, 2026. Based on long-range climate indicators, the optimal harvesting window is dry spell of July 25-28.",
    impactScore: 68,
    recommendedAction: "Reserve harvester slot for July 26-27",
    status: "pending"
  },
  {
    id: "rec-6",
    priority: "High",
    category: "Pest Control",
    title: "Biological Pest Release",
    description: "Pest model predicts minor infestation of aphids. Suggest releasing 5,000 native ladybugs in Sector A to preserve organic status instead of chemical spray.",
    impactScore: 81,
    recommendedAction: "Release Aphidius wasp / Ladybugs in Sector A",
    status: "applied"
  }
];

// Initial active alerts
export const initialAlerts: AlertMessage[] = [
  {
    id: "alert-1",
    type: "danger",
    title: "Heavy Rainfall warning",
    message: "National weather bureau reports convective storms approaching from West-Northwest. Localized rainfall intensity could reach 15mm/hr tomorrow afternoon with potential hail risks.",
    time: "30 mins ago",
    category: "Weather",
    acknowledged: false
  },
  {
    id: "alert-2",
    type: "warning",
    title: "Extreme Heatwave alert",
    message: "Regional temperatures are forecast to exceed 38.5°C over three consecutive days starting Thursday. Evapotranspiration rates will double.",
    time: "2 hours ago",
    category: "Weather",
    acknowledged: false
  },
  {
    id: "alert-3",
    type: "danger",
    title: "Critical low Soil Moisture",
    message: "Hillside Slopes (Sector C) moisture sensor dipped to 24%. High solar radiation and wind speeds are accelerating plant stress. Immediate action suggested.",
    time: "4 hours ago",
    category: "Soil",
    acknowledged: false
  },
  {
    id: "alert-4",
    type: "warning",
    title: "High Wind Speed gusts",
    message: "Sustained winds exceeding 35 km/h with gusts up to 55 km/h predicted tonight. Ensure lightweight high-tunnel covers and windbreaks are secured.",
    time: "6 hours ago",
    category: "Weather",
    acknowledged: false
  },
  {
    id: "alert-5",
    type: "warning",
    title: "Aphid Pest risk elevated",
    message: "Microclimate thermal index is in the peak zone for aphid incubation. Neighboring farms report active swarms. Set sticky traps around Sector B.",
    time: "1 day ago",
    category: "Pest",
    acknowledged: false
  },
  {
    id: "alert-6",
    type: "info",
    title: "Watering system cycle success",
    message: "Irrigation cycle for Sector A completed successfully. 12,000 Liters applied, increasing soil moisture from 34% to 42%.",
    time: "12 hours ago",
    category: "Irrigation",
    acknowledged: true
  }
];

// Weather history and predictions (for charts)
export const weatherHistory: WeatherHistoryItem[] = [
  { day: "Mon", tempMin: 18, tempMax: 26, rainMm: 0.0, humidity: 58 },
  { day: "Tue", tempMin: 19, tempMax: 28, rainMm: 1.2, humidity: 62 },
  { day: "Wed", tempMin: 21, tempMax: 29, rainMm: 24.5, humidity: 82 }, // Storm day
  { day: "Thu", tempMin: 22, tempMax: 32, rainMm: 4.0, humidity: 75 },
  { day: "Fri", tempMin: 23, tempMax: 35, rainMm: 0.0, humidity: 55 },
  { day: "Sat", tempMin: 24, tempMax: 38, rainMm: 0.0, humidity: 48 }, // Heatwave start
  { day: "Sun", tempMin: 24, tempMax: 37, rainMm: 0.0, humidity: 50 }
];

// Soil moisture levels across 3 sensor depths over the week
export const soilMoistureTrend: SoilMoistureTrendItem[] = [
  { time: "Mon", depth10cm: 42, depth30cm: 45, depth60cm: 48 },
  { time: "Tue", depth10cm: 39, depth30cm: 44, depth60cm: 48 },
  { time: "Wed", depth10cm: 58, depth30cm: 52, depth60cm: 50 }, // Refreshed by Wednesday storm
  { time: "Thu", depth10cm: 48, depth30cm: 49, depth60cm: 49 },
  { time: "Fri", depth10cm: 40, depth30cm: 46, depth60cm: 49 },
  { time: "Sat", depth10cm: 33, depth30cm: 42, depth60cm: 48 },
  { time: "Sun", depth10cm: 28, depth30cm: 38, depth60cm: 47 }
];

// Crop development milestones
export const cropMilestones: CropGrowthMilestone[] = [
  { stage: "Germination & Seedling", durationDays: 14, progressPercent: 100, healthRating: 95 },
  { stage: "Tillering Stage", durationDays: 25, progressPercent: 100, healthRating: 92 },
  { stage: "Stem Elongation", durationDays: 30, progressPercent: 100, healthRating: 88 },
  { stage: "Booting & Heading", durationDays: 20, progressPercent: 100, healthRating: 90 },
  { stage: "Flowering (Anthesis)", durationDays: 15, progressPercent: 80, healthRating: 94 }, // Current active stage
  { stage: "Grain Filling & Ripening", durationDays: 30, progressPercent: 0, healthRating: 0 }
];

// Standard profile settings
export const defaultProfile: FarmerProfile = {
  name: "Alexander Mercer",
  farmName: "Greenwood Digital Acres",
  location: "Pacific Northwest Foothills, USA (Zone 8b)",
  cropType: "Winter Durum Wheat & Premium Soybean",
  farmArea: 55,
  language: "English",
  darkMode: false,
  currency: "USD ($)"
};
