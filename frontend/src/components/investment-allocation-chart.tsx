"use client"

import { useState, useEffect } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

// Get allocation data from the investments JSON
const getInvestmentAllocationData = () => {
  // This would typically come from the same data source as the investments list
  return [
    { name: "Stocks", value: 15, color: "#DC2626" }, // Combined AAPL and MSFT
    { name: "Bonds", value: 20, color: "#6B7280" },
    { name: "ETFs", value: 40, color: "#F59E0B" },
    { name: "Funds", value: 15, color: "#10B981" },
    { name: "REITs", value: 10, color: "#8B5CF6" },
  ]
}

export function InvestmentAllocationChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    setData(getInvestmentAllocationData())
  }, [])

  const formatPercent = (value: number) => `${value}%`

  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            stroke="#fff"
            strokeWidth={2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={formatPercent}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "0.5rem",
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
            <span className="text-xs text-gray-600">
              {item.name} ({item.value}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

