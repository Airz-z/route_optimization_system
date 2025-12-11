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

const CostChart = ({ chartData, optimalSpeed, minCost, t }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 shadow-xl hover:border-gray-600/50 transition-all duration-300">
      <h3 className="font-bold mb-2 text-lg">{t.costVsSpeed}</h3>
      <p className="text-sm text-gray-400 mb-4">{t.costFunction}</p>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData}>
          <defs>
            <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />

          <XAxis
            dataKey="velocity"
            stroke="#9CA3AF"
            style={{ fontSize: "12px" }}
          />

          <YAxis stroke="#9CA3AF" style={{ fontSize: "12px" }} />

          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "1px solid #374151",
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
            }}
            labelStyle={{ color: "#F97316", fontWeight: "bold" }}
            formatter={(value) => [`$${value.toFixed(2)}`, "Costo"]}
            labelFormatter={(label) => `Velocidad: ${label} km/h`}
          />

          <Line
            type="monotone"
            dataKey="cost"
            stroke="#f97316"
            strokeWidth={3}
            dot={false}
            fill="url(#colorCost)"
          />

          <ReferenceDot
            x={optimalSpeed}
            y={minCost}
            r={7}
            fill="#10B981"
            stroke="#fff"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 p-4 bg-green-900/30 border-2 border-green-500/50 rounded-xl backdrop-blur-sm">
        <p className="text-sm text-green-400 mb-1 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
          {t.optimalPoint}
        </p>
        <p className="text-xs text-gray-300">
          {t.calculatedBy} {t.balanceDesc}
        </p>
      </div>
    </div>
  );
};

export default CostChart;
