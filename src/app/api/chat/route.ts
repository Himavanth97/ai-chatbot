import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// Initialize the Gemini API client using the provided key
// In a production app, this should definitely be in an environment variable
// e.g. process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({ apiKey: "AIzaSyAtDBl0wb0Yn0GJHPDCWXfJmumjYT1R3dQ" });

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Format the history for the Gemini API
    // Gemini chat sessions need contents array
    const contents = history.map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    // Add the new message
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    // Call the Gemini API
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: contents,
    });

    return NextResponse.json({ reply: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Failed to process the request", details: error.message },
      { status: 500 }
    );
  }
}
