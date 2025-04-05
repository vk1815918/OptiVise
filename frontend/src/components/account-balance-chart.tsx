"use client"

import { useState, useEffect } from "react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Generate sample data
const generateData = () => {
  const months = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"]
  const data = []

  let balance = 100000

  for (let i = 0; i < months.length; i++) {
    // Generate random growth between -2% and +5%
    const change = balance * (Math.random() * 0.07 - 0.02)
    balance += change

    data.push({
      name: months[i],
      balance: Math.round(balance),
    })
  }

  return data
}

export function AccountBalanceChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    setData(generateData())
  }, [])

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`
  }

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#DC2626" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 12 }} />
          <YAxis
            tickFormatter={formatCurrency}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6B7280", fontSize: 12 }}
            width={80}
          />
          <Tooltip
            formatter={formatCurrency}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "0.5rem",
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            }}
          />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#DC2626"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorBalance)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

