const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');

const app = express();
app.set('trust proxy', true)

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(cors());


const ipKey = process.env.IPINFO_KEY;


app.get('/api/location/', async (req, res) => {
    
    let ipRequest = '';
    if(req.ip != '::ffff:127.0.0.1'){
        ipRequest = `/${req.ip}`;
    }
    
    
    const { data } = await axios.get(`https://ipinfo.io${ipRequest}?token=${ipKey}`);

    res.status(201).send(data);
});
console.log(__dirname + '/client/public/index.html');
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`simpleweather server listening on ${port}`)
});

