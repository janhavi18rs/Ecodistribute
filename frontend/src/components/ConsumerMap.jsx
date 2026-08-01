import { useStore } from '../store/useStore';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { ShoppingBag, Clock } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Icon for Flash Sales
const flashSaleIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const defaultIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function ConsumerMap() {
  const { inventory, claimItem } = useStore();
  const center = [19.0760, 72.8777]; // Mumbai Center

  // Show only items that are NOT donated yet
  const availableItems = inventory.filter(item => !item.isDonated);

  return (
    <div className="space-y-6 h-[80vh] flex flex-col">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Flash Sales Map</h1>
        <p className="text-gray-400 mt-1">Find nearby discounted surplus food before it's gone</p>
      </div>

      <div className="flex-1 rounded-xl overflow-hidden border border-gray-800 shadow-2xl relative z-0">
        <MapContainer center={center} zoom={14} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          {availableItems.map((item) => {
            const isFlashSale = item.currentPrice < item.initialPrice;
            return (
              <Marker 
                key={item.id} 
                position={[item.location.lat, item.location.location?.lng || item.location.lng]}
                icon={isFlashSale ? flashSaleIcon : defaultIcon}
              >
                <Popup className="custom-popup">
                  <div className="text-[#0a0a0a] min-w-[200px]">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex flex-col">
                        <span className="text-xl font-black text-green-600">₹{item.currentPrice.toFixed(2)}</span>
                        {isFlashSale && (
                          <span className="text-xs text-red-500 line-through">₹{item.initialPrice.toFixed(2)}</span>
                        )}
                      </div>
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs font-bold border border-gray-200">
                        {item.riskLevel} Risk
                      </span>
                    </div>
                    <button 
                      onClick={() => {
                        claimItem(item.id);
                        alert(`Successfully reserved "${item.name}"! Claim recorded.`);
                      }}
                      className="w-full bg-black text-white hover:bg-gray-800 py-2 rounded-md font-medium text-sm transition-colors flex items-center justify-center"
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Reserve Now
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
