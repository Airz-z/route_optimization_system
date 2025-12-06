# 🚀 Sistema de Optimización de Rutas

Sistema de optimización de rutas de entrega usando **cálculo diferencial** para minimizar costos de combustible.

## 📁 Estructura del Proyecto

```
route-optimizer/
│
├── src/
│   ├── components/
│   │   ├── Header.jsx              # Encabezado con selector de idioma
│   │   ├── InputParameters.jsx     # Panel de parámetros de entrada
│   │   ├── CostChart.jsx          # Gráfica interactiva de costo
│   │   ├── RouteVisualization.jsx # Visualización de la ruta
│   │   └── Results.jsx            # Panel de resultados
│   │
│   ├── utils/
│   │   ├── calculusEngine.js      # Motor de cálculo diferencial
│   │   └── translations.js        # Traducciones ES/EN
│   │
│   ├── App.jsx                    # Componente principal
│   ├── index.css                  # Estilos globales con Tailwind
│   └── main.jsx                   # Punto de entrada
│
├── public/
│   └── index.html
│
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🧮 Módulos Principales

### 1️⃣ **calculusEngine.js**
Motor matemático que implementa:
- **Función de costo**: `C(v) = a·v² + b/v`
- **Derivada**: `dC/dv = 2a·v - b/v²`
- **Optimización**: `v* = ∛(b/2a)`
- Generación de datos para gráficas
- Validación de restricciones

### 2️⃣ **translations.js**
Sistema de internacionalización:
- Traducciones en español
- Traducciones en inglés
- Fácil expansión a más idiomas

### 3️⃣ **Header.jsx**
- Logo y título de la aplicación
- Botón de cambio de idioma
- Diseño responsive

### 4️⃣ **InputParameters.jsx**
Panel de configuración con:
- Campo de distancia (km)
- Tiempo máximo permitido (min)
- Coeficientes de la función de costo (a, b)
- Control de nivel de tráfico
- Selector de prioridad del pedido
- Validación de inputs

### 5️⃣ **CostChart.jsx**
Gráfica interactiva que muestra:
- Curva de la función de costo
- Punto óptimo marcado visualmente
- Tooltip con información detallada
- Fórmula matemática actual
- Explicación del cálculo

### 6️⃣ **RouteVisualization.jsx**
Visualización animada con:
- Representación SVG de la ruta
- Animación del vehículo en movimiento
- Información de origen y destino
- Velocidad recomendada
- Indicador de prioridad

### 7️⃣ **Results.jsx**
Panel de resultados optimizados:
- **Velocidad óptima** (km/h)
- **Costo mínimo** de combustible (USD)
- **Tiempo estimado** (minutos)
- Validación de restricciones temporales
- Explicación del cálculo diferencial aplicado

### 8️⃣ **App.jsx**
Componente principal que:
- Maneja el estado global de la aplicación
- Coordina todos los componentes
- Ejecuta cálculos en tiempo real
- Gestiona efectos secundarios

## 🎯 Características

✅ **Cálculo Diferencial Avanzado**
- Minimización de funciones mediante derivadas
- Validación de puntos críticos con segunda derivada
- Aplicación de límites y restricciones

✅ **Interfaz Interactiva**
- Actualización en tiempo real
- Gráficas animadas con Recharts
- Diseño responsive con Tailwind CSS

✅ **Multiidioma**
- Español e Inglés
- Cambio instantáneo sin recargar

✅ **Visualización Clara**
- Código modular y documentado
- Componentes reutilizables
- Separación de responsabilidades

## 🛠️ Instalación

```bash
# Clonar el repositorio
git clone [url-del-repo]

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```

## 📦 Dependencias

- **React 18**: Framework de UI
- **Recharts**: Gráficas interactivas
- **Lucide React**: Iconos modernos
- **Tailwind CSS**: Estilos utility-first
- **Vite**: Build tool ultra-rápido

## 🧪 Uso

1. Ajusta los parámetros en el panel izquierdo
2. La aplicación calcula automáticamente la velocidad óptima
3. Visualiza los resultados en la gráfica y panel derecho
4. Cambia el idioma según necesites

## 📐 Fundamentos Matemáticos

### Función de Costo
```
C(v) = a·v² + b/v

Donde:
- v = velocidad (km/h)
- a = coeficiente de costo cuadrático
- b = coeficiente de costo inverso
```

### Derivada (Condición de Primer Orden)
```
dC/dv = 2a·v - b/v² = 0
```

### Solución Óptima
```
v* = ∛(b/2a)
```

### Verificación (Segunda Derivada)
```
d²C/dv² = 2a + 2b/v³ > 0  ✓ (Es un mínimo)
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Haz fork del proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request
