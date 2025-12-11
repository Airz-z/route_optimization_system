export const CalculusEngine = {
  // Constantes (ajustables según región)
  FUEL_PRICE_PER_LITER: 1.2,
  BASE_CONSUMPTION: 0.08,
  DRIVER_COST_PER_HOUR: 15,
  VEHICLE_DEPRECIATION_PER_KM: 0.15,

  MIN_SPEED: 20, // km/h - Tráfico muy denso, zonas escolares
  MAX_SPEED: 80, // km/h - Máximo en promedio en una ciudad en latinoamerica

  calculateOptimalSpeedBase: () => {
    const fuelFactor =
      0.002 *
      CalculusEngine.BASE_CONSUMPTION *
      CalculusEngine.FUEL_PRICE_PER_LITER;

    // Velocidad óptima teórica matemática
    const vTheoretical = Math.sqrt(
      CalculusEngine.DRIVER_COST_PER_HOUR / fuelFactor
    );

    return Math.max(
      CalculusEngine.MIN_SPEED,
      Math.min(CalculusEngine.MAX_SPEED, vTheoretical)
    );
  },

  applyTraffic: (baseSpeed, trafficFactor) => {

    let adjustmentFactor;

    if (trafficFactor < 1.0) {
      // Tráfico bajo: aumento moderado (máx 20%)
      adjustmentFactor = 1.0 + (1.0 - trafficFactor) * 0.67;
    } else {
      // Tráfico alto: reducción más pronunciada
      adjustmentFactor = 1.0 / trafficFactor;
    }

    const adjustedSpeed = baseSpeed * adjustmentFactor;

    return Math.max(
      CalculusEngine.MIN_SPEED,
      Math.min(CalculusEngine.MAX_SPEED, adjustedSpeed)
    );
  },

  /**
   * Calcula velocidad óptima con tráfico aplicado
   */
  calculateOptimalSpeed: (distance, trafficFactor) => {
    const baseSpeed = CalculusEngine.calculateOptimalSpeedBase();
    return CalculusEngine.applyTraffic(baseSpeed, trafficFactor);
  },

  /**
   * Calcula el costo basado en velocidad y distancia
   */
  costFunction: (v, distance = 1) => {
    if (v <= 0) return Infinity;

    const fuelConsumptionRate =
      CalculusEngine.BASE_CONSUMPTION * (1 + 0.002 * v);
    const fuelCost =
      fuelConsumptionRate * distance * CalculusEngine.FUEL_PRICE_PER_LITER;

    const timeHours = distance / v;
    const driverCost = timeHours * CalculusEngine.DRIVER_COST_PER_HOUR;

    const depreciationCost =
      distance * CalculusEngine.VEHICLE_DEPRECIATION_PER_KM;

    return fuelCost + driverCost + depreciationCost;
  },

  costDerivative: (v, distance = 1) => {
    if (v <= 0) return 0;

    const fuelDerivative =
      0.002 *
      CalculusEngine.BASE_CONSUMPTION *
      distance *
      CalculusEngine.FUEL_PRICE_PER_LITER;

    const timeDerivative =
      (-distance * CalculusEngine.DRIVER_COST_PER_HOUR) / (v * v);

    return fuelDerivative + timeDerivative;
  },

  generateChartData: (distance = 15.5, minV = 5, maxV = 120, step = 1) => {
    const data = [];
    for (let v = minV; v <= maxV; v += step) {
      data.push({
        velocity: v,
        cost: CalculusEngine.costFunction(v, distance),
      });
    }
    return data;
  },

  calculateTime: (distance, speed) => {
    if (speed <= 0) return Infinity;
    return (distance / speed) * 60;
  },

  getCostBreakdown: (v, distance) => {
    const fuelConsumptionRate =
      CalculusEngine.BASE_CONSUMPTION * (1 + 0.002 * v);
    const fuelCost =
      fuelConsumptionRate * distance * CalculusEngine.FUEL_PRICE_PER_LITER;

    const timeHours = distance / v;
    const driverCost = timeHours * CalculusEngine.DRIVER_COST_PER_HOUR;

    const depreciationCost =
      distance * CalculusEngine.VEHICLE_DEPRECIATION_PER_KM;

    return {
      fuel: fuelCost,
      driver: driverCost,
      depreciation: depreciationCost,
      total: fuelCost + driverCost + depreciationCost,
    };
  },

  getSpeedLimits: () => {
    return {
      MIN_SPEED: CalculusEngine.MIN_SPEED,
      MAX_SPEED: CalculusEngine.MAX_SPEED,
    };
  },

  checkSpeedLimit: (speed) => {
    if (speed < CalculusEngine.MIN_SPEED) {
      return {
        isValid: false,
        limitApplied: "MIN",
        originalSpeed: speed,
        finalSpeed: CalculusEngine.MIN_SPEED,
      };
    }

    if (speed > CalculusEngine.MAX_SPEED) {
      return {
        isValid: false,
        limitApplied: "MAX",
        originalSpeed: speed,
        finalSpeed: CalculusEngine.MAX_SPEED,
      };
    }

    return {
      isValid: true,
      limitApplied: "NONE",
      originalSpeed: speed,
      finalSpeed: speed,
    };
  },
};
