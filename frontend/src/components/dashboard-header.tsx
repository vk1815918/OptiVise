import Link from "next/link"
import { TrendingUp } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <TrendingUp className="h-6 w-6 text-red-600" />
          <span className="text-xl font-bold text-black">OptiVise</span>
        </Link>
      </div>
    </header>
  )
}

