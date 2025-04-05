"use client"

import type React from "react"

import { useRef } from "react"
import { useInView } from "framer-motion"

interface AnimatedFeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export function AnimatedFeatureCard({ icon, title, description }: AnimatedFeatureCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

  return (
    <div
      ref={ref}
      className="flex flex-col items-center p-6 rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-700 ease-out"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0px)" : "translateY(40px)",
      }}
    >
      <div className="mb-4 rounded-full bg-red-50 p-3">
        <div className="text-red-600">{icon}</div>
      </div>
      <h3 className="text-xl font-bold text-black">{title}</h3>
      <p className="mt-2 text-center text-gray-600">{description}</p>
    </div>
  )
}

