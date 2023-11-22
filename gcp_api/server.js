const express = require('express');
const axios = require('axios');
const cors = require('cors');
const NodeCache = require('node-cache');
const app = express();
const port = 3000;
const dotenv = require('dotenv');

dotenv.config();
app.use(express.json());
app.use(cors());

const apiKey = process.env.GCP_API_KEY;
const cache = new NodeCache();

app.post('/api/directions', async (req, res) => {
  let { origin, destination, waypoints } = req.body;

  // Função para obter coordenadas geográficas a partir de um endereço
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

    // Armazena a resposta no cache por um determinado período por 5 minutos
    cache.set(cacheKey, `${location.lat},${location.lng}`, 300);

    return `${location.lat},${location.lng}`;
  };

  // Converte os endereços em coordenadas geográficas
  origin = await geocodeAddress(origin);
  destination = await geocodeAddress(destination);
  waypoints = await Promise.all(waypoints.map(geocodeAddress));

  // Monta a string de waypoints para a solicitação de direções
  const waypointsString = waypoints.length > 0 ? `&waypoints=${waypoints.join('|')}` : '';

  const cacheKeyDirections = `directions-${origin}-${destination}-${waypointsString}`;

  // Verifica se a resposta está em cache
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

    // Armazena a resposta no cache por um determinado período por 5 minutos
    cache.set(cacheKeyDirections, response.data, 300);

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
