export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { url } = req.body;

    console.log("🔍 Received URL:", url);

    const response = await fetch(`https://seo-analyzer3.p.rapidapi.com/seo-audit-basic?url=${encodeURIComponent(url)}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'seo-analyzer3.p.rapidapi.com',
        'x-rapidapi-key': '5ca39e3e1emsh77f683edd5ef76bp1d1eccjsn74746155c4d9',
        'Content-Type': 'application/json'  // ← this may help!
      }
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("❌ API Error:", response.status, errorData);
      return res.status(response.status).json({ error: `API Error: ${response.status}`, details: errorData });
    }

    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    return res.status(200).json(data);
  } catch (error) {
    console.error("❌ Proxy Error:", error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}








