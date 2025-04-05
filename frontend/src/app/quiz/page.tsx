"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { LoadingScreen } from "@/components/loading-screen"

export default function QuizPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [showLoading, setShowLoading] = useState(false)
  const [formData, setFormData] = useState({
    risk_score: 5,
    reaction_to_loss: "",
    returns_preference: "",
    investment_horizon_years: "",
    goal_type: "",
    goal_description: "",
    liquidity_preference: 5,
    asset_preferences: ["stocks", "bonds"] as string[],
    initial_balance: "120000", // Default value for initial balance
  })

  const totalSteps = 8 // Increased by 1 for the new question
  const progress = ((currentStep + 1) / totalSteps) * 100

  const updateFormData = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleAssetPreferenceChange = (asset: string, checked: boolean) => {
    // Don't allow unchecking stocks or bonds
    if ((asset === "stocks" || asset === "bonds") && !checked) {
      return
    }

    if (checked) {
      updateFormData("asset_preferences", [...formData.asset_preferences, asset])
    } else {
      updateFormData(
        "asset_preferences",
        formData.asset_preferences.filter((a) => a !== asset),
      )
    }
  }

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Submit form data
      console.log("Form data to submit:", formData)

      // Store the initial balance in localStorage for the dashboard to use
      localStorage.setItem("userInitialBalance", formData.initial_balance)

      // Show loading screen
      setShowLoading(true)

      // Navigate to dashboard after a delay
      setTimeout(() => {
        router.push("/dashboard")
      }, 5000) // 5 seconds delay
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isNextDisabled = () => {
    switch (currentStep) {
      case 1:
        return !formData.reaction_to_loss
      case 2:
        return !formData.returns_preference
      case 3:
        return !formData.investment_horizon_years
      case 4:
        return !formData.goal_type
      case 7:
        return !formData.initial_balance // Check for initial balance
      default:
        return false
    }
  }

  // Format currency input
  const formatCurrency = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "")

    // Convert to number and format with commas
    if (digits) {
      const number = Number.parseInt(digits, 10)
      return number.toLocaleString("en-US")
    }
    return ""
  }

  // Handle currency input change
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Store raw digits in state
    const digits = value.replace(/\D/g, "")
    updateFormData("initial_balance", digits)
  }

  const steps = [
    // Question 1: Risk Tolerance Slider
    <motion.div
      key="risk-tolerance"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-black">Risk Tolerance</h2>
      <div className="space-y-4">
        <Label className="text-lg font-medium text-black">
          On a scale of 1–10, how comfortable are you with taking investment risks?
        </Label>
        <div className="space-y-6">
          <Slider
            defaultValue={[formData.risk_score]}
            max={10}
            min={1}
            step={1}
            onValueChange={(value) => updateFormData("risk_score", value[0])}
            className="py-4"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>Low Risk (1)</span>
            <span>High Risk (10)</span>
          </div>
          <div className="text-center text-xl font-bold text-red-600">{formData.risk_score}</div>
        </div>
      </div>
    </motion.div>,

    // Question 2: Reaction to Loss
    <motion.div
      key="reaction-to-loss"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-black">Risk Tolerance</h2>
      <div className="space-y-4">
        <Label className="text-lg font-medium text-black">
          How would you react if your portfolio dropped by 15% in a month?
        </Label>
        <RadioGroup
          value={formData.reaction_to_loss}
          onValueChange={(value) => updateFormData("reaction_to_loss", value)}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2 rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition-colors">
            <RadioGroupItem value="sell_all" id="sell_all" />
            <Label htmlFor="sell_all" className="flex-1 cursor-pointer text-black">
              Sell everything
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition-colors">
            <RadioGroupItem value="sell_some" id="sell_some" />
            <Label htmlFor="sell_some" className="flex-1 cursor-pointer text-black">
              Sell some investments
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition-colors">
            <RadioGroupItem value="hold" id="hold" />
            <Label htmlFor="hold" className="flex-1 cursor-pointer text-black">
              Hold and wait
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition-colors">
            <RadioGroupItem value="invest_more" id="invest_more" />
            <Label htmlFor="invest_more" className="flex-1 cursor-pointer text-black">
              Invest more
            </Label>
          </div>
        </RadioGroup>
      </div>
    </motion.div>,

    // Question 3: Returns Preference
    <motion.div
      key="returns-preference"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-black">Risk Tolerance</h2>
      <div className="space-y-4">
        <Label className="text-lg font-medium text-black">Which returns/risk balance would you prefer?</Label>
        <Select
          value={formData.returns_preference}
          onValueChange={(value) => updateFormData("returns_preference", value)}
        >
          <SelectTrigger className="w-full bg-white border-gray-200 text-black">
            <SelectValue placeholder="Select your preference" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200 text-black">
            <SelectItem value="low_risk_low_return">Small gains with minimal risk</SelectItem>
            <SelectItem value="moderate_risk_return">Moderate gains with some risk</SelectItem>
            <SelectItem value="high_risk_high_return">High gains with high risk</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </motion.div>,

    // Question 4: Investment Horizon
    <motion.div
      key="investment-horizon"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-black">Investment Horizon</h2>
      <div className="space-y-4">
        <Label className="text-lg font-medium text-black">When will you need most of this money?</Label>
        <Select
          value={formData.investment_horizon_years}
          onValueChange={(value) => updateFormData("investment_horizon_years", value)}
        >
          <SelectTrigger className="w-full bg-white border-gray-200 text-black">
            <SelectValue placeholder="Select time horizon" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200 text-black">
            <SelectItem value="1">0-1 years</SelectItem>
            <SelectItem value="3">1-3 years</SelectItem>
            <SelectItem value="5">3-5 years</SelectItem>
            <SelectItem value="10">5-10 years</SelectItem>
            <SelectItem value="15">10+ years</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </motion.div>,

    // Question 5: Financial Goals
    <motion.div
      key="financial-goals"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-black">Financial Goals</h2>
      <div className="space-y-4">
        <Label className="text-lg font-medium text-black">What is your main goal for investing?</Label>
        <RadioGroup
          value={formData.goal_type}
          onValueChange={(value) => updateFormData("goal_type", value)}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2 rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition-colors">
            <RadioGroupItem value="retirement" id="retirement" />
            <Label htmlFor="retirement" className="flex-1 cursor-pointer text-black">
              Retirement
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition-colors">
            <RadioGroupItem value="home_purchase" id="home_purchase" />
            <Label htmlFor="home_purchase" className="flex-1 cursor-pointer text-black">
              Buy a Home
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition-colors">
            <RadioGroupItem value="wealth_building" id="wealth_building" />
            <Label htmlFor="wealth_building" className="flex-1 cursor-pointer text-black">
              Build General Wealth
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition-colors">
            <RadioGroupItem value="education_savings" id="education_savings" />
            <Label htmlFor="education_savings" className="flex-1 cursor-pointer text-black">
              Save for Child's Education
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition-colors">
            <RadioGroupItem value="business_funding" id="business_funding" />
            <Label htmlFor="business_funding" className="flex-1 cursor-pointer text-black">
              Start a Business
            </Label>
          </div>
        </RadioGroup>
      </div>
    </motion.div>,

    // Question 6: Liquidity Preference
    <motion.div
      key="liquidity-preference"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-black">Liquidity Preference</h2>
      <div className="space-y-4">
        <Label className="text-lg font-medium text-black">
          How important is liquidity (easy access to your money)?
        </Label>
        <div className="space-y-6">
          <Slider
            defaultValue={[formData.liquidity_preference]}
            max={10}
            min={1}
            step={1}
            onValueChange={(value) => updateFormData("liquidity_preference", value[0])}
            className="py-4"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>Not important (1)</span>
            <span>Very important (10)</span>
          </div>
          <div className="text-center text-xl font-bold text-red-600">{formData.liquidity_preference}</div>
        </div>
      </div>
    </motion.div>,

    // Question 7: Asset Type Preferences
    <motion.div
      key="asset-preferences"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-black">Asset Type Preferences</h2>
      <div className="space-y-4">
        <Label className="text-lg font-medium text-black">
          Which types of assets are you interested in investing in?
        </Label>
        <div className="space-y-3">
          {[
            { id: "stocks", label: "Stocks", disabled: true },
            { id: "bonds", label: "Bonds", disabled: true },
            { id: "real_estate", label: "Real Estate", disabled: false },
            { id: "commodities", label: "Commodities", disabled: false },
            { id: "crypto", label: "Crypto", disabled: false },
          ].map((asset) => (
            <div
              key={asset.id}
              className={`flex items-center space-x-2 rounded-lg border border-gray-200 p-4 ${asset.disabled ? "bg-gray-50" : "hover:bg-gray-50"} transition-colors`}
            >
              <Checkbox
                id={asset.id}
                checked={formData.asset_preferences.includes(asset.id)}
                onCheckedChange={(checked) => handleAssetPreferenceChange(asset.id, checked as boolean)}
                disabled={asset.disabled}
              />
              <Label
                htmlFor={asset.id}
                className={`flex-1 cursor-pointer text-black ${asset.disabled ? "opacity-70" : ""}`}
              >
                {asset.label}
                {asset.disabled && <span className="ml-2 text-xs text-gray-500">(Required)</span>}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </motion.div>,

    // NEW Question 8: Initial Account Balance
    <motion.div
      key="initial-balance"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-black">Initial Investment</h2>
      <div className="space-y-4">
        <Label className="text-lg font-medium text-black">How much would you like to invest initially?</Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500">$</span>
          </div>
          <Input
            type="text"
            value={formatCurrency(formData.initial_balance)}
            onChange={handleCurrencyChange}
            className="pl-8 bg-white border-gray-200 text-black"
            placeholder="Enter amount"
          />
        </div>
        <p className="text-sm text-gray-500">
          This is the amount you plan to invest with OptiVise. You can always add or withdraw funds later.
        </p>
      </div>
    </motion.div>,
  ]

  if (showLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-red-600">OptiVise</div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>
              Question {currentStep + 1} of {totalSteps}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" indicatorClassName="bg-red-600" />
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 min-h-[400px] flex flex-col">
          <div className="flex-1">
            <AnimatePresence mode="wait">{steps[currentStep]}</AnimatePresence>
          </div>

          <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex items-center gap-2 bg-white border-gray-300 text-black hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={isNextDisabled()}
              className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
            >
              {currentStep === totalSteps - 1 ? (
                <>
                  Submit
                  <Check className="h-4 w-4" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

