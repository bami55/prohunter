require('dotenv').config();

export default async function handler(req, res) {
  const response = await fetch("https://api.producthunt.com/v2/oauth/token", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "client_credentials"
    }),
  });
  const data = await response.json();
  res.status(200).json({ token: data.access_token });
}
