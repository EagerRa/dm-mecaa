const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Initialize environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.post('/api/messages', (req, res) => {
    const messageData = req.body;
    console.log('Received message:', messageData);
    res.status(201).json({ message: 'Message received successfully' });
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
