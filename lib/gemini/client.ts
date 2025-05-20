import { GoogleGenAI  } from "@google/genai"

// Initialize the Gemini API client
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
const genAI = new GoogleGenAI({ apiKey: apiKey });

// Helper function to generate text with Gemini
export async function generateText(prompt: string): Promise<string> {
  try {
    // For text-only input, use the gemini-pro model
    //const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    // Generate content
    //const result = await model.generateContent(prompt)
    //const response = await result.response
    return response.text || "No response"
  } catch (error) {
    console.error("Error generating text with Gemini:", error)
    return "Sorry, I couldn't process that request."
  }
}

// Helper function for chat-based interactions
export async function chatWithGemini(
  messages: Array<{ role: "user" | "model"; content: string }>,
  systemInstruction?: string,
): Promise<string> {
  try {
    // For chat, use the gemini-pro model
    //const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    // Create a chat session
    const chat = genAI.chats.create({
    model: "gemini-2.0-flash",
    history: messages.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
        })),
    });
    
    const response = await chat.sendMessage({
    message: systemInstruction || "",
    });
    console.log("Chat response :", response.text);

    // Send the message and get the response
    //const result = await chat.sendMessage(systemInstruction || "")
    //const response = await result.response
    return response.text || "No response"
  } catch (error) {
    console.error("Error chatting with Gemini:", error)
    return "Sorry, I couldn't process that request."
  }
}
