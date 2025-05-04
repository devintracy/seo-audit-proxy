export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { url } = req.body;

    console.log("🔍 Received URL:", url);

    const response = await fetch('https://seo-analyzer3.p.rapidapi.com/seo-audit-basic?url=' + encodeURIComponent(url), {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'seo-analyzer3.p.rapidapi.com',
        'x-rapidapi-key': '5ca39e3e1emsh77f683edd5ef76bp1d1eccjsn74746155c4d9'
      }
    });

    const data = await response.json();

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    return res.status(200).json(data);
  } catch (error) {
    console.error("❌ Proxy error:", error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}







