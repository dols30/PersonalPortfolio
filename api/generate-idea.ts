import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // Handle CORS
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ 
      success: false,
      message: 'Method not allowed' 
    });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY?.trim();

    if (!apiKey) {
      return response.status(500).json({ 
        success: false,
        message: 'Gemini API key not configured' 
      });
    }

    const prompt = "Generate a unique, creative, and modern coding project idea that uses React, Tailwind CSS, and Node.js. Provide a catchy title, a 1-sentence tagline, and 3 key technical features. Format the response as JSON with keys: title, tagline, features (array of strings).";

    const apiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      }
    );

    const responseText = await apiResponse.text();
    let data;
    
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse response as JSON. Response text:", responseText.substring(0, 500));
      throw new Error(`API returned non-JSON response. Status: ${apiResponse.status}. This might indicate an invalid API key or model name.`);
    }
    
    if (!apiResponse.ok) {
      console.error("Gemini Project API Error Response:", JSON.stringify(data, null, 2));
      const errorMessage = data.error?.message || data.message || 'Gemini API error';
      throw new Error(errorMessage);
    }

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      console.error("Unexpected API response format:", JSON.stringify(data, null, 2));
      throw new Error("Unexpected response format from API");
    }

    const result = JSON.parse(data.candidates[0].content.parts[0].text);
    
    return response.status(200).json({ 
      success: true,
      idea: result 
    });
  } catch (error: any) {
    console.error("Gemini Project Error:", error);
    return response.status(500).json({ 
      success: false,
      message: error.message || "Failed to generate project idea" 
    });
  }
}

