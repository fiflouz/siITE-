import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { ComparatorSelectionProvider } from "./contexts/ComparatorContext";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <ComparatorSelectionProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ComparatorSelectionProvider>
  </StrictMode>,
);
