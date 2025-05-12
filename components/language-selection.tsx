"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronRight, ArrowLeft, Check } from "lucide-react"

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

const languages = [
  {
    id: "en",
    name: "English",
    flag: "🇬🇧",
  },
  {
    id: "lg",
    name: "Luganda",
    flag: "🇺🇬",
  },
  {
    id: "sw",
    name: "Swahili",
    flag: "🇹🇿",
  },
]

interface LanguageSelectionProps {
  onNext: () => void
}

export function LanguageSelection({ onNext }: LanguageSelectionProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)

  return (
    <motion.div className="w-full max-w-md" initial="hidden" animate="visible" variants={staggerContainer}>
      <motion.div variants={fadeIn} className="mb-8 text-center">
        <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Choose Your Language</h1>
        <p className="text-gray-600 dark:text-gray-300">Select the language you&apos;re most comfortable with</p>
      </motion.div>

      <motion.div variants={fadeIn} className="space-y-4 mb-8">
        {languages.map((language) => (
          <Card
            key={language.id}
            className={`p-4 cursor-pointer transition-all duration-200 ${
              selectedLanguage === language.id
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                : "glassmorphism hover:border-blue-300 dark:hover:border-blue-700"
            }`}
            onClick={() => setSelectedLanguage(language.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-3xl">{language.flag}</div>
                <span className="text-lg font-medium text-gray-800 dark:text-gray-100">{language.name}</span>
              </div>
              {selectedLanguage === language.id && <Check className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
            </div>
          </Card>
        ))}
      </motion.div>

      <motion.div variants={fadeIn} className="flex gap-3">
        <Button variant="outline" onClick={() => window.history.back()} className="flex-1">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!selectedLanguage}
          className="flex-1 sauti-gradient hover:opacity-90 transition-opacity"
        >
          Continue <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </motion.div>
  )
}
