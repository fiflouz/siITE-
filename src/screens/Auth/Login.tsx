import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const Login: React.FC = () => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = await login(email, password);
    if (!success) setError("Identifiants invalides");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0E0E10]">
      <form onSubmit={handleSubmit} className="bg-[#1a1a1a] p-8 rounded-xl shadow-lg w-full max-w-sm border border-white/10">
        <h2 className="text-2xl font-bold text-[#F5F5F7] mb-6 text-center">Connexion</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-[#23232b] text-white border border-white/10 focus:outline-none"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-[#23232b] text-white border border-white/10 focus:outline-none"
          required
        />
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-[#4A90E2] to-[#5BA3F5] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          disabled={isLoading}
        >
          {isLoading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
};

export { Login };
