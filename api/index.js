export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Missing URL parameter" });
  }

  try {
    const response = await fetch(`https://seo-analyzer3.p.rapidapi.com/seo-audit-basic?url=${encodeURIComponent(url)}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "seo-analyzer3.p.rapidapi.com",
        "x-rapidapi-key": "5ca39e3e1emsh77f683edd5ef76bp1d1eccjsn74746155c4d9"
      }
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "API call failed", details: err.message });
  }
}

