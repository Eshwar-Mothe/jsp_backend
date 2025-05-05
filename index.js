const express = require('express');
const cors = require('cors');
const axios = require('axios');
const sendMail = require('./mailService');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/videoGallery', async (req, res) => {
    try {
        const apiKey = 'AIzaSyD10DfyGKnEuR8gdeHyv1-Xh85f6oyn8_8';
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                key: apiKey,
                part: 'snippet',
                maxResults: 12,
                order: 'date',
                channelId: 'UCrKevLQTcgUp2kZ-WE0pWZQ',
                type: 'video'
            }
        });

        res.json({ data: response.data.items, message: 'Fetch success' });
    } catch (error) {
        console.error('Error fetching YouTube videos:', error.message);
        res.status(500).json({ message: 'Failed to fetch videos', error: error.message });
    }
});


app.post("/sendMail", async (req, res) => {
    console.log("Received Data:", req.body);
    try {
        const { to, subject, text } = req.body;

        const payload = { to, subject, text };

        console.log("Sent:", payload);
        const response = await sendMail(payload);
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to send email." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


