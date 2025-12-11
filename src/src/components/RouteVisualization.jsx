import React from "react";

const RouteVisualization = ({ distance, optimalSpeed, traffic, t }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 shadow-xl hover:border-gray-600/50 transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">{t.routeViz}</h3>
        {traffic >= 1.3 && (
          <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded-full border border-red-500/50">
            🚦 {t.highTraffic}
          </span>
        )}
      </div>

      <div className="relative h-48 flex items-center justify-center mb-4">
        <svg className="w-full h-full" viewBox="0 0 400 150">
          <defs>
            <linearGradient
              id="routeGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>

          <path
            d="M 50 75 Q 200 20 350 75"
            stroke="url(#routeGradient)"
            strokeWidth="4"
            fill="none"
            strokeDasharray="10,5"
          />

          <circle
            cx="50"
            cy="75"
            r="22"
            fill="#f97316"
            className="drop-shadow-lg"
          />
          <text x="50" y="80" textAnchor="middle" fill="white" fontSize="22">
            🏪
          </text>

          <circle
            cx="350"
            cy="75"
            r="22"
            fill="#10b981"
            className="drop-shadow-lg"
          />
          <text x="350" y="80" textAnchor="middle" fill="white" fontSize="22">
            🏠
          </text>
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4 text-center text-sm">
        <div className="p-3 bg-gray-700/30 rounded-xl">
          <p className="text-gray-400 text-xs mb-1">{t.origin}</p>
          <p className="font-semibold text-orange-400">{t.restaurant}</p>
        </div>
        <div className="p-3 bg-gray-700/30 rounded-xl">
          <p className="text-gray-400 text-xs mb-1">{t.distanceLabel}</p>
          <p className="font-bold text-xl text-white">{distance} km</p>
        </div>
        <div className="p-3 bg-gray-700/30 rounded-xl">
          <p className="text-gray-400 text-xs mb-1">{t.destination}</p>
          <p className="font-semibold text-green-400">{t.client}</p>
        </div>
      </div>

      <div className="p-4 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/30 rounded-xl text-center backdrop-blur-sm">
        <p className="text-xs text-gray-400 mb-1">⚡ {t.recommendedSpeed}</p>
        <p className="text-2xl font-bold text-orange-400">
          {optimalSpeed.toFixed(0)} km/h
        </p>
      </div>
    </div>
  );
};

export default RouteVisualization;
