import express from 'express';
import axios from 'axios';

const router = express.Router();
const ipKey = process.env.IPINFO_KEY;

router.get('/api/location/', async (req, res) => {
  console.log('GET: /api/location/');
  let ipRequest = '';

  if (req.ip != '::ffff:127.0.0.1' && req.ip != '127.0.0.1') {
    ipRequest = `/${req.ip}`;
  }
  const { data } = await axios.get(
    `https://ipinfo.io${ipRequest}?token=${ipKey}`
  );

  res.status(201).send(data);
});

export { router as getIpLocationRouter };
