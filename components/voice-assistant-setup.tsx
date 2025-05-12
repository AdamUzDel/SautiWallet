"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronRight, ArrowLeft, Mic, Volume2 } from "lucide-react"

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

const voiceOptions = [
  {
    id: "female-en",
    name: "Sarah (Female)",
    language: "English",
    preview: "Hello, I'm Sarah. I'll help you manage your finances.",
  },
  {
    id: "male-en",
    name: "David (Male)",
    language: "English",
    preview: "Hi there, I'm David. Let me assist with your money matters.",
  },
  {
    id: "female-lg",
    name: "Nakato (Female)",
    language: "Luganda",
    preview: "Oli otya, nze Nakato. Nja kukuyamba n'ensimbi zo.",
  },
  {
    id: "male-lg",
    name: "Kato (Male)",
    language: "Luganda",
    preview: "Oli otya ssebo/nnyabo, nze Kato. Ka nkuyambe ku by'ensimbi.",
  },
]

interface VoiceAssistantSetupProps {
  onNext: () => void
}

export function VoiceAssistantSetup({ onNext }: VoiceAssistantSetupProps) {
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState<string | null>(null)

  const handlePlayPreview = (voiceId: string) => {
    setIsPlaying(voiceId)
    // Simulate audio playback
    setTimeout(() => {
      setIsPlaying(null)
    }, 3000)
  }

  const handleRecordTest = () => {
    setIsRecording(true)
    // Simulate recording
    setTimeout(() => {
      setIsRecording(false)
    }, 3000)
  }

  return (
    <motion.div className="w-full max-w-md" initial="hidden" animate="visible" variants={staggerContainer}>
      <motion.div variants={fadeIn} className="mb-8 text-center">
        <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Choose Your Voice Assistant</h1>
        <p className="text-gray-600 dark:text-gray-300">Select a voice that you&apos;ll be comfortable talking with</p>
      </motion.div>

      <motion.div variants={fadeIn} className="space-y-4 mb-8">
        {voiceOptions.map((voice) => (
          <Card
            key={voice.id}
            className={`p-4 cursor-pointer transition-all duration-200 ${
              selectedVoice === voice.id
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                : "glassmorphism hover:border-blue-300 dark:hover:border-blue-700"
            }`}
            onClick={() => setSelectedVoice(voice.id)}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-gray-100">{voice.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{voice.language}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePlayPreview(voice.id)
                  }}
                >
                  {isPlaying === voice.id ? (
                    <span className="h-4 w-4 block relative">
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="h-1.5 w-1.5 bg-blue-600 dark:bg-blue-400 rounded-full animate-ping"></span>
                      </span>
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="h-3 w-3 bg-blue-600 dark:bg-blue-400 rounded-full opacity-70"></span>
                      </span>
                    </span>
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 italic">&quot;{voice.preview}&quot;</p>
            </div>
          </Card>
        ))}
      </motion.div>

      {selectedVoice && (
        <motion.div variants={fadeIn} className="mb-8 flex flex-col items-center">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center">
            Test your microphone by saying &quot;Hello Sauti&quot;
          </p>
          <Button
            variant="outline"
            size="lg"
            className={`rounded-full h-16 w-16 p-0 ${isRecording ? "voice-pulse bg-red-100 text-red-600" : ""}`}
            onClick={handleRecordTest}
          >
            <Mic className={`h-6 w-6 ${isRecording ? "text-red-600" : ""}`} />
          </Button>
          {isRecording && <p className="text-sm text-red-600 dark:text-red-400 mt-2 animate-pulse">Listening...</p>}
        </motion.div>
      )}

      <motion.div variants={fadeIn} className="flex gap-3">
        <Button variant="outline" onClick={() => window.history.back()} className="flex-1">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!selectedVoice}
          className="flex-1 sauti-gradient hover:opacity-90 transition-opacity"
        >
          Continue <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </motion.div>
  )
}
