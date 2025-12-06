import React from "react";
import { Navigation } from "lucide-react";

/**
 * Componente Header
 * Muestra el título de la aplicación y un botón para cambiar el idioma
 *
 * @param {string} language - Idioma actual ('es' o 'en')
 * @param {function} onLanguageChange - Callback para cambiar el idioma
 * @param {object} t - Objeto de traducciones
 */
const Header = ({ language, onLanguageChange, t }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      {/* Logo y título */}
      <div className="flex items-center gap-3">
        <div className="bg-orange-500 p-3 rounded-lg">
          <Navigation className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{t.title}</h1>
          <p className="text-gray-400 text-sm">{t.subtitle}</p>
        </div>
      </div>

      {/* Selector de idioma */}
      <button
        onClick={onLanguageChange}
        className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200"
        aria-label="Change language"
      >
        {language === "es" ? "🇬🇧 English" : "🇪🇸 Español"}
      </button>
    </div>
  );
};

export default Header;
