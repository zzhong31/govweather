const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(cors());


const ipKey = process.env.IPINFO_KEY;


app.get('/api/location/', async (req, res) => {

    let result = {};
    const ipResult = await axios.get("https://api.ipify.org/?format=json");
    console.log(ipResult.data.ip);
    const { data } = await axios.get("https://ipinfo.io?token=" + ipKey);
    result = data;

    res.status(201).send(result);
});
console.log(__dirname + '/client/public/index.html');
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`simpleweather server listening on ${port}`)
});

