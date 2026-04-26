import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RetailerDashboard from './components/RetailerDashboard';
import ConsumerMap from './components/ConsumerMap';
import NGOPortal from './components/NGOPortal';
import SustainabilityDashboard from './components/SustainabilityDashboard';
import { useEffect } from 'react';
import { useStore } from './store/useStore';

function App() {
  const { fetchInventory } = useStore();

  useEffect(() => {
    fetchInventory();
    // Poll every 5 seconds for real-time demo effect
    const interval = setInterval(() => fetchInventory(), 5000);
    return () => clearInterval(interval);
  }, [fetchInventory]);

  return (
    <Router>
      <div className="min-h-screen bg-background text-white pt-16">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<RetailerDashboard />} />
            <Route path="/consumer" element={<ConsumerMap />} />
            <Route path="/ngo" element={<NGOPortal />} />
            <Route path="/sustainability" element={<SustainabilityDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
