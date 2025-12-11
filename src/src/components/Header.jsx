import { Navigation } from "lucide-react";

const Header = ({ language, onLanguageChange, t }) => {
  return (
    <div className="max-w-7xl mx-auto mb-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl shadow-lg shadow-orange-500/30">
            <Navigation className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-gray-400 text-sm mt-1">{t.subtitle}</p>
          </div>
        </div>

        <button
          onClick={onLanguageChange}
          className="px-5 py-2.5 bg-gray-800/80 backdrop-blur-sm rounded-xl hover:bg-gray-700 transition-all duration-200 border border-gray-700 hover:border-gray-600 hover:shadow-lg"
          aria-label="Change language"
        >
          {language === "es" ? "🇬🇧 English" : "🇪🇸 Español"}
        </button>
      </div>
    </div>
  );
};

export default Header;
