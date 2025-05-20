// Type definitions for the Web Speech API
interface SpeechRecognitionErrorEvent extends Event {
    error: string
    message?: string
}

interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList
    resultIndex: number
    interpretation: Record<string, unknown>
  }
  
  // Define the SpeechRecognition interface
  interface SpeechRecognition extends EventTarget {
    continuous: boolean
    interimResults: boolean
    lang: string
    maxAlternatives: number
    onaudioend: ((this: SpeechRecognition, ev: Event) => void) | null
    onaudiostart: ((this: SpeechRecognition, ev: Event) => void) | null
    onend: ((this: SpeechRecognition, ev: Event) => void) | null
    onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void) | null
    onnomatch: ((this: SpeechRecognition, ev: Event) => void) | null
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void) | null
    onsoundend: ((this: SpeechRecognition, ev: Event) => void) | null
    onsoundstart: ((this: SpeechRecognition, ev: Event) => void) | null
    onspeechend: ((this: SpeechRecognition, ev: Event) => void) | null
    onspeechstart: ((this: SpeechRecognition, ev: Event) => void) | null
    onstart: ((this: SpeechRecognition, ev: Event) => void) | null
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
    onboundary: ((this: SpeechSynthesisUtterance, ev: Event) => void) | null
    onend: ((this: SpeechSynthesisUtterance, ev: Event) => void) | null
    onerror: ((this: SpeechSynthesisUtterance, ev: Event) => void) | null
    onmark: ((this: SpeechSynthesisUtterance, ev: Event) => void) | null
    onpause: ((this: SpeechSynthesisUtterance, ev: Event) => void) | null
    onresume: ((this: SpeechSynthesisUtterance, ev: Event) => void) | null
    onstart: ((this: SpeechSynthesisUtterance, ev: Event) => void) | null
  }
  
  interface CustomSpeechSynthesisUtteranceConstructor {
    new (text?: string): CustomSpeechSynthesisUtterance
    prototype: CustomSpeechSynthesisUtterance
  }
  
  // Get the appropriate SpeechRecognition constructor based on browser
  let SpeechRecognitionAPI: SpeechRecognitionConstructor | undefined
  interface SpeechGrammarList {
    addFromString(string: string, weight?: number): void;
    addFromURI(src: string, weight?: number): void;
    item(index: number): SpeechGrammar;
    readonly length: number;
  }

  interface SpeechGrammar {
    src: string;
    weight: number;
  }

  let SpeechGrammarList: { new (): SpeechGrammarList } | undefined
  let SpeechSynthesisUtteranceAPI: CustomSpeechSynthesisUtteranceConstructor | undefined
  
  // Initialize the speech recognition and synthesis APIs if in browser environment
  interface ExtendedWindow extends Window {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
      mozSpeechRecognition?: SpeechRecognitionConstructor;
      msSpeechRecognition?: SpeechRecognitionConstructor;
      SpeechSynthesisUtterance?: CustomSpeechSynthesisUtteranceConstructor;
      SpeechGrammarList?: { new (): SpeechGrammarList };
      webkitSpeechGrammarList?: { new (): SpeechGrammarList };
      mozSpeechGrammarList?: { new (): SpeechGrammarList };
      msSpeechGrammarList?: { new (): SpeechGrammarList };
  }

  if (typeof window !== "undefined") {
    SpeechRecognitionAPI =
      (window as ExtendedWindow).SpeechRecognition ||
      (window as ExtendedWindow).webkitSpeechRecognition ||
      (window as ExtendedWindow).mozSpeechRecognition ||
      (window as ExtendedWindow).msSpeechRecognition
    SpeechGrammarList =
      (window as ExtendedWindow).SpeechGrammarList ||
      (window as ExtendedWindow).webkitSpeechGrammarList ||
      (window as ExtendedWindow).mozSpeechGrammarList ||
      (window as ExtendedWindow).msSpeechGrammarList
    SpeechSynthesisUtteranceAPI = (window as ExtendedWindow).SpeechSynthesisUtterance
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
      } catch {
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
    private handleError(event: SpeechRecognitionErrorEvent): void {
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
  