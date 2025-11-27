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
    const { name, email, subject, message } = request.body;
    
    if (!name || !email || !subject || !message) {
      return response.status(400).json({ 
        success: false,
        message: 'All fields are required' 
      });
    }
    
    // This would typically send emails or store data
    console.log('Contact form submission:', { name, email, subject, message });
    
    return response.status(200).json({ 
      success: true,
      message: 'Message received successfully!' 
    });
  } catch (error: any) {
    console.error('Contact form error:', error);
    return response.status(500).json({ 
      success: false,
      message: 'Internal server error' 
    });
  }
}

