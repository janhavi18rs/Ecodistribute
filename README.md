# EcoDistribute 🌱

**Bridging the gap between food waste and hunger through intelligent automation.**

EcoDistribute uses an AI-powered Decaying Value Algorithm to automatically apply retail discounts on food items as they approach expiration. When items reach their expiration threshold, the system triggers automatic "Zero-Waste" donations to partner NGOs, creating a seamless flow from waste prevention to social impact.

## Challenge Category

**[Smart Resource Allocation]** - Data-Driven Volunteer Coordination for Social Impact

## Problem & Solution

**Problem:** Retailers face food waste while vulnerable populations struggle with food insecurity. Manual discount and donation processes are inefficient.

**Solution:** EcoDistribute automates:
- Real-time product expiration tracking
- Dynamic discount pricing based on decay patterns
- Instant donation coordination with NGOs
- Data-driven volunteer resource allocation

## Key Features

- 🤖 **Decaying Value Algorithm** - Automatically calculates optimal discount prices
- 📸 **Product Recognition** - Vision AI for real-time product identification
- 🎯 **Smart Donations** - Zero-waste trigger when items approach expiration
- 📊 **Real-time Analytics** - Track waste reduction and social impact metrics
- 🔗 **NGO Integration** - Direct coordination with charitable organizations
- 📱 **Multi-platform UI** - React-based frontend for retailers and NGOs

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **AI/ML** | Google Vertex AI, Vision API |
| **Cloud** | Google Cloud Platform (GCP) |
| **Database** | Firebase/Firestore |
| **Authentication** | Google Cloud IAM |

## Project Structure

```
Ecodistribute/
├── frontend/          # React application
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           # Node.js API server
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── package.json
└── README.md
```

## Quick Start

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Google Cloud account with credentials

### Installation

**Backend:**
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

Create `.env` files in both `backend/` and `frontend/`:

**backend/.env**
```
PORT=5000
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_CLOUD_KEY_PATH=./credentials.json
DATABASE_URL=your-firebase-url
API_KEY=your-api-key
```

**frontend/.env**
```
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLOUD_PROJECT_ID=your-project-id
```

## How It Works

1. **Product Upload** → Retailer scans/uploads product details
2. **Vision AI Analysis** → System identifies product type and expiration date
3. **Decay Calculation** → Decaying Value Algorithm determines discount schedule
4. **Auto-Discount** → Dynamic prices applied as expiration approaches
5. **Donation Trigger** → System automatically lists items for NGO pickup
6. **Impact Tracking** → Real-time metrics on waste prevented and food distributed

## Google AI Integration

### Vertex AI
- Predictive analytics for decay patterns
- Demand forecasting for optimal discounting
- Resource allocation optimization

### Vision AI
- Product image recognition
- Expiration date extraction from labels
- Batch processing for multiple items

## API Endpoints (Key Routes)

```
POST   /api/products        - Add product
GET    /api/products        - Get all products
PUT    /api/products/:id    - Update product
DELETE /api/products/:id    - Delete product
GET    /api/donations       - View donation opportunities
POST   /api/donations       - Create donation
```

## Development

```bash
# Run backend with hot reload
npm run dev

# Run frontend development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced ML model for demand forecasting
- [ ] Multi-language support
- [ ] Real-time SMS notifications
- [ ] Impact dashboard for NGOs
- [ ] Integration with major retail chains

## License

MIT License - feel free to use this project for educational and commercial purposes.

## Contact & Support

For questions or support, please open an issue in the repository or reach out to the development team.

---

**Made with ❤️ to reduce food waste and fight hunger**
