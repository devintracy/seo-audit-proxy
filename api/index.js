export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'Missing URL in request body.' });
  }

  try {
    const response = await fetch(`https://seo-analyzer3.p.rapidapi.com/seo-audit-basic?url=${encodeURIComponent(url)}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'seo-analyzer3.p.rapidapi.com',
        'x-rapidapi-key': '5ca39e3e1emsh77f683edd5ef76bp1d1eccjsn74746155c4d9',
      },
    });

    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).json({ error });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error('Fetch error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}




