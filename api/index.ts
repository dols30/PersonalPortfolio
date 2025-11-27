import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  try {
    // Handle different HTTP methods
    switch (request.method) {
      case 'GET':
        // Handle GET requests
        return response.status(200).json({ message: 'API is working!' });
      
      case 'POST':
        // Handle POST requests
        return response.status(200).json({ message: 'POST request received' });
      
      default:
        return response.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    return response.status(500).json({ error: 'Internal server error' });
  }
} 