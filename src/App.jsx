import React, { useState, useEffect } from "react";
import { translations } from "./src/utils/translations";
import { CalculusEngine } from "./src/utils/CalculusEngine";
import Header from "./src/components/Header";
import InputParameters from "./src/components/InputParameters";
import CostChart from "./src/components/CostChart";
import RouteVisualization from "./src/components/RouteVisualization";
import Results from "./src/components/Results";
import "./index.css";

/**
 * Funcionalidad:
 * - Calcula la velocidad óptima que minimiza el costo de combustible
 * - Utiliza derivadas para encontrar el punto mínimo de la función de costo
 * - Valida restricciones de tiempo
 * - Soporta múltiples idiomas (ES/EN)
 * - Visualiza resultados de forma interactiva
 */
const RouteOptimizer = () => {
  // ===== Estado de la Aplicación =====
  const [language, setLanguage] = useState("es");

  // Parámetros de entrada
  const [distance, setDistance] = useState(15.5);
  const [maxTime, setMaxTime] = useState(30);
  const [coeffA, setCoeffA] = useState(0.05);
  const [coeffB, setCoeffB] = useState(80);
  const [traffic, setTraffic] = useState(1);
  const [priority, setPriority] = useState("alta");

  // Resultados calculados
  const [optimalSpeed, setOptimalSpeed] = useState(0);
  const [minCost, setMinCost] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [chartData, setChartData] = useState([]);

  // Obtener traducciones para el idioma actual
  const t = translations[language];

  // ===== Efecto para Recalcular Optimización =====
  useEffect(() => {
    // Calcular velocidad óptima usando cálculo diferencial
    const vOpt = CalculusEngine.calculateOptimalSpeed(coeffA, coeffB, traffic);

    // Calcular costo mínimo en la velocidad óptima
    const cost = CalculusEngine.costFunction(vOpt, coeffA, coeffB);

    // Calcular tiempo estimado de viaje
    const time = CalculusEngine.calculateTime(distance, vOpt);

    // Actualizar estado con los resultados
    setOptimalSpeed(vOpt);
    setMinCost(cost);
    setEstimatedTime(time);

    // Generar datos para la gráfica
    setChartData(CalculusEngine.generateChartData(coeffA, coeffB));
  }, [distance, maxTime, coeffA, coeffB, traffic, priority]);

  // ===== Renderizado =====
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header con selector de idioma */}
      <Header
        language={language}
        onLanguageChange={() => setLanguage(language === "es" ? "en" : "es")}
        t={t}
      />

      {/* Layout principal con 3 columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna 1: Parámetros de Entrada */}
        <div className="lg:col-span-1 space-y-6">
          <InputParameters
            distance={distance}
            setDistance={setDistance}
            maxTime={maxTime}
            setMaxTime={setMaxTime}
            coeffA={coeffA}
            setCoeffA={setCoeffA}
            coeffB={coeffB}
            setCoeffB={setCoeffB}
            traffic={traffic}
            setTraffic={setTraffic}
            priority={priority}
            setPriority={setPriority}
            t={t}
          />
        </div>

        {/* Columna 2: Gráficas y Visualización */}
        <div className="lg:col-span-1 space-y-6">
          <CostChart
            chartData={chartData}
            optimalSpeed={optimalSpeed}
            minCost={minCost}
            coeffA={coeffA}
            coeffB={coeffB}
            t={t}
          />
          <RouteVisualization
            distance={distance}
            optimalSpeed={optimalSpeed}
            priority={priority}
            t={t}
          />
        </div>

        {/* Columna 3: Resultados */}
        <div className="lg:col-span-1 space-y-6">
          <Results
            optimalSpeed={optimalSpeed}
            minCost={minCost}
            estimatedTime={estimatedTime}
            maxTime={maxTime}
            t={t}
          />
        </div>
      </div>
    </div>
  );
};

export default RouteOptimizer;
