import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ComparatorSelectionProvider } from "./contexts/ComparatorContext";

// Screens
import { Dashboard } from "./screens/Dashboard";
import { Favorites } from "./screens/Favorites";
import { Profile } from "./screens/Profile";
import { ComponentsPage } from "./screens/Components";
import { Configurator } from "./screens/Configurator";
import { Comparator } from "./screens/Comparator";
import { GamingFrame } from "./screens/GamingFrame";
import { Guides } from "./screens/Guides";
import { AccountHome, AlertsPage, BuildsPage, ComparisonsPage, SavedPage } from "./screens/Account";

// Import global styles
import "./tailwind.css";

export const App = () => {
  return (
    <AuthProvider>
      <ComparatorSelectionProvider>
        <Router>
          <Routes>
            {/* Main Routes */}
            <Route path="/" element={<GamingFrame />} />
            <Route path="/configurateur" element={<Configurator />} />
            <Route path="/comparateur" element={<Comparator />} />
            <Route path="/composants" element={<ComponentsPage />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/gaming-frame" element={<GamingFrame />} />
            
            {/* User Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/favoris" element={<Favorites />} />
            <Route path="/profil" element={<Profile />} />
            
            {/* Account Routes */}
            <Route path="/me" element={<AccountHome />} />
            <Route path="/me/saved" element={<SavedPage />} />
            <Route path="/me/comparisons" element={<ComparisonsPage />} />
            <Route path="/me/builds" element={<BuildsPage />} />
            <Route path="/me/alerts" element={<AlertsPage />} />
          </Routes>
        </Router>
      </ComparatorSelectionProvider>
    </AuthProvider>
  );
};
