import React from "react";
import { Calculator } from "lucide-react";

/**
 * Componente InputParameters
 * Panel de configuración de parámetros para la optimización de rutas
 *
 * @param {number} distance - Distancia del recorrido en km
 * @param {function} setDistance - Setter para la distancia
 * @param {number} maxTime - Tiempo máximo permitido en minutos
 * @param {function} setMaxTime - Setter para el tiempo máximo
 * @param {number} coeffA - Coeficiente a de la función de costo
 * @param {function} setCoeffA - Setter para el coeficiente a
 * @param {number} coeffB - Coeficiente b de la función de costo
 * @param {function} setCoeffB - Setter para el coeficiente b
 * @param {number} traffic - Factor de tráfico (0.7 - 1.5)
 * @param {function} setTraffic - Setter para el tráfico
 * @param {string} priority - Prioridad del pedido ('baja', 'media', 'alta')
 * @param {function} setPriority - Setter para la prioridad
 * @param {object} t - Objeto de traducciones
 */
const InputParameters = ({
  distance,
  setDistance,
  maxTime,
  setMaxTime,
  coeffA,
  setCoeffA,
  coeffB,
  setCoeffB,
  traffic,
  setTraffic,
  priority,
  setPriority,
  t,
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-2">{t.inputParams}</h2>
      <p className="text-gray-400 text-sm mb-4">{t.inputSubtitle}</p>

      {/* Campo de Distancia */}
      <div className="mb-4">
        <label className="block text-sm mb-2" htmlFor="distance">
          {t.distance}
        </label>
        <input
          id="distance"
          type="number"
          value={distance}
          onChange={(e) => setDistance(parseFloat(e.target.value) || 0)}
          className="w-full bg-gray-700 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500 transition"
          step="0.1"
          min="0"
        />
      </div>

      {/* Campo de Tiempo Máximo */}
      <div className="mb-4">
        <label className="block text-sm mb-2" htmlFor="maxTime">
          {t.maxTime}
        </label>
        <input
          id="maxTime"
          type="number"
          value={maxTime}
          onChange={(e) => setMaxTime(parseFloat(e.target.value) || 0)}
          className="w-full bg-gray-700 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500 transition"
          min="0"
        />
      </div>

      {/* Coeficientes de Costo */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">{t.costCoeff}</h3>
        <p className="text-xs text-gray-400 mb-3">{t.costFormula}</p>

        {/* Coeficiente a */}
        <label className="block text-sm mb-2" htmlFor="coeffA">
          {t.coeffA}
        </label>
        <input
          id="coeffA"
          type="number"
          value={coeffA}
          onChange={(e) => setCoeffA(parseFloat(e.target.value) || 0)}
          className="w-full bg-gray-700 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500 transition mb-1"
          step="0.01"
          min="0"
        />
        <p className="text-xs text-gray-500 mb-3">{t.coeffADesc}</p>

        {/* Coeficiente b */}
        <label className="block text-sm mb-2" htmlFor="coeffB">
          {t.coeffB}
        </label>
        <input
          id="coeffB"
          type="number"
          value={coeffB}
          onChange={(e) => setCoeffB(parseFloat(e.target.value) || 0)}
          className="w-full bg-gray-700 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500 transition mb-1"
          min="0"
        />
        <p className="text-xs text-gray-500">{t.coeffBDesc}</p>
      </div>

      {/* Nivel de Tráfico */}
      <div className="mb-4">
        <label className="block text-sm mb-2" htmlFor="traffic">
          {t.trafficLevel}
        </label>
        <div className="flex gap-2">
          <div className="flex-1 h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded"></div>
        </div>
        <input
          id="traffic"
          type="range"
          min="0.7"
          max="1.5"
          step="0.1"
          value={traffic}
          onChange={(e) => setTraffic(parseFloat(e.target.value))}
          className="w-full mt-2"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{t.low}</span>
          <span className="text-orange-500">{t.medium}</span>
          <span>{t.high}</span>
        </div>
      </div>

      {/* Prioridad del Pedido */}
      <div className="mb-4">
        <label className="block text-sm mb-2">{t.priority}</label>
        <div className="flex gap-2">
          <button
            onClick={() => setPriority("baja")}
            className={`flex-1 py-2 rounded transition-colors ${
              priority === "baja"
                ? "bg-gray-600 ring-2 ring-gray-400"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {t.low}
          </button>
          <button
            onClick={() => setPriority("media")}
            className={`flex-1 py-2 rounded transition-colors ${
              priority === "media"
                ? "bg-gray-600 ring-2 ring-gray-400"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {t.medium}
          </button>
          <button
            onClick={() => setPriority("alta")}
            className={`flex-1 py-2 rounded transition-colors ${
              priority === "alta"
                ? "bg-orange-500 ring-2 ring-orange-300"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {t.high}
          </button>
        </div>
      </div>

      {/* Botón de Cálculo */}
      <button
        className="w-full bg-orange-500 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center"
        aria-label="Calculate optimization"
      >
        <Calculator className="inline w-5 h-5 mr-2" />
        {t.calculate}
      </button>
    </div>
  );
};

export default InputParameters;
