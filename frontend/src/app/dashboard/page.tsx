"use client"

import { useEffect, useState } from "react"
import { DollarSign, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AccountBalanceChart } from "@/components/dashboard/account-balance-chart"
import { InvestmentAllocationChart } from "@/components/dashboard/investment-allocation-chart"
import { InvestmentsList } from "@/components/dashboard/investments-list"
import { MonthlyDividendsChart } from "@/components/dashboard/monthly-dividends-chart"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ChatbotInterface } from "@/components/chatbot/chatbot-interface"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const [accountBalance, setAccountBalance] = useState("120,000.00")
  const [activeTimeframe, setActiveTimeframe] = useState("6m")

  useEffect(() => {
    // Get the initial balance from localStorage
    const storedBalance = localStorage.getItem("userInitialBalance")
    if (storedBalance) {
      // Format the balance with commas
      const formattedBalance = Number.parseInt(storedBalance).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      setAccountBalance(formattedBalance)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader />

      <main className="container py-6 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between py-4">
          <h1 className="text-2xl font-bold tracking-tight text-black">Dashboard</h1>
        </div>

        {/* Row 1: Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 my-4">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-gray-500">Total Account Balance</CardTitle>
              <DollarSign className="w-4 h-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-black">${accountBalance}</div>
              <p className="text-xs text-gray-500 mt-1">Updated April 5, 2025</p>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-gray-500">Account Growth</CardTitle>
              <TrendingUp className="w-4 h-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <div className="text-3xl font-bold text-green-600">+12.3%</div>
                <span className="ml-2 text-sm text-gray-500">since inception</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">+2.4% past month</p>
            </CardContent>
          </Card>
        </div>

        {/* Row 2: Account Balance Chart with Investments Table */}
        <div className="my-4">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-medium text-black">Account Balance & Investments</CardTitle>
                  <CardDescription className="text-gray-500">Portfolio performance and holdings</CardDescription>
                </div>
                <div className="flex space-x-1 text-xs">
                  {["1m", "3m", "6m", "1y", "All"].map((timeframe) => (
                    <Button
                      key={timeframe}
                      variant={activeTimeframe === timeframe ? "default" : "outline"}
                      size="sm"
                      className={`h-7 px-2 text-xs ${
                        activeTimeframe === timeframe
                          ? "bg-red-600 text-white hover:bg-red-700"
                          : "text-gray-600 hover:text-black"
                      }`}
                      onClick={() => setActiveTimeframe(timeframe)}
                    >
                      {timeframe}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4 pb-0">
              <div className="h-[250px]">
                <AccountBalanceChart />
              </div>
            </CardContent>

            {/* Investments Table - Integrated in the same card */}
            <div className="px-6 pt-2 pb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-500">Your Investments</h3>
                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-red-600 hover:text-red-700">
                  View All
                </Button>
              </div>
              <InvestmentsList />
            </div>
          </Card>
        </div>

        {/* Row 3: Allocation and Monthly Dividends */}
        <div className="grid gap-4 md:grid-cols-2 my-4">
          {/* Left side - Allocation Chart */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-black">Current Allocation</CardTitle>
              <CardDescription className="text-gray-500">Asset distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <InvestmentAllocationChart />
            </CardContent>
          </Card>

          {/* Right - Monthly Dividends */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-black">Monthly Dividends</CardTitle>
              <CardDescription className="text-gray-500">Past, current and projected</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline mb-4">
                <div className="text-2xl font-bold text-black">$320.00</div>
                <span className="ml-2 text-xs text-green-600 font-semibold">+5.2%</span>
                <span className="ml-1 text-xs text-gray-500">from previous month</span>
              </div>
              <MonthlyDividendsChart />
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Chatbot Interface */}
      <ChatbotInterface />
    </div>
  )
}

