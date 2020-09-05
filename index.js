const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');
const { send } = require('process');

const app = express();
app.set('trust proxy', true)

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(cors());


const ipKey = process.env.IPINFO_KEY;
const googleApiKey = process.env.GOOGLE_API_KEY;

app.get('/api/location/', async (req, res) => {
    console.log('GET: /api/location/')
    let ipRequest = '';

    if(req.ip != '::ffff:127.0.0.1' && req.ip != '127.0.0.1'){
        ipRequest = `/${req.ip}`;
    }
    const { data } = await axios.get(`https://ipinfo.io${ipRequest}?token=${ipKey}`);

    res.status(201).send(data);
});

app.get('/api/location/:query', async (req, res) => {

    console.log('GET: /api/location/:query')  
    
    const { data } = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.params.query}&types=(regions)&components=country:us&key=${googleApiKey}`)

    res.status(201).send(data);
});

app.get('/api/place/:query', async (req, res) => {

    console.log('GET: /api/place/:query')      

    const { data } = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.params.query}&fields=address_components,geometry&key=${googleApiKey}`)

    res.status(201).send(data);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`simpleweather server listening on ${port}`)
});

