import fetch from "node-fetch";

export default async function (req, res) {
  const url = "https://data.smartdublin.ie/sonitus-api/data";

  if (req.method === "POST") {
    const result = await fetch(url, {
      method: "POST",
      headers: { ...req.headers, host: new URL(url).host },
      body: JSON.stringify(req.body),
    });

    const data = await result.text();
    res.status(result.status).send(data);
  } else {
    res.status(405).end();
  }
}
