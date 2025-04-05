"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TrendingUp } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const facts = [
  "  Your investments are powered by state-of-the-art AI portfolio technologies.",
  "  OptiVise tailors your portfolio for maximum risk-adjusted returns.",
  "  Cutting-edge algorithms, personalized to your financial goals.",
  "  Your financial future, backed by innovation and data-driven insights.",
]

export function LoadingScreen() {
  const [currentFact, setCurrentFact] = useState(0)
  const [progress, setProgress] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  // Typewriter effect
  useEffect(() => {
    const fact = facts[currentFact]
    let index = 0
    setDisplayedText("")

    const typingInterval = setInterval(() => {
      if (index < fact.length) {
        setDisplayedText((prev) => prev + fact.charAt(index))
        index++
      } else {
        setIsTyping(false)
        clearInterval(typingInterval)

        // Wait before moving to next fact
        setTimeout(() => {
          setIsTyping(true)
          setCurrentFact((prev) => (prev + 1) % facts.length)
        }, 2000)
      }
    }, 10) // typing speed

    return () => clearInterval(typingInterval)
  }, [currentFact])

  // Progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="flex items-center justify-center mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <TrendingUp className="h-10 w-10 text-red-600" />
            <span className="text-3xl font-bold text-black">
              Opti<span className="text-red-600">Vise</span>
            </span>
          </motion.div>
        </div>

        <div className="mb-8 h-20 flex items-center justify-center">
          <motion.p
            key={currentFact}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-lg text-gray-700"
          >
            {displayedText}
            {isTyping && <span className="inline-block w-2 h-4 ml-1 bg-red-600 animate-pulse"></span>}
          </motion.p>
        </div>

        <div className="w-full mb-4">
          <Progress value={progress} className="h-2" indicatorClassName="bg-red-600" />
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>Analyzing your preferences</span>
            <span>{progress}%</span>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              ease: "linear",
            }}
            className="w-10 h-10 border-t-2 border-r-2 border-red-600 rounded-full"
          />
        </div>
      </div>
    </div>
  )
}

