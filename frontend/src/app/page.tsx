import Link from "next/link"
import { ArrowRight, BarChart3, Shield, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedFeatureCard } from "@/components/animated-feature-card"
import { HeroAnimation } from "@/components/hero-animation"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-black">
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-red-600" />
            <span className="text-xl font-bold text-black">OptiVise</span>
          </div>
          <div className="flex items-center">
            <Link href="/login" className="text-sm font-medium hover:text-red-600 transition-colors text-black">
              Log in
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <HeroAnimation>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-black">
                  Opti<span className="text-red-600">Vise</span>
                </h1>
                <p className="mt-6 text-lg md:text-xl text-gray-600">Smarter, Personalized Investing for Your Future</p>
                <div className="mt-10 flex justify-center">
                  <Link href="/quiz">
                    <Button
                      size="lg"
                      className="group relative overflow-hidden rounded-full px-8 transition-all duration-300 hover:bg-red-700 bg-red-600 text-white border-0"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Start Your Investment Journey
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Button>
                  </Link>
                </div>
              </HeroAnimation>
            </div>
          </div>
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.08),transparent_65%)]"></div>
        </section>

        <section id="features" className="py-20 bg-gray-50">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-black">
                Intelligent Investment Solutions
              </h2>
              <p className="mt-4 text-gray-600">
                Our AI-powered platform optimizes your investments based on your unique financial goals and risk
                tolerance.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatedFeatureCard
                icon={<BarChart3 className="h-10 w-10" />}
                title="Data-Driven Insights"
                description="Advanced algorithms analyze market trends to make informed investment decisions tailored to your goals."
              />
              <AnimatedFeatureCard
                icon={<Shield className="h-10 w-10" />}
                title="Risk Management"
                description="Sophisticated risk assessment tools help protect your investments during market volatility."
              />
              <AnimatedFeatureCard
                icon={<TrendingUp className="h-10 w-10" />}
                title="Portfolio Optimization"
                description="Continuous rebalancing ensures your portfolio maintains optimal performance aligned with your objectives."
              />
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 bg-white">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-black">How OptiVise Works</h2>
              <p className="mt-4 text-gray-600">
                Our streamlined process makes investing simple, smart, and personalized.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative flex flex-col items-center p-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="absolute -top-4 -left-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white font-bold text-lg">
                  1
                </div>
                <h3 className="mt-4 text-xl font-bold text-black">Define Your Goals</h3>
                <p className="mt-2 text-center text-gray-600">
                  Tell us about your financial objectives, timeline, and risk tolerance through our intuitive
                  questionnaire.
                </p>
              </div>
              <div className="relative flex flex-col items-center p-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="absolute -top-4 -left-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white font-bold text-lg">
                  2
                </div>
                <h3 className="mt-4 text-xl font-bold text-black">AI Portfolio Creation</h3>
                <p className="mt-2 text-center text-gray-600">
                  Our advanced algorithms design a diversified portfolio optimized for your specific needs.
                </p>
              </div>
              <div className="relative flex flex-col items-center p-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="absolute -top-4 -left-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white font-bold text-lg">
                  3
                </div>
                <h3 className="mt-4 text-xl font-bold text-black">Automated Management</h3>
                <p className="mt-2 text-center text-gray-600">
                  Sit back as our system continuously monitors and adjusts your investments for optimal performance.
                </p>
              </div>
            </div>
            <div className="mt-16 text-center">
              <Link href="/quiz">
                <Button size="lg" className="rounded-full px-8 bg-red-600 hover:bg-red-700 text-white border-0">
                  Start with Your Preferences
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-gray-200 py-8 bg-white">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-red-600" />
            <span className="text-lg font-bold text-black">OptiVise</span>
          </div>
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} OptiVise. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-gray-500 hover:text-black transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-black transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-black transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

