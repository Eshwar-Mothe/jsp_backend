const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import the CORS package
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS for all routes

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/videoGallery', async (req, res) => {
    try {
        const apiKey = process.env.REACT_APP_API_KEY;
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                key: apiKey,
                part: 'snippet',
                maxResults: 120,
                order: 'date',
                channelId: 'UCrKevLQTcgUp2kZ-WE0pWZQ',
                type: 'video'
            }
        });

        res.json({ data: response.data.items, message: 'fetch success' });
    } catch (error) {
        console.error('Error fetching YouTube videos:', error.message);
        res.status(500).json({ message: 'Failed to fetch videos', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
