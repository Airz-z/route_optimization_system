import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";

/**
 * Componente CostChart
 * Visualiza la función de costo C(v) = a·v² + b/v
 * Marca el punto óptimo donde el costo es mínimo
 *
 * @param {Array} chartData - Array de objetos {velocity, cost}
 * @param {number} optimalSpeed - Velocidad óptima calculada
 * @param {number} minCost - Costo mínimo en el punto óptimo
 * @param {number} coeffA - Coeficiente a de la función
 * @param {number} coeffB - Coeficiente b de la función
 * @param {object} t - Objeto de traducciones
 */
const CostChart = ({ chartData, optimalSpeed, minCost, coeffA, coeffB, t }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      {/* Título y fórmula */}
      <h3 className="font-bold mb-2">{t.costVsSpeed}</h3>
      <p className="text-sm text-gray-400 mb-4">
        C(v) = {coeffA.toFixed(2)}v² + {coeffB}/v
      </p>

      {/* Gráfica */}
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          {/* Grid de fondo */}
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />

          {/* Eje X - Velocidad */}
          <XAxis
            dataKey="velocity"
            stroke="#9CA3AF"
            label={{
              value: "Velocidad (km/h)",
              position: "insideBottom",
              offset: -5,
              fill: "#9CA3AF",
            }}
          />

          {/* Eje Y - Costo */}
          <YAxis
            stroke="#9CA3AF"
            label={{
              value: "Costo ($)",
              angle: -90,
              position: "insideLeft",
              fill: "#9CA3AF",
            }}
          />

          {/* Tooltip interactivo */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "none",
              borderRadius: "8px",
              padding: "10px",
            }}
            labelStyle={{ color: "#F97316", fontWeight: "bold" }}
            formatter={(value) => [`$${value.toFixed(2)}`, "Costo"]}
            labelFormatter={(label) => `Velocidad: ${label} km/h`}
          />

          {/* Línea de la función de costo */}
          <Line
            type="monotone"
            dataKey="cost"
            stroke="#F97316"
            strokeWidth={2}
            dot={false}
            name="Costo"
          />

          {/* Punto óptimo marcado */}
          <ReferenceDot
            x={optimalSpeed}
            y={minCost}
            r={6}
            fill="#10B981"
            stroke="#fff"
            strokeWidth={2}
            label={{
              value: "Óptimo",
              position: "top",
              fill: "#10B981",
              fontSize: 12,
            }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Información del punto óptimo */}
      <div className="mt-4 p-3 bg-green-900/30 border border-green-500 rounded">
        <p className="text-sm text-green-400 mb-1">● {t.optimalPoint}</p>
        <p className="text-xs text-gray-300">
          {t.calculatedBy} dC/dv = 2av - b/v² = 0
        </p>
        <p className="text-xs text-gray-400 mt-1">
          v* = {optimalSpeed.toFixed(2)} km/h | C* = ${minCost.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default CostChart;
