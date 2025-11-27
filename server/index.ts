import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";

// Get directory paths first
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables - specify the path explicitly
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = 3002;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS settings
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  
  next();
});

// Simple logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// API routes
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ 
      success: false,
      message: 'All fields are required' 
    });
  }
  
  // This would typically send emails or store data
  console.log('Contact form submission:', { name, email, subject, message });
  
  return res.status(200).json({ 
    success: true,
    message: 'Message received successfully!' 
  });
});

// Gemini AI Chat endpoint
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  const apiKey = process.env.GEMINI_API_KEY?.trim();

  if (!apiKey) {
    return res.status(500).json({ 
      success: false,
      message: 'Gemini API key not configured. Please set GEMINI_API_KEY environment variable.' 
    });
  }

  if (!message) {
    return res.status(400).json({ 
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

  try {
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
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });
    
    const responseText = await response.text();
    console.log("Response status:", response.status);
    console.log("Response headers:", Object.fromEntries(response.headers.entries()));
    
    let data;
    
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse response as JSON.");
      console.error("Response status:", response.status);
      console.error("Response text (first 1000 chars):", responseText.substring(0, 1000));
      throw new Error(`API returned non-JSON response (Status: ${response.status}). Check server logs for details.`);
    }
    
    if (!response.ok) {
      console.error("Gemini API Error Response:", JSON.stringify(data, null, 2));
      const errorMessage = data.error?.message || data.message || 'Gemini API error';
      throw new Error(errorMessage);
    }

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      console.error("Unexpected API response format:", JSON.stringify(data, null, 2));
      throw new Error("Unexpected response format from API");
    }

    const aiResponse = data.candidates[0].content.parts[0].text || "I'm having a bit of trouble connecting right now. Try again?";
    
    return res.status(200).json({ 
      success: true,
      message: aiResponse 
    });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({ 
      success: false,
      message: error.message || "My brain is offline momentarily. Please check your connection." 
    });
  }
});

// Gemini Project Idea Generator endpoint
app.post('/api/generate-idea', async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY?.trim();

  if (!apiKey) {
    return res.status(500).json({ 
      success: false,
      message: 'Gemini API key not configured' 
    });
  }

  const prompt = "Generate a unique, creative, and modern coding project idea that uses React, Tailwind CSS, and Node.js. Provide a catchy title, a 1-sentence tagline, and 3 key technical features. Format the response as JSON with keys: title, tagline, features (array of strings).";

  try {
    const response = await fetch(
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

    const responseText = await response.text();
    let data;
    
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse response as JSON. Response text:", responseText.substring(0, 500));
      throw new Error(`API returned non-JSON response. Status: ${response.status}. This might indicate an invalid API key or model name.`);
    }
    
    if (!response.ok) {
      console.error("Gemini Project API Error Response:", JSON.stringify(data, null, 2));
      const errorMessage = data.error?.message || data.message || 'Gemini API error';
      throw new Error(errorMessage);
    }

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      console.error("Unexpected API response format:", JSON.stringify(data, null, 2));
      throw new Error("Unexpected response format from API");
    }

    const result = JSON.parse(data.candidates[0].content.parts[0].text);
    
    return res.status(200).json({ 
      success: true,
      idea: result 
    });
  } catch (error: any) {
    console.error("Gemini Project Error:", error);
    return res.status(500).json({ 
      success: false,
      message: error.message || "Failed to generate project idea" 
    });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const staticPath = path.resolve(__dirname, '../dist/public');
  console.log(`Serving static files from: ${staticPath}`);
  
  app.use(express.static(staticPath));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });
}

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (apiKey) {
    console.log(`Gemini API Key: ✓ Configured (length: ${apiKey.length}, starts with: ${apiKey.substring(0, 5)}...)`);
  } else {
    console.log(`Gemini API Key: ✗ Missing - Please set GEMINI_API_KEY in .env file`);
    console.log(`Current .env location: ${path.resolve(__dirname, '../.env')}`);
  }
});
