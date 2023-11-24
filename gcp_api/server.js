require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const NodeCache = require('node-cache');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const apiKey = process.env.GCP_API_KEY;
const cache = new NodeCache();

app.post('/api/directions', async (req, res) => {
  let { origin, destination, waypoints } = req.body;

  const geocodeAddress = async (address) => {
    const cacheKey = `geocode-${address}`;
    const cachedResponse = cache.get(cacheKey);

    if (cachedResponse) {
      console.log('Retornando resposta do cache (geocode)');
      return cachedResponse;
    }

    const geocodeResponse = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address,
        key: apiKey,
      },
    });

    const location = geocodeResponse.data.results[0].geometry.location;

    cache.set(cacheKey, `${location.lat},${location.lng}`, 3600);

    return `${location.lat},${location.lng}`;
  };

  origin = await geocodeAddress(origin);
  destination = await geocodeAddress(destination);
  waypoints = await Promise.all(waypoints.map(geocodeAddress));

  const waypointsString = waypoints.length > 0 ? `waypoints=${waypoints.map(waypoint => `via:${waypoint.latitude},${waypoint.longitude}`).join('|')}` : '';

  const cacheKeyDirections = `directions-${origin}-${destination}-${waypointsString}`;

  const cachedResponseDirections = cache.get(cacheKeyDirections);
  if (cachedResponseDirections) {
    console.log('Retornando resposta do cache (directions)');
    return res.json(cachedResponseDirections);
  }

  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
      params: {
        origin,
        destination,
        key: apiKey,
        ...waypointsString,
      },
    });

    const modifiedResponse = {
      ...response.data,
      waypoints: waypoints.map(waypoint => {
        const [latitude, longitude] = waypoint.split(',').map(parseFloat);
        return { latitude, longitude };
      })
    };

    cache.set(cacheKeyDirections, modifiedResponse, 3600);

    res.json(modifiedResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
