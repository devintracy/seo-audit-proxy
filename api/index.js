export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'Missing URL in request body' });
  }

  try {
    const apiRes = await fetch(`https://seo-analyzer3.p.rapidapi.com/seo-audit-basic?url=${encodeURIComponent(url)}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'seo-analyzer3.p.rapidapi.com',
        'x-rapidapi-key': '5ca39e3e1emsh77f683edd5ef76bp1d1eccjsn74746155c4d9'
      }
    });

    const data = await apiRes.json();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Proxy failed: ' + error.message });
  }
}






