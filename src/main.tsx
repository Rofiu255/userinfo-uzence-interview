import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // Tailwind CSS imported here
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
