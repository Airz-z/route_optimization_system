export const CalculusEngine = {
  /**
   * Función de costo: C(v) = a*v² + b/v
   * Representa el costo total de combustible en función de la velocidad
   *
   * @param {number} v - Velocidad en km/h
   * @param {number} a - Coeficiente cuadrático (costo por velocidad al cuadrado)
   * @param {number} b - Coeficiente inverso (costo inverso a la velocidad)
   * @returns {number} Costo total
   */
  costFunction: (v, a, b) => {
    if (v <= 0) return Infinity;
    return a * v * v + b / v;
  },

  /**
   * Derivada de la función de costo: dC/dv = 2*a*v - b/v²
   * Utilizada para encontrar puntos críticos (máximos y mínimos)
   *
   * @param {number} v - Velocidad en km/h
   * @param {number} a - Coeficiente cuadrático
   * @param {number} b - Coeficiente inverso
   * @returns {number} Valor de la derivada en el punto v
   */
  costDerivative: (v, a, b) => {
    if (v <= 0) return 0;
    return 2 * a * v - b / (v * v);
  },

  /**
   * Calcula la velocidad óptima usando cálculo diferencial
   *
   * Proceso:
   * 1. Igualar la derivada a cero: 2*a*v - b/v² = 0
   * 2. Resolver para v: 2*a*v = b/v²
   * 3. Multiplicar ambos lados por v²: 2*a*v³ = b
   * 4. Despejar v³: v³ = b/(2a)
   * 5. Aplicar raíz cúbica: v = ∛(b/(2a))
   *
   * @param {number} a - Coeficiente cuadrático
   * @param {number} b - Coeficiente inverso
   * @param {number} trafficFactor - Factor de ajuste por tráfico (0.7 - 1.5)
   * @returns {number} Velocidad óptima en km/h
   */
  calculateOptimalSpeed: (a, b, trafficFactor) => {
    // ✅ LÍMITES DE VELOCIDAD REALISTAS
    const MIN_SPEED = 30; // km/h - Zona escolar/residencial
    const MAX_SPEED = 120; // km/h - Límite de autopista urbana

    // Paso 1: Calcular velocidad óptima teórica según la función de costo
    // Derivando e igualando a cero: 2a·v - b/v² = 0
    // Resolviendo: v = ∛(b/(2a))
    const vTheoretical = Math.pow(b / (2 * a), 1 / 3);

    // Paso 2: Ajustar por factor de tráfico inverso
    // Factor inverso: más tráfico = menor velocidad
    // Fórmula: 1.0 / trafficFactor
    // - trafficFactor = 0.7 → multiplicador = 1.43 (+43%)
    // - trafficFactor = 1.0 → multiplicador = 1.00 (sin cambio)
    // - trafficFactor = 1.5 → multiplicador = 0.67 (-33%)
    const inverseTrafficFactor = 1.0 / trafficFactor;
    const vAdjusted = vTheoretical * inverseTrafficFactor;
    
    // Paso 3: Aplicar límites de velocidad
    return Math.max(MIN_SPEED, Math.min(MAX_SPEED, vAdjusted));
  },

  /**
   * Genera datos para graficar la función de costo
   *
   * @param {number} a - Coeficiente cuadrático
   * @param {number} b - Coeficiente inverso
   * @param {number} minV - Velocidad mínima (default: 5 km/h)
   * @param {number} maxV - Velocidad máxima (default: 150 km/h)
   * @param {number} step - Incremento entre puntos (default: 1 km/h)
   * @returns {Array} Array de objetos {velocity, cost}
   */
  generateChartData: (a, b, minV = 5, maxV = 150, step = 1) => {
    const data = [];
    for (let v = minV; v <= maxV; v += step) {
      data.push({
        velocity: v,
        cost: CalculusEngine.costFunction(v, a, b),
      });
    }
    return data;
  },

  /**
   * Calcula el tiempo estimado de viaje
   *
   * @param {number} distance - Distancia en kilómetros
   * @param {number} speed - Velocidad en km/h
   * @returns {number} Tiempo en minutos
   */
  calculateTime: (distance, speed) => {
    if (speed <= 0) return Infinity;
    return (distance / speed) * 60; // Convertir horas a minutos
  },

  /**
   * Verifica la segunda derivada para confirmar que es un mínimo
   * d²C/dv² = 2*a + 2*b/v³
   * Si es positiva, confirma que es un mínimo
   *
   * @param {number} v - Velocidad en km/h
   * @param {number} a - Coeficiente cuadrático
   * @param {number} b - Coeficiente inverso
   * @returns {boolean} true si es un mínimo
   */
  isMinimum: (v, a, b) => {
    if (v <= 0) return false;
    const secondDerivative = 2 * a + (2 * b) / Math.pow(v, 3);
    return secondDerivative > 0;
  },

  /**
   * Calcula el costo total del viaje (combustible + tiempo)
   *
   * @param {number} v - Velocidad en km/h
   * @param {number} distance - Distancia en km
   * @param {number} a - Coeficiente cuadrático
   * @param {number} b - Coeficiente inverso
   * @param {number} timeCostPerMinute - Costo por minuto de tiempo
   * @returns {number} Costo total
   */
  totalCost: (v, distance, a, b, timeCostPerMinute = 0) => {
    const fuelCost = CalculusEngine.costFunction(v, a, b);
    const time = CalculusEngine.calculateTime(distance, v);
    const timeCost = time * timeCostPerMinute;
    return fuelCost + timeCost;
  },
};
