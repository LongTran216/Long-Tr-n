import { GoogleGenAI, Modality } from "@google/genai";
import type { EditedImageResponse } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = 'gemini-2.5-flash-image';

export const editImageWithNanoBanana = async (
  base64ImageData: string,
  mimeType: string,
  prompt: string
): Promise<EditedImageResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: [{
        role: 'user',
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      }],
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    // More robust error handling for safety blocks
    if (response.promptFeedback?.blockReason) {
      throw new Error(`Request was blocked due to: ${response.promptFeedback.blockReason}. Please adjust your prompt.`);
    }

    const candidate = response.candidates?.[0];
    if (!candidate) {
      throw new Error("API returned no candidates. The prompt may have been blocked entirely.");
    }
    
    if (candidate.finishReason === 'SAFETY') {
      throw new Error("The response was blocked due to safety settings. Please try a different prompt.");
    }
    
    if (!candidate.content?.parts || candidate.content.parts.length === 0) {
      throw new Error("API returned an empty response. This may be due to the prompt being too vague or a safety block.");
    }

    let editedImageBase64: string | null = null;
    let responseText: string | null = null;

    for (const part of candidate.content.parts) {
        if (part.inlineData) {
            editedImageBase64 = part.inlineData.data;
        } else if (part.text) {
            responseText = part.text;
        }
    }

    if (!editedImageBase64 && !responseText) {
        throw new Error("Could not parse a valid image or text from the AI's response.");
    }

    return { editedImageBase64, responseText };

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
      // Re-throw the original error to preserve its message for the UI
      throw error;
    }
    // For non-Error exceptions, wrap them
    throw new Error("An unexpected error occurred while communicating with the AI.");
  }
};