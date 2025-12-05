// server.js (Node + Express)
// npm i express node-fetch body-parser
const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// Load from env: set OPENAI_API_KEY in server environment
const OPENAI_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_KEY) {
  console.error("Set OPENAI_API_KEY in environment");
  process.exit(1);
}

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message || '';
  if(!userMessage) return res.status(400).json({error:'no message'});

  // Simple prompt engineering: provide college admission context
  const prompt = `You are an admissions assistant for an engineering college in Karnataka. A student asks: "${userMessage}". Provide a clear, bullet-point answer about KCET allotment, acceptance, document verification, fee payment, and reporting steps. For any steps that require dates or official links, advise the user to check the official college or CET websites. Keep it concise.`;

  try {
    // Example using OpenAI Chat Completions (adjust according to your available API)
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // replace with available model
        messages: [{role:'system', content: 'You are a helpful assistant.'}, {role:'user', content: prompt}],
        max_tokens: 500,
        temperature: 0.1
      })
    });
    const data = await r.json();
    const botText = data?.choices?.[0]?.message?.content || "Sorry, couldn't generate a response.";
    res.json({reply: botText});
  } catch (err) {
    console.error(err);
    res.status(500).json({error:"server error"});
  }
});

app.listen(3000, ()=> console.log("Server listening on :3000"));
