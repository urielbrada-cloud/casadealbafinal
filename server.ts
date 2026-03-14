import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import path from 'path';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// EasyBroker API Proxy
app.get('/api/properties', async (req, res) => {
  try {
    const apiKey = process.env.EASYBROKER_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'EASYBROKER_API_KEY is not configured' });
    }

    // Forward query params to EasyBroker (e.g., page, limit, search)
    const queryParams = new URLSearchParams(req.query as any).toString();
    const apiUrl = `https://api.easybroker.com/v1/properties${queryParams ? `?${queryParams}` : ''}`;

    const response = await fetch(apiUrl, {
      headers: {
        'X-Authorization': apiKey,
        'accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn('EasyBroker API Error:', response.status, errorText);
      return res.status(response.status).json({ error: 'Failed to fetch properties from EasyBroker' });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.warn('Error fetching properties:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/properties/:id', async (req, res) => {
  try {
    const apiKey = process.env.EASYBROKER_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'EASYBROKER_API_KEY is not configured' });
    }

    const apiUrl = `https://api.easybroker.com/v1/properties/${req.params.id}`;

    const response = await fetch(apiUrl, {
      headers: {
        'X-Authorization': apiKey,
        'accept': 'application/json'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch property from EasyBroker' });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.warn('Error fetching property:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
