"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mic, ChevronRight, Globe } from "lucide-react"
import { LanguageSelection } from "@/components/language-selection"
import { VoiceAssistantSetup } from "@/components/voice-assistant-setup"
import Link from "next/link"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export function OnboardingScreen() {
  const [step, setStep] = useState(0)

  const nextStep = () => {
    setStep((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-4">
      {step === 0 && (
        <motion.div className="w-full max-w-md" initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.div variants={fadeIn} className="mb-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="h-24 w-24 rounded-full sauti-gradient flex items-center justify-center">
                <Mic className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Welcome to SautiWallet</h1>
            <p className="text-gray-600 dark:text-gray-300">Your voice-powered financial companion</p>
          </motion.div>

          <motion.div variants={fadeIn}>
            <Card className="glassmorphism p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                Financial freedom through voice
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                SautiWallet helps you manage money, save with your community, and build financial security—all through
                simple voice commands in your language.
              </p>
              <div className="flex flex-col gap-3 mt-6">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <Globe className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Speak in your local language</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <svg
                      className="h-4 w-4 text-blue-600 dark:text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Send, save, and manage money easily</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <svg
                      className="h-4 w-4 text-blue-600 dark:text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Support for village savings groups (SACCO)</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeIn}>
            <Button
              onClick={nextStep}
              className="w-full py-6 text-lg sauti-gradient hover:opacity-90 transition-opacity"
            >
              Get Started <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      )}

      {step === 1 && <LanguageSelection onNext={nextStep} />}
      {step === 2 && <VoiceAssistantSetup onNext={nextStep} />}
      {step === 3 && (
        <motion.div
          className="w-full max-w-md text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="h-24 w-24 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <svg
                  className="h-12 w-12 text-green-600 dark:text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">You're all set!</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">Your SautiWallet is ready to use</p>

            <Link href="/dashboard" passHref>
              <Button className="w-full py-6 text-lg sauti-gradient hover:opacity-90 transition-opacity">
                Go to Dashboard <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
