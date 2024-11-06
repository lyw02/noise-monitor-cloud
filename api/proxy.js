import fetch from "node-fetch";

export default async function handler(req, res) {
  const { monitor, start, end } = req.query;

  const apiUrl = `https://data.smartdublin.ie/sonitus-api/api/data?username=dublincityapi&password=Xpa5vAQ9ki&monitor=${monitor}&start=${start}&end=${end}`;

  try {
    const apiResponse = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await apiResponse.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error forwarding request" });
  }
}
