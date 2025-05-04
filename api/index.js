export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing URL' });
  }

  try {
    const apiResponse = await fetch(`https://seo-analyzer3.p.rapidapi.com/seo-audit-basic?url=${encodeURIComponent(url)}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'seo-analyzer3.p.rapidapi.com',
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      },
    });

    const data = await apiResponse.json();
    res.status(apiResponse.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Proxy Error', details: error.message });
  }
}


