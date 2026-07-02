/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface WeatherInfo {
  temp: number;
  humidity: number;
  rainProbability: number;
  windSpeed: number;
  condition: "Sunny" | "Cloudy" | "Raining" | "Stormy" | "Windy";
  uvIndex: number;
}

export interface SoilSensorReadings {
  moisturePercent: number;
  temperatureC: number;
  nitrogenMgKg: number;
  phosphorusMgKg: number;
  potassiumMgKg: number;
  phLevel: number;
  salinityDsm: number;
}

export interface CropHealth {
  status: "Excellent" | "Good" | "Needs Attention" | "Critical";
  ndviIndex: number; // Normalized Difference Vegetation Index
  waterRequirementLiters: number;
  growthStage: "Germination" | "Vegetative" | "Flowering" | "Ripening" | "Harvesting";
  cropName: string;
}

export interface AlertMessage {
  id: string;
  type: "warning" | "danger" | "info" | "success";
  title: string;
  message: string;
  time: string;
  category: "Weather" | "Soil" | "Pest" | "Irrigation";
  acknowledged: boolean;
}

export interface AIRecommendation {
  id: string;
  priority: "High" | "Medium" | "Low";
  category: "Watering" | "Fertilizer" | "Pest Control" | "Harvesting" | "Weather Prep";
  title: string;
  description: string;
  impactScore: number; // out of 100
  recommendedAction: string;
  status: "pending" | "applied" | "ignored";
}

export interface WeatherHistoryItem {
  day: string;
  tempMin: number;
  tempMax: number;
  rainMm: number;
  humidity: number;
}

export interface SoilMoistureTrendItem {
  time: string; // E.g., "Mon", "Tue"
  depth10cm: number;
  depth30cm: number;
  depth60cm: number;
}

export interface CropGrowthMilestone {
  stage: string;
  durationDays: number;
  progressPercent: number;
  healthRating: number; // 0-100
}

export interface FarmerProfile {
  name: string;
  farmName: string;
  location: string;
  cropType: string;
  farmArea: number; // in acres
  language: string;
  darkMode: boolean;
  currency: string;
}
