import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { contactLinks } from "./content/index.js";
import "./styles.css";
import "./typography.css";
import "./upgrade.css";
import "./story.css";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jakob Olsen",
  alternateName: "Khaled Al-Asaad",
  jobTitle: "Renewable Energy & Data Intelligence Analyst",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Oslo",
    addressCountry: "NO",
  },
  knowsLanguage: ["en", "ar", "no", "fr"],
  sameAs: contactLinks.filter((link) => !link.url.startsWith("mailto:")).map((link) => link.url),
  url: "https://khaled-portfolio-ecru.vercel.app/",
};

const schemaElement = document.getElementById("person-schema");
if (schemaElement) schemaElement.textContent = JSON.stringify(personSchema);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
