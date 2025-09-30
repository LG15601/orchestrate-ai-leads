import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/clean.css";

// Protection contre les erreurs d'extensions de navigateur (ex: MetaMask)
window.addEventListener('error', (event) => {
  if (event.message && (
    event.message.includes('ethereum') || 
    event.message.includes('Cannot redefine property') ||
    event.message.includes('evmAsk.js')
  )) {
    event.preventDefault();
    console.warn('Extension de navigateur détectée - erreur ignorée:', event.message);
    return false;
  }
});

// Protection supplémentaire pour les erreurs non capturées
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason && event.reason.message && (
    event.reason.message.includes('ethereum') ||
    event.reason.message.includes('Cannot redefine property')
  )) {
    event.preventDefault();
    console.warn('Erreur d\'extension de navigateur ignorée:', event.reason.message);
  }
});

createRoot(document.getElementById("root")!).render(<App />);
