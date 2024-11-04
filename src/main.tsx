import { createRoot } from "react-dom/client";
import amplifyConfig from "@/amplifyConfig.ts";
import App from "@/App.tsx";
import "@/styles/global.css"

amplifyConfig()

createRoot(document.getElementById("root")!).render(
  <App />
);
