export default async function handler(req, res) {
  // Pings the backend to keep it awake if the self-ping fails or Render strictly requires external IP requests
  try {
    const backendUrl = process.env.VITE_API_URL 
      ? process.env.VITE_API_URL.replace('/api', '/api/health') 
      : 'https://elevatecv-backend-crqt.onrender.com/api/health';
      
    // Use native fetch to hit the backend health endpoint
    const response = await fetch(backendUrl);
    const data = await response.json();
    
    res.status(200).json({ 
      success: true, 
      message: 'Backend successfully pinged from Vercel Edge Serverless Cron',
      backendStatus: response.status,
      data
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
