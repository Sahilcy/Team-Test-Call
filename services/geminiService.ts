
import { GoogleGenAI, Type } from "@google/genai";
import { User, MatchScore } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const geminiService = {
  /**
   * Use Gemini to rank users for matching based on interests, country, and language
   */
  async getFriendMatches(currentUser: User, candidates: User[]): Promise<MatchScore[]> {
    const prompt = `
      You are a matchmaker for a social app called VYNE. 
      Analyze the current user and candidates to find the best friends.
      
      RULES:
      - Same interests (+3 points)
      - Same country (+2 points)
      - Same language (+1 point)
      
      CURRENT USER:
      ${JSON.stringify(currentUser)}
      
      CANDIDATES:
      ${JSON.stringify(candidates)}
      
      Return a JSON array of objects with 'userId', 'score', and 'reasons' (array of strings explaining the score).
      Sort by score descending. Return top 5.
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                userId: { type: Type.STRING },
                score: { type: Type.NUMBER },
                reasons: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["userId", "score", "reasons"]
            }
          }
        }
      });

      const text = response.text;
      return JSON.parse(text);
    } catch (error) {
      console.error("Gemini matching error:", error);
      // Fallback simple logic
      return candidates.map(c => ({
        userId: c.id,
        score: Math.floor(Math.random() * 10),
        reasons: ["Fallback matching algorithm used"]
      }));
    }
  },

  /**
   * Moderation check for messages
   */
  async checkModeration(text: string): Promise<{ safe: boolean; reason?: string }> {
    const prompt = `Is the following message safe for a general community chat room? Return JSON { "safe": boolean, "reason": string }. Message: "${text}"`;
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              safe: { type: Type.BOOLEAN },
              reason: { type: Type.STRING }
            },
            required: ["safe"]
          }
        }
      });
      return JSON.parse(response.text);
    } catch {
      return { safe: true };
    }
  }
};
