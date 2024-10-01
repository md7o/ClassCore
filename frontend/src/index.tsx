import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./utils/i18n";

// Get the root element
const rootElement = document.getElementById("root");

if (rootElement) {
  // Ensure rootElement is not null before calling createRoot
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
