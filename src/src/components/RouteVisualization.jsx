import React from "react";

/**
 * Componente RouteVisualization
 * Muestra una representación visual de la ruta desde el restaurante hasta el cliente
 *
 * @param {number} distance - Distancia del recorrido en km
 * @param {number} optimalSpeed - Velocidad óptima recomendada en km/h
 * @param {string} priority - Prioridad del pedido ('baja', 'media', 'alta')
 * @param {object} t - Objeto de traducciones
 */
const RouteVisualization = ({ distance, optimalSpeed, priority, t }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      {/* Header con título y badge de prioridad */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold">{t.routeViz}</h3>
        {priority === "alta" && (
          <span className="text-xs px-2 py-1 bg-red-500/20 text-red-500 rounded border border-red-500">
            {t.altPriority}
          </span>
        )}
      </div>

      {/* SVG de la ruta */}
      <div className="relative h-48 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 400 150">
          {/* Línea de ruta con curva */}
          <path
            d="M 50 75 Q 200 20 350 75"
            stroke="#F97316"
            strokeWidth="3"
            fill="none"
            strokeDasharray="10,5"
          />

          {/* Punto de origen - Restaurante */}
          <circle cx="50" cy="75" r="20" fill="#F97316" />
          <text x="50" y="80" textAnchor="middle" fill="white" fontSize="20">
            🏪
          </text>

          {/* Punto de destino - Cliente */}
          <circle cx="350" cy="75" r="20" fill="#10B981" />
          <text x="350" y="80" textAnchor="middle" fill="white" fontSize="20">
            🏠
          </text>

          {/* Indicador de movimiento */}
          <g>
            <circle cx="200" cy="20" r="8" fill="#FCD34D">
              <animate
                attributeName="cx"
                values="50;350"
                dur="3s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="cy"
                values="75;20;75"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
            <text x="200" y="24" textAnchor="middle" fontSize="12" fill="white">
              🚗
              <animate
                attributeName="x"
                values="50;350"
                dur="3s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                values="79;24;79"
                dur="3s"
                repeatCount="indefinite"
              />
            </text>
          </g>
        </svg>
      </div>

      {/* Información de la ruta */}
      <div className="grid grid-cols-3 gap-4 mt-4 text-center text-sm">
        <div>
          <p className="text-gray-400 text-xs">{t.origin}</p>
          <p className="font-semibold">{t.restaurant}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs">{t.distanceLabel}</p>
          <p className="font-semibold text-orange-500">{distance} km</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs">{t.destination}</p>
          <p className="font-semibold">{t.client}</p>
        </div>
      </div>

      {/* Velocidad recomendada */}
      <div className="mt-4 p-3 bg-gray-700 rounded text-center">
        <p className="text-xs text-gray-400">⚡ {t.recommendedSpeed}</p>
        <p className="text-lg font-bold text-orange-500">
          {optimalSpeed.toFixed(0)} km/h
        </p>
      </div>
    </div>
  );
};

export default RouteVisualization;
