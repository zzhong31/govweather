import express from 'express';
import path from 'path';

import { getIpLocationRouter } from './routes/getIpLocation';
import { googleMapPlaceQueryRouter } from './routes/get-googlemap-location-query';
import { getGoogleMapPlaceQueryRouter } from './routes/get-googlemap-place-query';

const app = express();

app.set('trust proxy', true);

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(getIpLocationRouter);
app.use(googleMapPlaceQueryRouter);
app.use(getGoogleMapPlaceQueryRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`simpleweather server listening on ${port}`);
});
