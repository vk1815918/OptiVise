"use client"

import { useState, useEffect } from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const generateDividendsData = () => {
  const baseValue = 300
  const months = ["Feb", "Mar", "Apr", "May", "Jun"]
  const data = []

  for (let i = 0; i < months.length; i++) {
    const isPast = i < 2
    const isCurrent = i === 2
    const isFuture = i > 2

    let value = baseValue + Math.random() * 100 - 50
    if (isFuture) {
      value = baseValue + 10 * (i - 2) + Math.random() * 40 - 20
    }

    data.push({
      name: months[i],
      dividends: Math.round(value),
      isProjected: isFuture,
    })
  }

  return data
}

export function MonthlyDividendsChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    setData(generateDividendsData())
  }, [])

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`
  }

  return (
    <div className="h-[180px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 10 }} />
          <YAxis
            tickFormatter={formatCurrency}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6B7280", fontSize: 10 }}
            width={60}
          />
          <Tooltip
            formatter={formatCurrency}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "0.5rem",
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            }}
            labelStyle={{ fontWeight: "bold", color: "#000" }}
          />
          <Bar
            dataKey="dividends"
            name="Monthly Dividends"
            radius={[4, 4, 0, 0]}
            fill={(entry) => (entry.isProjected ? "#F3F4F6" : "#DC2626")}
            stroke={(entry) => (entry.isProjected ? "#DC2626" : "none")}
            strokeWidth={2}
            strokeDasharray={(entry) => (entry.isProjected ? "4 4" : "0")}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

