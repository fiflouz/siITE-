import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GamingFrame } from "./screens/GamingFrame/GamingFrame";
import { Configurator } from "./screens/Configurator/Configurator";
import { Comparator } from "./screens/Comparator/Comparator";
import { Components } from "./screens/Components/Components";
import { Guides } from "./screens/Guides/Guides";

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GamingFrame />} />
        <Route path="/configurateur" element={<Configurator />} />
        <Route path="/comparateur" element={<Comparator />} />
        <Route path="/composants" element={<Components />} />
        <Route path="/guides" element={<Guides />} />
      </Routes>
    </Router>
  );
};
