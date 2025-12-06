import React from "react";
import { Clock, DollarSign, TrendingUp } from "lucide-react";

/**
 * Componente Results
 * Muestra los resultados optimizados: velocidad óptima, costo mínimo y tiempo estimado
 * Incluye validación de restricciones de tiempo
 *
 * @param {number} optimalSpeed - Velocidad óptima en km/h
 * @param {number} minCost - Costo mínimo de combustible en USD
 * @param {number} estimatedTime - Tiempo estimado en minutos
 * @param {number} maxTime - Tiempo máximo permitido en minutos
 * @param {object} t - Objeto de traducciones
 */
const Results = ({ optimalSpeed, minCost, estimatedTime, maxTime, t }) => {
  // Verificar si cumple con la restricción de tiempo
  const meetsTimeRestriction = estimatedTime <= maxTime;

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-6">{t.results}</h2>

      {/* Card de Velocidad Óptima */}
      <div className="mb-6 text-center p-6 bg-gray-700 rounded-lg border-2 border-orange-500">
        <TrendingUp className="w-12 h-12 mx-auto mb-2 text-orange-500" />
        <p className="text-xs text-gray-400 mb-1">{t.optimalSpeedTitle}</p>
        <p className="text-4xl font-bold mb-1">{optimalSpeed.toFixed(0)}</p>
        <p className="text-sm text-gray-400">km/h</p>
        <p className="text-xs text-gray-500 mt-2">{t.minCostFuel}</p>
      </div>

      {/* Card de Costo Mínimo */}
      <div className="mb-6 text-center p-6 bg-gray-700 rounded-lg">
        <DollarSign className="w-12 h-12 mx-auto mb-2 text-green-500" />
        <p className="text-xs text-gray-400 mb-1">{t.minCostTitle}</p>
        <p className="text-4xl font-bold mb-1">${minCost.toFixed(0)}</p>
        <p className="text-sm text-gray-400">USD</p>
        <p className="text-xs text-gray-500 mt-2">{t.optimalFuelCost}</p>
      </div>

      {/* Card de Tiempo Estimado */}
      <div
        className={`mb-6 text-center p-6 rounded-lg border-2 transition-all ${
          meetsTimeRestriction
            ? "bg-gray-700 border-gray-600"
            : "bg-red-900/30 border-red-500"
        }`}
      >
        <Clock
          className={`w-12 h-12 mx-auto mb-2 ${
            meetsTimeRestriction ? "text-gray-400" : "text-red-500"
          }`}
        />
        <p className="text-xs text-gray-400 mb-1">{t.estimatedTimeTitle}</p>
        <p className="text-4xl font-bold mb-1">{estimatedTime.toFixed(0)}</p>
        <p className="text-sm text-gray-400">{t.minutes}</p>

        {/* Indicador de restricción */}
        <p
          className={`text-xs mt-2 font-semibold ${
            meetsTimeRestriction ? "text-green-500" : "text-red-500"
          }`}
        >
          {meetsTimeRestriction
            ? `✓ ${t.meetsRestriction}`
            : `⊗ ${t.notMeetsRestriction}`}
        </p>
        {!meetsTimeRestriction && (
          <p className="text-xs text-gray-500 mt-1">
            T ≤ {maxTime} {t.minutes}
          </p>
        )}
      </div>

      {/* Información sobre el cálculo aplicado */}
      <div className="bg-blue-900/30 border border-blue-500 rounded-lg p-4">
        <p className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
          <span>📐</span>
          <span>{t.calcApplied}</span>
        </p>
        <ul className="text-xs space-y-2 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            <span>{t.costFunctionDesc}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            <span>{t.derivativeDesc}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            <span>{t.optimizationDesc}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            <span>{t.restrictionDesc}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Results;
