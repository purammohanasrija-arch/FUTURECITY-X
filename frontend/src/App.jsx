import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CityProvider } from './context/CityContext';
import { DashboardLayout } from './layouts/DashboardLayout';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardOverview } from './pages/DashboardOverview';
import { City3DView } from './pages/City3DView';
import { TrafficCenter } from './pages/TrafficCenter';
import { EnergyCenter } from './pages/EnergyCenter';
import { WaterCenter } from './pages/WaterCenter';
import { WasteCenter } from './pages/WasteCenter';
import { TransportCenter } from './pages/TransportCenter';
import { EnvironmentCenter } from './pages/EnvironmentCenter';
import { PublicSafetyCenter } from './pages/PublicSafetyCenter';
import { InfrastructureCenter } from './pages/InfrastructureCenter';
import { SimulationLab } from './pages/SimulationLab';
import { AnalyticsCenter } from './pages/AnalyticsCenter';
import { SettingsPage } from './pages/SettingsPage';
import { AdminCenter } from './pages/AdminCenter';
import { AIAssistantPage } from './pages/AIAssistantPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CityProvider>
          <Routes>
            {/* Public Landing & Authentication */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Application Dashboard Shell */}
            <Route path="/app" element={<DashboardLayout />}>
              <Route index element={<DashboardOverview />} />
              <Route path="3d-city" element={<City3DView />} />
              <Route path="traffic" element={<TrafficCenter />} />
              <Route path="energy" element={<EnergyCenter />} />
              <Route path="water" element={<WaterCenter />} />
              <Route path="waste" element={<WasteCenter />} />
              <Route path="transport" element={<TransportCenter />} />
              <Route path="environment" element={<EnvironmentCenter />} />
              <Route path="public-safety" element={<PublicSafetyCenter />} />
              <Route path="infrastructure" element={<InfrastructureCenter />} />
              <Route path="simulation-lab" element={<SimulationLab />} />
              <Route path="analytics" element={<AnalyticsCenter />} />
              <Route path="incidents" element={<PublicSafetyCenter />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="admin" element={<AdminCenter />} />
              <Route path="ai-assistant" element={<AIAssistantPage />} />
            </Route>

            {/* Fallback Catch-All */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </CityProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
