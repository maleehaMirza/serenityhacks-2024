const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const config = require('./public/config');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

const openaiEndpoint = 'http://localhost:3000/api/chatgpt';  // Replace with the correct ChatGPT API endpoint

app.post('/api/chatgpt', express.json(), async (req, res) => {
    console.log('Received a request to /api/chatgpt');
    const userMessage = req.body.prompt;

    const apiKey = config.apiKey;

    try {
        const response = await fetch(openaiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                prompt: userMessage,
                max_tokens: 100
            })
        });

        const data = await response.json();
        const chatResponse = data.choices[0].text.trim();

        res.json({ response: chatResponse });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
