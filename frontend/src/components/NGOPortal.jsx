import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Navigation, CheckCircle2 } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom icons
const ngoIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const claimedIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function NGOPortal() {
  const { inventory, claimItem, claimedItems } = useStore();

  const donatedItems = inventory.filter(item => item.isDonated);

  const handleClaim = (id) => {
    claimItem(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-secondary">NGO Claims Portal</h1>
          <p className="text-gray-400 mt-1">Accept zero-cost surplus items and optimize your pickup route</p>
        </div>
        <div className="bg-surface px-4 py-2 rounded-lg border border-gray-800 text-sm">
          Active Claims Area: <span className="text-white font-bold">5km Radius</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-800 pb-2">Available Donations</h2>
          
          <AnimatePresence>
            {donatedItems.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="bg-surface border border-gray-800 rounded-xl p-8 text-center text-gray-500"
              >
                <Building2 className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>No new donations in your area.</p>
                <p className="text-sm">We'll alert you when surplus hits the critical threshold.</p>
              </motion.div>
            ) : (
              donatedItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-surface border border-secondary/30 rounded-xl p-6 shadow-[0_0_15px_rgba(0,240,255,0.1)] hover:border-secondary/60 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="bg-secondary text-black text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                          Ready for Pickup
                        </span>
                        <span className="text-sm text-gray-400">1.2 km away</span>
                      </div>
                      <h3 className="text-xl font-bold text-white">{item.name}</h3>
                      <p className="text-gray-400">{item.category} • Originally ₹{item.initialPrice.toFixed(2)}</p>
                    </div>
                    
                    <button
                      onClick={() => handleClaim(item.id)}
                      className="bg-secondary hover:bg-[#00d0e0] text-black font-bold py-3 px-6 rounded-lg transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center hover:scale-105"
                    >
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Claim Item
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-800 pb-2">Green Mile Routing</h2>
          <div className="bg-surface border border-gray-800 rounded-xl overflow-hidden h-[400px] relative z-0">
            {claimedItems && claimedItems.length > 0 ? (
              <MapContainer center={[19.0760, 72.8777]} zoom={14} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                
                {/* NGO Hub Marker */}
                <Marker position={[19.0760, 72.8777]} icon={ngoIcon}>
                  <Popup>
                    <div className="text-black font-bold">NGO Distribution Hub</div>
                  </Popup>
                </Marker>

                {/* Claimed Items */}
                {claimedItems.map((item) => (
                  <Marker 
                    key={item.id} 
                    position={[item.location.lat, item.location.lng]} 
                    icon={claimedIcon}
                  >
                    <Popup>
                      <div className="text-black font-bold">
                        <h4>{item.name}</h4>
                        <p className="text-xs text-gray-600 font-normal">{item.category}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {/* Routing Line */}
                <Polyline 
                  positions={[
                    [19.0760, 72.8777],
                    ...claimedItems.map(item => [item.location.lat, item.location.lng]),
                    [19.0760, 72.8777]
                  ]}
                  color="#00f0ff"
                  weight={3}
                  opacity={0.8}
                  dashArray="5, 10"
                />
              </MapContainer>
            ) : (
              <>
                <div className="absolute inset-0 opacity-50 bg-[url('https://basemaps.cartocdn.com/dark_all/12/2877/1824.png')] bg-cover bg-center mix-blend-screen"></div>
                <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                  <Navigation className="w-10 h-10 text-secondary mb-2 opacity-50" />
                  <p className="text-sm text-gray-400 font-medium bg-black/80 px-3 py-1 rounded">
                    Route will generate upon claiming
                  </p>
                </div>
              </>
            )}
            
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent pointer-events-none z-10">
              <div className="bg-black/90 backdrop-blur border border-gray-800 rounded-lg p-3 text-xs text-gray-300">
                <span className="text-secondary font-bold">Optimization Engine:</span> Minimizing CO2 emissions for multi-stop pickups within the 5km geofence.
              </div>
            </div>
          </div>

          {claimedItems && claimedItems.length > 0 && (
            <div className="bg-surface border border-gray-800 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                <h3 className="font-semibold text-white text-sm flex items-center">
                  <Navigation className="w-4 h-4 text-secondary mr-2" />
                  Optimized Route ({claimedItems.length + 1} Stops)
                </h3>
                <span className="text-xs text-secondary font-bold">Total: {(1.5 * claimedItems.length).toFixed(1)} km</span>
              </div>
              
              <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                <div className="flex items-start space-x-2 text-xs">
                  <span className="w-5 h-5 rounded-full bg-secondary text-black flex items-center justify-center font-bold shrink-0 text-[10px]">H</span>
                  <div className="text-gray-300">
                    <p className="font-semibold">Start: NGO Distribution Hub</p>
                    <p className="text-gray-500 text-[10px]">Mumbai Central Area</p>
                  </div>
                </div>
                
                {claimedItems.map((item, idx) => (
                  <div key={item.id} className="flex items-start space-x-2 text-xs border-l border-gray-800 ml-2.5 pl-3 py-1">
                    <span className="w-5 h-5 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold shrink-0 text-[10px]">{idx + 1}</span>
                    <div className="text-gray-300">
                      <p className="font-semibold">Pickup: {item.name}</p>
                      <p className="text-gray-500 text-[10px]">{(1.2 + idx * 0.3).toFixed(1)} km away • {item.category}</p>
                    </div>
                  </div>
                ))}

                <div className="flex items-start space-x-2 text-xs border-l border-gray-800 ml-2.5 pl-3 pt-1">
                  <span className="w-5 h-5 rounded-full bg-secondary text-black flex items-center justify-center font-bold shrink-0 text-[10px]">H</span>
                  <div className="text-gray-300">
                    <p className="font-semibold">End: Return to Hub</p>
                    <p className="text-gray-500 text-[10px]">Unload & Distribute</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&origin=19.0760,72.8777&destination=19.0760,72.8777&waypoints=${claimedItems.map(item => `${item.location.lat},${item.location.lng}`).join('|')}&travelmode=driving`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-secondary/10 hover:bg-secondary/20 border border-secondary/30 text-secondary rounded-lg py-2 px-3 text-xs font-bold text-center flex items-center justify-center transition-colors"
                >
                  Get Directions
                </a>
                <button 
                  onClick={() => alert("Optimized pickup directions sent to dispatch!")}
                  className="bg-secondary hover:bg-secondary/80 text-black rounded-lg py-2 px-3 text-xs font-bold text-center flex items-center justify-center transition-colors"
                >
                  Start Navigation
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
