import express from 'express';
import axios from 'axios';

const router = express.Router();
const googleApiKey = process.env.GOOGLE_API_KEY;

router.get('/api/location/:query', async (req, res) => {
  console.log('GET: /api/location/:query');

  const { data } = await axios.get(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.params.query}&types=(regions)&components=country:us&key=${googleApiKey}`
  );

  res.status(201).send(data);
});

export { router as googleMapPlaceQueryRouter };
