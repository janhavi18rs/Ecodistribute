const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

// In-memory data store
let inventory = [
  { id: '1', name: 'Whole Wheat Pav', category: 'Bakery', initialPrice: 40, currentPrice: 40, expiresAt: Date.now() + 8 * 60 * 60 * 1000, riskLevel: 'Green', isDonated: false, location: { lat: 19.0760, lng: 72.8777 } },
  { id: '2', name: 'Alphonso Mangoes', category: 'Produce', initialPrice: 600, currentPrice: 600, expiresAt: Date.now() + 5 * 60 * 60 * 1000, riskLevel: 'Yellow', isDonated: false, location: { lat: 19.0748, lng: 72.8760 } },
  { id: '3', name: 'Amul Milk (1L)', category: 'Dairy', initialPrice: 66, currentPrice: 66, expiresAt: Date.now() + 12 * 60 * 60 * 1000, riskLevel: 'Green', isDonated: false, location: { lat: 19.0780, lng: 72.8800 } },
  { id: '4', name: 'Paneer Tikka Meal', category: 'Deli', initialPrice: 250, currentPrice: 250, expiresAt: Date.now() + 4.5 * 60 * 60 * 1000, riskLevel: 'Yellow', isDonated: false, location: { lat: 19.0800, lng: 72.8750 } },
];

let globalTimeOffset = 0; // Simulated time offset in ms
const getSimulatedNow = () => Date.now() + globalTimeOffset;

app.get('/api/inventory', (req, res) => {
  res.json({ inventory, currentTime: getSimulatedNow() });
});

// Endpoint to simulate AI Perishability Score
app.post('/api/ai/score', (req, res) => {
  const { itemId } = req.body;
  const item = inventory.find(i => i.id === itemId);
  if (!item) return res.status(404).json({ error: 'Item not found' });

  const remainingTimeHours = (item.expiresAt - getSimulatedNow()) / (1000 * 60 * 60);
  let score = 0;
  if (remainingTimeHours <= 4) score = 95;
  else if (remainingTimeHours <= 8) score = 60;
  else score = 20;
  
  res.json({ 
    score, 
    reasoning: `Item has ${Math.max(0, remainingTimeHours).toFixed(1)} hours left. AI Perishability Risk is ${score > 80 ? 'CRITICAL' : 'MODERATE'}.` 
  });
});

// Endpoint to update simulation clock (speeds up time)
app.post('/api/simulate', (req, res) => {
  const { offsetMs } = req.body;
  globalTimeOffset += offsetMs;
  
  const now = getSimulatedNow();
  
  // Recalculate inventory
  inventory = inventory.map(item => {
    const remainingTimeHours = (item.expiresAt - now) / (1000 * 60 * 60);
    
    // The Switch: 4 hours before expiry
    if (remainingTimeHours <= 4 && !item.isDonated) {
      return { ...item, currentPrice: 0, isDonated: true, riskLevel: 'Red' };
    }
    
    if (!item.isDonated && remainingTimeHours > 4) {
      // Decaying Value Algorithm
      const k = 0.15; // Sensitivity factor
      const decayFactor = 1 - Math.exp(-k * remainingTimeHours);
      const newPrice = Math.max(0, item.initialPrice * decayFactor).toFixed(2);
      
      let riskLevel = 'Green';
      if (remainingTimeHours <= 6) riskLevel = 'Yellow';
      
      return { ...item, currentPrice: Number(newPrice), riskLevel };
    }
    
    return item;
  });
  
  res.json({ success: true, currentTime: now, inventory });
});

app.post('/api/claim', (req, res) => {
  const { itemId } = req.body;
  const itemIndex = inventory.findIndex(i => i.id === itemId);
  if (itemIndex > -1) {
    inventory.splice(itemIndex, 1); // remove from inventory when claimed
  }
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
