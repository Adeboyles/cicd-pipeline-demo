const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.json({
        message: 'Hello, from Boyles! CI/CD Pipeline is live',
        version: process.env.APP_VERSION || '1.0.0'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});