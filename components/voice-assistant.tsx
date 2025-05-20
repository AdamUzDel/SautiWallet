"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Mic, X, Send } from "lucide-react"
import { getVoiceAssistant } from "@/lib/voice-assistant"
import { chatWithGemini } from "@/lib/gemini/client"
import { useTranslations } from "next-intl"

interface VoiceAssistantProps {
  onClose: () => void
}

export function VoiceAssistant({ onClose }: VoiceAssistantProps) {
  const t = useTranslations()
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [response, setResponse] = useState("")
  const [isResponding, setIsResponding] = useState(false)
  const [isSpeechSupported, setIsSpeechSupported] = useState(true)
  const voiceAssistantRef = useRef<ReturnType<typeof getVoiceAssistant> | null>(null)

  // Initialize voice assistant
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        voiceAssistantRef.current = getVoiceAssistant()
        setIsSpeechSupported(voiceAssistantRef.current.isSupported())
      } catch (error) {
        console.error("Error initializing voice assistant:", error)
        setIsSpeechSupported(false)
      }
    }
  }, [])

  // Handle voice recognition
  const startListening = () => {
    if (!voiceAssistantRef.current || !isSpeechSupported) {
      // Fallback for browsers without speech recognition
      setIsListening(true)
      // Simulate voice recognition with a timeout
      setTimeout(() => {
        setTranscript("Send 20,000 UGX to Sarah for groceries")
        setIsListening(false)
        handleSendMessage()
      }, 3000)
      return
    }

    setIsListening(true)
    setTranscript("")
    setResponse("")

    voiceAssistantRef.current.startListening(
      (text) => {
        setTranscript(text)
        setIsListening(false)
        // Process the transcript
        if (text) {
          handleSendMessage(text)
        }
      },
      (error) => {
        console.error("Speech recognition error:", error)
        setIsListening(false)
      },
    )
  }

  // Handle sending message to AI
  const handleSendMessage = async (text = transcript) => {
    if (!text) return

    setIsResponding(true)

    try {
      // Use Gemini API for response
      const aiResponse = await chatWithGemini(
        [{ role: "user", content: text }],
        "You are Sauti, a helpful voice assistant for a mobile wallet app. Keep responses brief and focused on financial tasks.",
      )

      setResponse(aiResponse || "I'll send 20,000 UGX to Sarah for groceries. Is that correct?")
    } catch (error) {
      console.error("Error getting AI response:", error)
      // Fallback response
      setResponse("I'll send 20,000 UGX to Sarah for groceries. Is that correct?")
    } finally {
      setIsResponding(false)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden"
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full sauti-gradient flex items-center justify-center mr-2">
                <Mic className="h-4 w-4 text-white" />
              </div>
              <h2 className="font-medium text-gray-900 dark:text-white">{t("voice_assistant.title")}</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-4 h-64 overflow-y-auto flex flex-col">
            {!transcript && !response && (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  {isListening ? t("voice_assistant.listening") : t("voice_assistant.tap_mic")}
                </p>
                {isListening && (
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping"></div>
                    <div className="relative h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <Mic className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                )}
              </div>
            )}

            {transcript && (
              <div className="mb-4 self-end max-w-[80%]">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg rounded-br-none">
                  <p className="text-gray-800 dark:text-gray-200">{transcript}</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
                  {t("common.you")} • {t("voice_assistant.just_now")}
                </p>
              </div>
            )}

            {isResponding && (
              <div className="mb-4 self-start max-w-[80%]">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg rounded-bl-none flex items-center">
                  <div className="flex space-x-1">
                    <div
                      className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                    <div
                      className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "600ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {response && (
              <div className="mb-4 self-start max-w-[80%]">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg rounded-bl-none">
                  <p className="text-gray-800 dark:text-gray-200">{response}</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Sauti • {t("voice_assistant.just_now")}</p>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center">
            <Button
              variant="outline"
              size="icon"
              className={`rounded-full h-10 w-10 mr-3 ${isListening ? "bg-red-100 text-red-600 border-red-300" : ""}`}
              onClick={startListening}
            >
              <Mic className="h-5 w-5" />
            </Button>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder={t("voice_assistant.type_message")}
                className="w-full rounded-full bg-gray-100 dark:bg-gray-700 border-0 py-2 px-4 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-blue-600 dark:text-blue-400"
                onClick={() => handleSendMessage()}
                disabled={!transcript}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {response && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
              <Button variant="outline">{t("common.cancel")}</Button>
              <Button className="sauti-gradient hover:opacity-90 transition-opacity">{t("common.send_money")}</Button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
