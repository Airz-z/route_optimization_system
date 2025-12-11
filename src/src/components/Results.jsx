import React from "react";
import { Clock, DollarSign, TrendingUp } from "lucide-react";

const Results = ({
  optimalSpeed,
  minCost,
  costBreakdown,
  estimatedTime,
  maxTime,
  t,
}) => {
  const meetsTimeRestriction = estimatedTime <= maxTime;

  return (
    <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 shadow-xl hover:border-gray-600/50 transition-all duration-300">
      <h2 className="text-xl font-bold mb-6">{t.results}</h2>

      <div className="mb-6 text-center p-6 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-2xl border-2 border-orange-500/50 backdrop-blur-sm shadow-lg shadow-orange-500/20">
        <TrendingUp className="w-12 h-12 mx-auto mb-3 text-orange-400" />
        <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">
          {t.optimalSpeedTitle}
        </p>
        <p className="text-5xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
          {optimalSpeed.toFixed(0)}
        </p>
        <p className="text-sm text-gray-300 mb-2">km/h</p>
        <p className="text-xs text-gray-400 mb-3">{t.minCostFuel}</p>
        <div className="mt-3 pt-3 border-t border-orange-500/30">
          <p className="text-xs text-gray-500">⚡ {t.speedLimits}</p>
        </div>
      </div>

      <div className="mb-6 text-center p-6 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl border-2 border-green-500/50 backdrop-blur-sm shadow-lg shadow-green-500/20">
        <DollarSign className="w-12 h-12 mx-auto mb-3 text-green-400" />
        <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">
          {t.minCostTitle}
        </p>
        <p className="text-5xl font-bold mb-2 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
          ${minCost.toFixed(2)}
        </p>
        <p className="text-sm text-gray-300 mb-2">USD</p>
        <p className="text-xs text-gray-400 mb-3">{t.optimalFuelCost}</p>

        <div className="mt-4 pt-4 border-t border-green-500/30 text-left space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">⛽ {t.fuelCostBreakdown}:</span>
            <span className="text-green-300 font-semibold">
              ${costBreakdown.fuel.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">👤 {t.driverCostBreakdown}:</span>
            <span className="text-green-300 font-semibold">
              ${costBreakdown.driver.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">🔧 {t.depreciationBreakdown}:</span>
            <span className="text-green-300 font-semibold">
              ${costBreakdown.depreciation.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div
        className={`mb-6 text-center p-6 rounded-2xl border-2 backdrop-blur-sm shadow-lg transition-all duration-300 ${
          meetsTimeRestriction
            ? "bg-gradient-to-br from-gray-700/50 to-gray-800/50 border-gray-600/50"
            : "bg-gradient-to-br from-red-900/40 to-red-800/40 border-red-500/50 shadow-red-500/20"
        }`}
      >
        <Clock
          className={`w-12 h-12 mx-auto mb-3 ${
            meetsTimeRestriction ? "text-gray-400" : "text-red-400"
          }`}
        />
        <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">
          {t.estimatedTimeTitle}
        </p>
        <p
          className={`text-5xl font-bold mb-2 ${
            meetsTimeRestriction
              ? "text-white"
              : "bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent"
          }`}
        >
          {estimatedTime.toFixed(0)}
        </p>
        <p className="text-sm text-gray-300 mb-3">{t.minutes}</p>

        <p
          className={`text-xs font-semibold px-3 py-1.5 rounded-full inline-block ${
            meetsTimeRestriction
              ? "bg-green-500/20 text-green-400 border border-green-500/50"
              : "bg-red-500/20 text-red-400 border border-red-500/50"
          }`}
        >
          {meetsTimeRestriction
            ? `✓ ${t.meetsRestriction}`
            : `⊗ ${t.notMeetsRestriction}`}
        </p>
      </div>

      <div className="bg-blue-900/30 border-2 border-blue-500/50 rounded-2xl p-5 backdrop-blur-sm">
        <p className="font-semibold text-blue-400 mb-4 flex items-center gap-2 text-sm">
          <span className="text-lg">📐</span>
          {t.calcApplied}
        </p>
        <ul className="text-xs space-y-3 text-gray-300">
          <li className="flex items-start gap-2 leading-relaxed">
            <span className="text-blue-400 mt-0.5">•</span>
            <span>
              <strong>{t.totalCostDesc}</strong>
            </span>
          </li>
          <li className="flex items-start gap-2 leading-relaxed">
            <span className="text-blue-400 mt-0.5">•</span>
            <span>
              <strong>{t.fuelIncreaseDesc}</strong>
            </span>
          </li>
          <li className="flex items-start gap-2 leading-relaxed">
            <span className="text-blue-400 mt-0.5">•</span>
            <span>
              <strong>{t.timeDecreaseDesc}</strong>
            </span>
          </li>
          <li className="flex items-start gap-2 leading-relaxed">
            <span className="text-blue-400 mt-0.5">•</span>
            <span>
              <strong>{t.optimalDesc}</strong>
            </span>
          </li>
          <li className="flex items-start gap-2 leading-relaxed">
            <span className="text-blue-400 mt-0.5">•</span>
            <span>
              <strong>{t.trafficImpact}</strong>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Results;
