export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'Missing URL' });
  }

  try {
    const apiResponse = await fetch('https://seo-analyzer3.p.rapidapi.com/seo-audit-basic', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-host': 'seo-analyzer3.p.rapidapi.com',
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      },
      body: JSON.stringify({ url }),
    });

    const data = await apiResponse.json();
    res.status(apiResponse.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Proxy Error', details: error.message });
  }
}



