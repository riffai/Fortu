import { GoogleGenAI } from "@google/genai";
import { TrafficData, ZoneRanking } from '../types';

const getGeminiClient = () => {
  const apiKey = process.env.API_KEY || ''; // In a real scenario, this would be injected safely
  if (!apiKey) {
    console.warn("API_KEY not found in environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateDashboardInsights = async (
  trafficData: TrafficData[],
  rankings: ZoneRanking[],
  currentCSI: number
): Promise<string> => {
  const ai = getGeminiClient();
  if (!ai) {
    return "AI Insights unavailable. Please configure API Key.";
  }

  // Summarize data for the prompt to save tokens
  const peakTraffic = trafficData.reduce((prev, current) => (prev.in > current.in) ? prev : current);
  const totalIn = trafficData.reduce((acc, curr) => acc + curr.in, 0);
  const topZone = rankings[0];

  const prompt = `
    Analyze the following retail flow and customer satisfaction data for a store manager dashboard.
    
    Data Summary:
    - Current CSI Score: ${currentCSI}%
    - Total Traffic In: ${totalIn}
    - Peak Time: ${peakTraffic.time} (In: ${peakTraffic.in})
    - Top Performing Zone: ${topZone.name} (${topZone.value} visits)
    
    Provide 3 concise, actionable strategic insights (bullet points) to improve flow and satisfaction. 
    Focus on staffing, layout optimization, and customer engagement.
    Keep it professional and brief.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Disable thinking for faster response
      }
    });
    return response.text || "No insights generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to generate insights at this time.";
  }
};