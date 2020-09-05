const express = require('express');
const axios = require('axios');
const path = require('path');
const apiKeys = require('./config/config')
const cors = require('cors');
const jsonp = require('jsonp');

const app = express();
app.use(cors());

app.get('/api/location/', async (req, res) => {

    let result = {};
    const { data } = await axios.get("https://ipinfo.io?token=" + apiKeys.ipInfoAPI());
    result = data;

    res.status(201).send(result);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/public/index.html'));
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`simpleweather server listening on ${port}`)
});

