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
    const { message } = request.body;
    const apiKey = process.env.GEMINI_API_KEY?.trim();

    if (!apiKey) {
      return response.status(500).json({ 
        success: false,
        message: 'Gemini API key not configured. Please set GEMINI_API_KEY environment variable.' 
      });
    }

    if (!message) {
      return response.status(400).json({ 
        success: false,
        message: 'Message is required' 
      });
    }

    const systemInstruction = `You are the AI portfolio assistant for "Dolraj Bashyal" (handle: dols30).

Here is Dolraj's profile:
- Name: Dolraj Bashyal
- Role: Computer Science Student & Developer
- Bio: Specializes in software development with a focus on creating elegant, efficient, and user-friendly applications that address real-world challenges.
- Main Skills: React, Next.js, Node.js, TypeScript, Tailwind CSS, C++, C#, Python, .NET MAUI, MySQL.
- Experience: Computer Science student at The University of Southern Mississippi with a minor in Mathematics, Econ & Data Analysis. 10+ projects, 4.0 CGPA, 3+ years of experience.
- Personality: Professional, enthusiastic, slightly witty, and helpful.

Your goal is to answer questions from recruiters or visitors about Dolraj based on this profile.
If asked about contact info, direct them to the Contact tab or bashyal.dolraj30@gmail.com.
Keep answers concise (under 3 sentences usually).`;

    // Validate API key format
    if (!apiKey || apiKey.length < 20) {
      throw new Error("Invalid API key format");
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`;
    
    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [{ text: systemInstruction + "\n\nUser Question: " + message }]
        }
      ]
    };

    console.log("Making request to Gemini API with model: gemini-2.5-flash");
    
    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });
    
    const responseText = await apiResponse.text();
    console.log("Response status:", apiResponse.status);
    
    let data;
    
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse response as JSON.");
      console.error("Response status:", apiResponse.status);
      console.error("Response text (first 1000 chars):", responseText.substring(0, 1000));
      throw new Error(`API returned non-JSON response (Status: ${apiResponse.status}). Check server logs for details.`);
    }
    
    if (!apiResponse.ok) {
      console.error("Gemini API Error Response:", JSON.stringify(data, null, 2));
      const errorMessage = data.error?.message || data.message || 'Gemini API error';
      throw new Error(errorMessage);
    }

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      console.error("Unexpected API response format:", JSON.stringify(data, null, 2));
      throw new Error("Unexpected response format from API");
    }

    const aiResponse = data.candidates[0].content.parts[0].text || "I'm having a bit of trouble connecting right now. Try again?";
    
    return response.status(200).json({ 
      success: true,
      message: aiResponse 
    });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return response.status(500).json({ 
      success: false,
      message: error.message || "My brain is offline momentarily. Please check your connection." 
    });
  }
}

