
import { GoogleGenAI, Modality } from "@google/genai";
import type { EditedImageResponse } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = 'gemini-2.5-flash-image-preview';

export const editImageWithNanoBanana = async (
  base64ImageData: string,
  mimeType: string,
  prompt: string
): Promise<EditedImageResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: {
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
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    let editedImageBase64: string | null = null;
    let responseText: string | null = null;

    if (response.candidates && response.candidates.length > 0) {
        const parts = response.candidates[0].content.parts;
        for (const part of parts) {
            if (part.inlineData) {
                editedImageBase64 = part.inlineData.data;
            } else if (part.text) {
                responseText = part.text;
            }
        }
    }

    if (!editedImageBase64 && !responseText) {
        throw new Error("API returned an empty response. The prompt might have been blocked.");
    }

    return { editedImageBase64, responseText };

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to edit image with AI. Please check the console for details.");
  }
};
