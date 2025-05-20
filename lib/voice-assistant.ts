// Type definitions for the Web Speech API
interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList
    resultIndex: number
    interpretation: any
  }
  
  // Define the SpeechRecognition interface
  interface SpeechRecognition extends EventTarget {
    continuous: boolean
    interimResults: boolean
    lang: string
    maxAlternatives: number
    onaudioend: ((this: SpeechRecognition, ev: Event) => any) | null
    onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null
    onend: ((this: SpeechRecognition, ev: Event) => any) | null
    onerror: ((this: SpeechRecognition, ev: Event) => any) | null
    onnomatch: ((this: SpeechRecognition, ev: Event) => any) | null
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null
    onsoundend: ((this: SpeechRecognition, ev: Event) => any) | null
    onsoundstart: ((this: SpeechRecognition, ev: Event) => any) | null
    onspeechend: ((this: SpeechRecognition, ev: Event) => any) | null
    onspeechstart: ((this: SpeechRecognition, ev: Event) => any) | null
    onstart: ((this: SpeechRecognition, ev: Event) => any) | null
    start(): void
    stop(): void
    abort(): void
  }
  
  interface SpeechRecognitionConstructor {
    new (): SpeechRecognition
    prototype: SpeechRecognition
  }
  
  // Define a more complete SpeechSynthesisUtterance interface
  interface CustomSpeechSynthesisUtterance extends EventTarget {
    lang: string
    pitch: number
    rate: number
    text: string
    voice: SpeechSynthesisVoice | null
    volume: number
    onboundary: ((this: SpeechSynthesisUtterance, ev: Event) => any) | null
    onend: ((this: SpeechSynthesisUtterance, ev: Event) => any) | null
    onerror: ((this: SpeechSynthesisUtterance, ev: Event) => any) | null
    onmark: ((this: SpeechSynthesisUtterance, ev: Event) => any) | null
    onpause: ((this: SpeechSynthesisUtterance, ev: Event) => any) | null
    onresume: ((this: SpeechSynthesisUtterance, ev: Event) => any) | null
    onstart: ((this: SpeechSynthesisUtterance, ev: Event) => any) | null
  }
  
  interface CustomSpeechSynthesisUtteranceConstructor {
    new (text?: string): CustomSpeechSynthesisUtterance
    prototype: CustomSpeechSynthesisUtterance
  }
  
  // Get the appropriate SpeechRecognition constructor based on browser
  let SpeechRecognitionAPI: SpeechRecognitionConstructor | undefined
  let SpeechGrammarList: any
  let SpeechSynthesisUtteranceAPI: CustomSpeechSynthesisUtteranceConstructor | undefined
  
  // Initialize the speech recognition and synthesis APIs if in browser environment
  if (typeof window !== "undefined") {
    SpeechRecognitionAPI =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition ||
      (window as any).mozSpeechRecognition ||
      (window as any).msSpeechRecognition
  
    SpeechGrammarList =
      (window as any).SpeechGrammarList ||
      (window as any).webkitSpeechGrammarList ||
      (window as any).mozSpeechGrammarList ||
      (window as any).msSpeechGrammarList
  
    SpeechSynthesisUtteranceAPI = (window as any).SpeechSynthesisUtterance as CustomSpeechSynthesisUtteranceConstructor
  }
  
  // Voice assistant class
  export class VoiceAssistant {
    private recognition: SpeechRecognition | null = null
    private synthesis: typeof window.speechSynthesis | null = null
    private language: string
    private isListening = false
    private onResultCallback: ((text: string) => void) | null = null
    private onErrorCallback: ((error: string) => void) | null = null
  
    constructor(language = "en-US") {
      this.language = language
  
      // Initialize only in browser environment
      if (typeof window !== "undefined") {
        if (SpeechRecognitionAPI) {
          this.recognition = new SpeechRecognitionAPI()
          this.recognition.continuous = false
          this.recognition.interimResults = false
          this.recognition.lang = this.language
  
          this.recognition.onresult = this.handleResult.bind(this)
          this.recognition.onerror = this.handleError.bind(this)
          this.recognition.onend = this.handleEnd.bind(this)
        }
  
        this.synthesis = window.speechSynthesis
      }
    }
  
    // Check if speech recognition is supported
    public isSupported(): boolean {
      return !!this.recognition
    }
  
    // Start listening
    public startListening(onResult?: (text: string) => void, onError?: (error: string) => void): boolean {
      if (!this.recognition) {
        if (onError) onError("Speech recognition not supported in this browser")
        return false
      }
  
      if (this.isListening) {
        this.stopListening()
      }
  
      this.onResultCallback = onResult || null
      this.onErrorCallback = onError || null
  
      try {
        this.recognition.start()
        this.isListening = true
        return true
      } catch (error) {
        if (onError) onError("Failed to start speech recognition")
        return false
      }
    }
  
    // Stop listening
    public stopListening(): void {
      if (this.recognition && this.isListening) {
        try {
          this.recognition.stop()
        } catch (error) {
          console.error("Error stopping speech recognition:", error)
        }
        this.isListening = false
      }
    }
  
    // Speak text
    public speak(text: string, voice?: SpeechSynthesisVoice): boolean {
      if (!this.synthesis || !SpeechSynthesisUtteranceAPI) {
        return false
      }
  
      // Use the custom interface to avoid TypeScript errors
      const utterance = new SpeechSynthesisUtteranceAPI(text)
      utterance.lang = this.language
  
      if (voice) {
        utterance.voice = voice
      }
  
      this.synthesis.speak(utterance)
      return true
    }
  
    // Set language
    public setLanguage(language: string): void {
      this.language = language
      if (this.recognition) {
        this.recognition.lang = language
      }
    }
  
    // Get available voices
    public getVoices(): SpeechSynthesisVoice[] {
      if (!this.synthesis) {
        return []
      }
      return this.synthesis.getVoices()
    }
  
    // Handle speech recognition result
    private handleResult(event: SpeechRecognitionEvent): void {
      if (event.results.length > 0) {
        const transcript = event.results[event.results.length - 1][0].transcript
        if (this.onResultCallback) {
          this.onResultCallback(transcript)
        }
      }
    }
  
    // Handle speech recognition error
    private handleError(event: any): void {
      this.isListening = false
      if (this.onErrorCallback) {
        this.onErrorCallback(`Speech recognition error: ${event.error}`)
      }
    }
  
    // Handle speech recognition end
    private handleEnd(): void {
      this.isListening = false
    }
  }
  
  // Create and export a singleton instance
  let voiceAssistantInstance: VoiceAssistant | null = null
  
  export function getVoiceAssistant(language = "en-US"): VoiceAssistant {
    if (!voiceAssistantInstance) {
      voiceAssistantInstance = new VoiceAssistant(language)
    }
    return voiceAssistantInstance
  }
  