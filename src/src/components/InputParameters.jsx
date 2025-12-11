import React from "react";
import { Calculator } from "lucide-react";

const InputParameters = ({
  distance,
  setDistance,
  maxTime,
  setMaxTime,
  fuelPrice,
  setFuelPrice,
  driverCost,
  setDriverCost,
  traffic,
  setTraffic,
  t,
}) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 shadow-xl hover:border-gray-600/50 transition-all duration-300">
      <h2 className="text-xl font-bold mb-2">{t.inputParams}</h2>
      <p className="text-gray-400 text-sm mb-6">{t.inputSubtitle}</p>

      <div className="space-y-5">
        <div>
          <label
            className="block text-sm font-medium text-gray-300 mb-2"
            htmlFor="distance"
          >
            {t.distance}
          </label>
          <input
            id="distance"
            type="number"
            value={distance}
            onChange={(e) => setDistance(parseFloat(e.target.value) || 0)}
            className="w-full bg-gray-700/50 backdrop-blur-sm text-white rounded-xl px-4 py-3 outline-none border border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            step="0.1"
            min="0"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-300 mb-2"
            htmlFor="maxTime"
          >
            {t.maxTime}
          </label>
          <input
            id="maxTime"
            type="number"
            value={maxTime}
            onChange={(e) => setMaxTime(parseFloat(e.target.value) || 0)}
            className="w-full bg-gray-700/50 backdrop-blur-sm text-white rounded-xl px-4 py-3 outline-none border border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            min="0"
          />
        </div>

        <div className="pt-4 border-t border-gray-700">
          <h3 className="font-semibold text-orange-400 mb-2">{t.costConfig}</h3>
          <p className="text-xs text-gray-400 mb-4">{t.costConfigDesc}</p>

          <div className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-300 mb-2"
                htmlFor="fuelPrice"
              >
                💰 {t.fuelPrice}
              </label>
              <input
                id="fuelPrice"
                type="number"
                value={fuelPrice}
                onChange={(e) => setFuelPrice(parseFloat(e.target.value) || 0)}
                className="w-full bg-gray-700/50 backdrop-blur-sm text-white rounded-xl px-4 py-3 outline-none border border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                step="0.1"
                min="0.5"
                max="5"
              />
              <p className="text-xs text-gray-500 mt-1">{t.fuelPriceDesc}</p>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-300 mb-2"
                htmlFor="driverCost"
              >
                👤 {t.driverCost}
              </label>
              <input
                id="driverCost"
                type="number"
                value={driverCost}
                onChange={(e) => setDriverCost(parseFloat(e.target.value) || 0)}
                className="w-full bg-gray-700/50 backdrop-blur-sm text-white rounded-xl px-4 py-3 outline-none border border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                step="1"
                min="5"
                max="50"
              />
              <p className="text-xs text-gray-500 mt-1">{t.driverCostDesc}</p>
            </div>

            <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <p className="text-xs text-blue-300 mb-1">📋 {t.otherCosts}</p>
              <p className="text-xs text-gray-400">
                • {t.depreciationCost}
                <br />• {t.baseConsumption}
                <br />• {t.speedFactor}
              </p>
            </div>
          </div>
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-300 mb-3"
            htmlFor="traffic"
          >
            {t.trafficLevel}
          </label>
          <input
            id="traffic"
            type="range"
            min="0.7"
            max="1.5"
            step="0.1"
            value={traffic}
            onChange={(e) => setTraffic(parseFloat(e.target.value))}
            className="w-full h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-lg appearance-none cursor-pointer"
            style={{
              background:
                "linear-gradient(to right, #10b981, #eab308, #ef4444)",
            }}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>{t.low}</span>
            <span className="text-orange-500 font-medium">{t.medium}</span>
            <span>{t.high}</span>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Factor actual: {traffic.toFixed(1)}
          </p>
        </div>

        <button
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-[0.98]"
          aria-label="Calculate optimization"
        >
          <Calculator className="w-5 h-5" />
          {t.calculate}
        </button>
      </div>
    </div>
  );
};

export default InputParameters;
