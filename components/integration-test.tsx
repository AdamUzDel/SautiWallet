"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, XCircle } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { GoogleGenAI } from "@google/genai"

export function IntegrationTest() {
  const [supabaseStatus, setSupabaseStatus] = useState<"loading" | "success" | "error">("loading")
  const [geminiStatus, setGeminiStatus] = useState<"loading" | "success" | "error">("loading")
  const [supabaseError, setSupabaseError] = useState<string | null>(null)
  const [geminiError, setGeminiError] = useState<string | null>(null)

  useEffect(() => {
    // Test Supabase connection
    async function testSupabase() {
      try {
        const { data, error } = await supabase.from("voice_assistants").select("count").limit(1)

        if (error) {
          setSupabaseStatus("error")
          setSupabaseError(error.message)
        } else {
          setSupabaseStatus("success")
        }
      } catch (err) {
        setSupabaseStatus("error")
        setSupabaseError(err instanceof Error ? err.message : "Unknown error")
      }
    }

    // Test Gemini connection using the latest API approach
    async function testGemini() {
      try {
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY

        if (!apiKey) {
          setGeminiStatus("error")
          setGeminiError("API key is not defined")
          return
        }

        // Initialize the Gemini API with the latest approach
        const genAI = new GoogleGenAI({apiKey: apiKey})

        // For text-only input, use the gemini-pro model
        //const model = genAI.getGenerativeModel({ model: "gemini-pro" })

        // Generate content using the latest API
        const response = await genAI.models.generateContent({
            model: "gemini-2.0-flash",
            contents: "Hello, are you working.",
          });
        const text = response.text

        if (text) {
          setGeminiStatus("success")
        } else {
          setGeminiStatus("error")
          setGeminiError("No response from Gemini")
        }
      } catch (err) {
        setGeminiStatus("error")
        setGeminiError(err instanceof Error ? err.message : "Unknown error")
      }
    }

    testSupabase()
    testGemini()
  }, [])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Integration Test</CardTitle>
        <CardDescription>Testing connections to Supabase and Gemini AI</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Supabase</h3>
            {supabaseStatus === "loading" && <p className="text-gray-500">Testing...</p>}
            {supabaseStatus === "success" && <CheckCircle2 className="h-6 w-6 text-green-500" />}
            {supabaseStatus === "error" && <XCircle className="h-6 w-6 text-red-500" />}
          </div>

          {supabaseStatus === "error" && (
            <Alert variant="destructive">
              <AlertTitle>Connection Error</AlertTitle>
              <AlertDescription>{supabaseError}</AlertDescription>
            </Alert>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Gemini AI</h3>
            {geminiStatus === "loading" && <p className="text-gray-500">Testing...</p>}
            {geminiStatus === "success" && <CheckCircle2 className="h-6 w-6 text-green-500" />}
            {geminiStatus === "error" && <XCircle className="h-6 w-6 text-red-500" />}
          </div>

          {geminiStatus === "error" && (
            <Alert variant="destructive">
              <AlertTitle>Connection Error</AlertTitle>
              <AlertDescription>{geminiError}</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => window.location.reload()} className="w-full">
          Test Again
        </Button>
      </CardFooter>
    </Card>
  )
}
