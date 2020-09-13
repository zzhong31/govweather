import express from 'express';
import axios from 'axios';

const router = express.Router();
const googleApiKey = process.env.GOOGLE_API_KEY;

router.get('/api/place/:query', async (req, res) => {
  console.log('GET: /api/place/:query');

  const { data } = await axios.get(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.params.query}&fields=address_components,geometry&key=${googleApiKey}`
  );

  res.status(201).send(data);
});

export { router as getGoogleMapPlaceQueryRouter };
