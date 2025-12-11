// App.jsx
import React, { useState, useEffect } from "react";
import { translations } from "./src/utils/translations";
import { CalculusEngine } from "./src/utils/CalculusEngine";
import Header from "./src/components/Header";
import InputParameters from "./src/components/InputParameters";
import CostChart from "./src/components/CostChart";
import RouteVisualization from "./src/components/RouteVisualization";
import Results from "./src/components/Results";

const RouteOptimizer = () => {
  const [language, setLanguage] = useState("es");
  const [distance, setDistance] = useState(15.5);
  const [maxTime, setMaxTime] = useState(30);
  const [traffic, setTraffic] = useState(1);
  const [fuelPrice, setFuelPrice] = useState(1.2);
  const [driverCost, setDriverCost] = useState(15);

  const [optimalSpeed, setOptimalSpeed] = useState(0);
  const [minCost, setMinCost] = useState(0);
  const [costBreakdown, setCostBreakdown] = useState({
    fuel: 0,
    driver: 0,
    depreciation: 0,
    total: 0,
  });
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [chartData, setChartData] = useState([]);

  const t = translations[language];

  useEffect(() => {
    CalculusEngine.FUEL_PRICE_PER_LITER = fuelPrice;
    CalculusEngine.DRIVER_COST_PER_HOUR = driverCost;

    const vOpt = CalculusEngine.calculateOptimalSpeed(distance, traffic);
    const breakdown = CalculusEngine.getCostBreakdown(vOpt, distance);
    const time = CalculusEngine.calculateTime(distance, vOpt);

    setOptimalSpeed(vOpt);
    setMinCost(breakdown.total);
    setCostBreakdown(breakdown);
    setEstimatedTime(time);
    setChartData(CalculusEngine.generateChartData(distance));
  }, [distance, maxTime, traffic, fuelPrice, driverCost]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <Header
        language={language}
        onLanguageChange={() => setLanguage(language === "es" ? "en" : "es")}
        t={t}
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6 animate-slide-up">
          <InputParameters
            distance={distance}
            setDistance={setDistance}
            maxTime={maxTime}
            setMaxTime={setMaxTime}
            fuelPrice={fuelPrice}
            setFuelPrice={setFuelPrice}
            driverCost={driverCost}
            setDriverCost={setDriverCost}
            traffic={traffic}
            setTraffic={setTraffic}
            t={t}
          />
        </div>

        <div
          className="lg:col-span-1 space-y-6 animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <CostChart
            chartData={chartData}
            optimalSpeed={optimalSpeed}
            minCost={minCost}
            t={t}
          />
          <RouteVisualization
            distance={distance}
            optimalSpeed={optimalSpeed}
            traffic={traffic}
            t={t}
          />
        </div>

        <div
          className="lg:col-span-1 space-y-6 animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <Results
            optimalSpeed={optimalSpeed}
            minCost={minCost}
            costBreakdown={costBreakdown}
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
