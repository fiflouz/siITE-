import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Dashboard } from "./screens/Dashboard";
import { Favorites } from "./screens/Favorites";
import { Profile } from "./screens/Profile";
import { ComponentsPage } from "./screens/Components";
import "./tailwind.css";

// Page d'accueil simplifiée
const HomePage = () => (
  <div className="min-h-screen bg-[#0E0E10] relative overflow-hidden">
    {/* Background Grid */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(74, 144, 226, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(74, 144, 226, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '30px 30px'
      }}
    />

    {/* Header avec navigation simplifiée */}
    <div className="fixed top-8 left-0 right-0 z-50 flex justify-center">
      <div className="flex items-center gap-8 px-12 py-4 border border-white/10 bg-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl">
        <div className="flex items-center gap-3 text-[#F5F5F7]">
          <div className="w-8 h-8 bg-gradient-to-br from-[#4A90E2] to-[#5BA3F5] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          <span className="text-xl font-bold tracking-tight">siITE</span>
        </div>
      </div>
    </div>

    {/* Hero Section */}
    <div className="flex items-center justify-center min-h-screen pt-24">
      <div className="text-center max-w-4xl mx-auto px-6">
        <h1 className="text-5xl md:text-7xl font-bold text-[#F5F5F7] mb-6">
          Bienvenue sur
          <br />
          <span className="bg-gradient-to-r from-[#4A90E2] to-[#5BA3F5] bg-clip-text text-transparent">
            siITE
          </span>
        </h1>
        <p className="text-xl text-[#A1A1AA] max-w-2xl mx-auto mb-12">
          Votre plateforme de configuration PC Gaming avec système de fidélisation intégré
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="bg-[#1a1a1a]/80 backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-gradient-to-br from-[#4A90E2] to-[#5BA3F5] rounded-lg flex items-center justify-center mb-4 mx-auto">
              <span className="text-white text-xl">📊</span>
            </div>
            <h3 className="text-lg font-bold text-[#F5F5F7] mb-2">Dashboard</h3>
            <p className="text-[#A1A1AA] text-sm">Suivez vos statistiques et votre activité</p>
          </div>

          <div className="bg-[#1a1a1a]/80 backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-gradient-to-br from-[#4A90E2] to-[#5BA3F5] rounded-lg flex items-center justify-center mb-4 mx-auto">
              <span className="text-white text-xl">❤️</span>
            </div>
            <h3 className="text-lg font-bold text-[#F5F5F7] mb-2">Favoris</h3>
            <p className="text-[#A1A1AA] text-sm">Gérez vos composants préférés</p>
          </div>

          <div className="bg-[#1a1a1a]/80 backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-gradient-to-br from-[#4A90E2] to-[#5BA3F5] rounded-lg flex items-center justify-center mb-4 mx-auto">
              <span className="text-white text-xl">⚙️</span>
            </div>
            <h3 className="text-lg font-bold text-[#F5F5F7] mb-2">Profil</h3>
            <p className="text-[#A1A1AA] text-sm">Personnalisez vos paramètres</p>
          </div>
        </div>

        <div className="mt-12">
          <p className="text-[#A1A1AA]">
            ✅ Système de fidélisation entièrement fonctionnel<br />
            ✅ Authentification et gestion utilisateur<br />
            ✅ Dashboard, Favoris et Profil opérationnels
          </p>
        </div>
      </div>
    </div>
  </div>
);

// Page de substitution pour les routes non disponibles
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="min-h-screen bg-[#0E0E10] flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-[#F5F5F7] mb-4">{title}</h1>
      <p className="text-[#A1A1AA]">Cette page sera bientôt disponible</p>
      <p className="text-[#A1A1AA]">En attendant, testez le système de fidélisation !</p>
    </div>
  </div>
);

export const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/favoris" element={<Favorites />} />
          <Route path="/profil" element={<Profile />} />
          <Route path="/composants" element={<ComponentsPage />} />
          <Route path="/configurateur" element={<PlaceholderPage title="Configurateur" />} />
          <Route path="/comparateur" element={<PlaceholderPage title="Comparateur" />} />
          <Route path="/guides" element={<PlaceholderPage title="Guides" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};
