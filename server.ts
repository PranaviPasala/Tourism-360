import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '1mb' }));

const PORT = Number(process.env.PORT) || 3000;

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/public-config', (_req, res) => {
  res.json({
    mapsApiKey: process.env.VITE_GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY || '',
  });
});

app.post('/api/ai/generate-itinerary', async (req, res) => {
  const ai = getGeminiClient();
  if (!ai) {
    res.status(500).json({
      error: 'Gemini API key is not configured on the server. Please configure GEMINI_API_KEY in Settings > Secrets.',
    });
    return;
  }

  const {
    startingPoint,
    endingPoint,
    days,
    travellers,
    startDate,
    transportationPreference,
    destinations,
    budgetPerPerson,
    totalBudget,
    realisticMinimumEstimate,
    replanReason,
  } = req.body || {};

  if (!startingPoint || !endingPoint || !days || !travellers) {
    res.status(400).json({ error: 'Starting point, ending point, days, and travellers are required.' });
    return;
  }

  const destinationList = Array.isArray(destinations) && destinations.length > 0
    ? destinations.map((d: { name?: string; state?: string; bestMonths?: string }) =>
        `${d.name || ''} (${d.state || ''}, Best: ${d.bestMonths || ''})`
      ).join('; ')
    : `${endingPoint} local attractions`;

  const prompt = `Plan a practical, realistic Indian travel itinerary in JSON format.
Trip Parameters:
- Starting Point: ${startingPoint}
- Ending Point / Primary Destination: ${endingPoint}
- Number of Days: ${days}
- Number of Travellers: ${travellers}
- Travel Start Date: ${startDate || 'Upcoming'}
- Transportation Preference: ${transportationPreference || 'Train'}
- Selected Destinations: ${destinationList}
- User Target Budget: INR ${totalBudget} total (INR ${budgetPerPerson} per person)
- Estimated Realistic Minimum Cost: INR ${realisticMinimumEstimate} total
${replanReason ? `- Replan Adjustment Note: ${replanReason}` : ''}

Instructions:
1. Generate exactly ${Math.min(Math.max(Number(days), 1), 14)} day entries (if days > 14, group extended exploration cleanly up to 14 entries).
2. Be truthful about Indian travel distances, transit timings, and realistic INR expenses. Do NOT invent fake prices just to fit INR 1,000 if the trip genuinely costs more; instead note realistic costs and suggest budget-saving alternatives if totalBudget < realisticMinimumEstimate.
3. Check seasonal suitability for the travel start date and mention any weather/monsoon advisories in aiNotes.
4. Recommend 2-3 alternative or nearby Indian destinations (including community/hidden culture spots) that fit the route or budget.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: prompt,
      config: {
        systemInstruction:
          'You are an expert Indian tourism planner for Tourism 360. Provide grounded, realistic, culturally respectful travel itineraries across India with accurate distances and transparent INR cost estimates.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            itinerary: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.INTEGER },
                  title: { type: Type.STRING },
                  places: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  timings: { type: Type.STRING },
                  distanceKm: { type: Type.NUMBER },
                  transportSuggestion: { type: Type.STRING },
                  estimatedExpenseInr: { type: Type.NUMBER },
                  highlights: { type: Type.STRING },
                },
                required: [
                  'day',
                  'title',
                  'places',
                  'timings',
                  'distanceKm',
                  'transportSuggestion',
                  'estimatedExpenseInr',
                  'highlights',
                ],
              },
            },
            aiNotes: { type: Type.STRING },
            alternatives: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  state: { type: Type.STRING },
                  reason: { type: Type.STRING },
                },
                required: ['name', 'state', 'reason'],
              },
            },
          },
          required: ['itinerary', 'aiNotes', 'alternatives'],
        },
      },
    });

    const text = (response.text || '{}').trim();
    const parsed = JSON.parse(text);
    res.json(parsed);
  } catch (err) {
    console.error('Gemini itinerary error:', err);
    const message = err instanceof Error ? err.message : 'Failed to generate AI itinerary';
    res.status(502).json({ error: message });
  }
});

app.post('/api/ai/recommendations', async (req, res) => {
  const ai = getGeminiClient();
  if (!ai) {
    res.status(500).json({
      error: 'Gemini API key is not configured on the server. Please configure GEMINI_API_KEY in Settings > Secrets.',
    });
    return;
  }

  const { travelMonth, budgetPerPerson, interests, preferredRegion } = req.body || {};

  const prompt = `Recommend 4 Indian tourist destinations based on:
- Travel Month: ${travelMonth || 'October'}
- Budget per person: INR ${budgetPerPerson || 1000}
- Interests: ${interests || 'Heritage, Nature, Local Culture'}
- Preferred Region in India: ${preferredRegion || 'Any'}

Include accurate best-to-visit seasonal reasoning, realistic budget feasibility note (explicitly state if INR ${budgetPerPerson || 1000} covers only a day trip or requires adjusting for stay/intercity travel), and 1 hidden cultural or community tourism tip for each.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: prompt,
      config: {
        systemInstruction:
          'You are Tourism 360 AI Travel Advisor specializing in all 28 Indian states and 8 Union Territories. Never fabricate fake prices or contact details.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  destination: { type: Type.STRING },
                  state: { type: Type.STRING },
                  bestMonths: { type: Type.STRING },
                  seasonMatch: { type: Type.STRING },
                  budgetGuidance: { type: Type.STRING },
                  communityTip: { type: Type.STRING },
                },
                required: ['destination', 'state', 'bestMonths', 'seasonMatch', 'budgetGuidance', 'communityTip'],
              },
            },
            summary: { type: Type.STRING },
          },
          required: ['recommendations', 'summary'],
        },
      },
    });

    const parsed = JSON.parse((response.text || '{}').trim());
    res.json(parsed);
  } catch (err) {
    console.error('Gemini recommendations error:', err);
    res.status(502).json({
      error: err instanceof Error ? err.message : 'Failed to load AI recommendations',
    });
  }
});

app.post('/api/ai/ask', async (req, res) => {
  const ai = getGeminiClient();
  if (!ai) {
    res.status(500).json({
      error: 'Gemini API key is not configured on the server. Please configure GEMINI_API_KEY in Settings > Secrets.',
    });
    return;
  }

  const { question, context } = req.body || {};
  if (!question || typeof question !== 'string') {
    res.status(400).json({ error: 'A travel question is required.' });
    return;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: `Context: ${context || 'User is exploring India on Tourism 360'}\n\nQuestion: ${question}`,
      config: {
        systemInstruction:
          'You are the Tourism 360 India Travel Expert. Answer concisely and accurately about Indian states, Union Territories, seasonal weather, realistic public transport/train options, hidden cultural heritage, and responsible community tourism. Never invent fake phone numbers, addresses, or guaranteed hotel tariffs.',
      },
    });

    res.json({ answer: response.text || 'No response generated.' });
  } catch (err) {
    console.error('Gemini Q&A error:', err);
    res.status(502).json({
      error: err instanceof Error ? err.message : 'Failed to answer travel question',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Tourism 360 server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
