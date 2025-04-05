"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Investment data JSON structure
const investmentsData = [
  {
    name: "S&P 500 ETF",
    type: "ETF",
    dailyChange: {
      amount: 213.8,
      percent: 0.45,
    },
    currentPrice: 400,
    quantityOwned: 120,
    value: 48000,
    allocationPercent: 40,
  },
  {
    name: "US Treasury Bonds",
    type: "Bond",
    dailyChange: {
      amount: 45.1,
      percent: 0.19,
    },
    currentPrice: 120,
    quantityOwned: 200,
    value: 24000,
    allocationPercent: 20,
  },
  {
    name: "Tech Growth Fund",
    type: "Fund",
    dailyChange: {
      amount: 132.5,
      percent: 0.74,
    },
    currentPrice: 120,
    quantityOwned: 150,
    value: 18000,
    allocationPercent: 15,
  },
  {
    name: "Apple Inc.",
    type: "Stock",
    dailyChange: {
      amount: -24.6,
      percent: -0.21,
    },
    currentPrice: 240,
    quantityOwned: 50,
    value: 12000,
    allocationPercent: 10,
  },
  {
    name: "Microsoft Corp.",
    type: "Stock",
    dailyChange: {
      amount: 18.2,
      percent: 0.3,
    },
    currentPrice: 240,
    quantityOwned: 25,
    value: 6000,
    allocationPercent: 5,
  },
  {
    name: "Real Estate Trust",
    type: "REIT",
    dailyChange: {
      amount: 56.4,
      percent: 0.47,
    },
    currentPrice: 60,
    quantityOwned: 200,
    value: 12000,
    allocationPercent: 10,
  },
]

export function InvestmentsList() {
  // Format currency with $ sign and commas
  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString("en-US")}`
  }

  // Format percentage with + or - sign
  const formatPercent = (value: number) => {
    return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`
  }

  // Format daily change amount with + or - sign
  const formatChange = (value: number) => {
    return `${value > 0 ? "+" : ""}$${Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}`
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-200">
            <TableHead className="py-2">Name</TableHead>
            <TableHead className="py-2">Type</TableHead>
            <TableHead className="py-2 text-right">Daily Change</TableHead>
            <TableHead className="py-2 text-right">Value</TableHead>
            <TableHead className="py-2 text-right">Allocation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {investmentsData.map((investment, index) => (
            <TableRow key={index} className="border-b border-gray-100">
              <TableCell className="py-2 font-medium">{investment.name}</TableCell>
              <TableCell className="py-2 text-gray-600">{investment.type}</TableCell>
              <TableCell className="py-2 text-right">
                <span className={investment.dailyChange.amount >= 0 ? "text-green-600" : "text-red-600"}>
                  {formatChange(investment.dailyChange.amount)} ({formatPercent(investment.dailyChange.percent)})
                </span>
              </TableCell>
              <TableCell className="py-2 text-right">{formatCurrency(investment.value)}</TableCell>
              <TableCell className="py-2 text-right">{investment.allocationPercent}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

