export const CalculusEngine = {
  // Constantes realistas (ajustables según región)
  FUEL_PRICE_PER_LITER: 1.2,
  BASE_CONSUMPTION: 0.08,
  DRIVER_COST_PER_HOUR: 15,
  VEHICLE_DEPRECIATION_PER_KM: 0.15,
  MIN_SPEED: 30,
  MAX_SPEED: 120,

  /**
   * ✅ NUEVA: Calcula velocidad óptima SIN considerar tráfico
   * El tráfico se aplica después para obtener velocidad real
   */
  calculateOptimalSpeedBase: () => {
    const fuelFactor =
      0.002 *
      CalculusEngine.BASE_CONSUMPTION *
      CalculusEngine.FUEL_PRICE_PER_LITER;
    const vOptimal = Math.sqrt(
      CalculusEngine.DRIVER_COST_PER_HOUR / fuelFactor
    );

    return Math.max(
      CalculusEngine.MIN_SPEED,
      Math.min(CalculusEngine.MAX_SPEED, vOptimal)
    );
  },


  applyTraffic: (baseSpeed, trafficFactor) => {
    // Factor inverso: más tráfico = menor velocidad
    const inverseTrafficFactor = 1.0 / trafficFactor;
    const adjustedSpeed = baseSpeed * inverseTrafficFactor;

    return Math.max(
      CalculusEngine.MIN_SPEED,
      Math.min(CalculusEngine.MAX_SPEED, adjustedSpeed)
    );
  },

  /**
   * SIMPLIFICADA: Solo calcula velocidad óptima con tráfico
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

  generateChartData: (distance = 15.5, minV = 5, maxV = 150, step = 1) => {
    const data = [];
    for (let v = minV; v <= maxV; v += step) {
      data.push({
        velocity: v,
        cost: CalculusEngine.costFunction(v, distance),
      });
    }
    return data;
  },

  /**
   * ✅ Calcula tiempo basado en velocidad real (con tráfico aplicado)
   */
  calculateTime: (distance, speed) => {
    if (speed <= 0) return Infinity;
    return (distance / speed) * 60;
  },

  /**
   * ✅ IMPORTANTE: Desglose de costos usa velocidad REAL (con tráfico)
   * Esto es correcto porque el tráfico afecta cuánto tiempo trabajas
   */
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
