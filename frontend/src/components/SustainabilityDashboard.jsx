import { useStore } from '../store/useStore';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Leaf, Utensils, TrendingDown } from 'lucide-react';

export default function SustainabilityDashboard() {
  const { mealsSaved, co2Reduced } = useStore();
  
  const mealsRef = useRef(null);
  const co2Ref = useRef(null);
  
  useEffect(() => {
    // GSAP tween for the numbers
    gsap.to(mealsRef.current, {
      innerHTML: mealsSaved,
      duration: 1.5,
      snap: { innerHTML: 1 },
      ease: "power2.out"
    });
    
    gsap.to(co2Ref.current, {
      innerHTML: co2Reduced,
      duration: 1.5,
      snap: { innerHTML: 0.1 },
      ease: "power2.out"
    });
  }, [mealsSaved, co2Reduced]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Sustainability Impact</h1>
        <p className="text-gray-400 mt-1">Real-time metrics on our collective fight against food waste</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Meals Saved Meter */}
        <div className="bg-surface border border-gray-800 rounded-2xl p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Utensils className="w-48 h-48 text-primary" />
          </div>
          
          <div className="relative z-10 flex flex-col items-center justify-center text-center h-[300px]">
            <h2 className="text-2xl font-bold text-gray-400 mb-6 uppercase tracking-widest">Meals Saved</h2>
            <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-primary to-green-800 mb-4 tabular-nums">
              <span ref={mealsRef}>0</span>
            </div>
            <p className="text-primary font-medium bg-primary/10 px-4 py-1 rounded-full">
              Equivalency Metric
            </p>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800">
            <div 
              className="h-full bg-primary transition-all duration-1000 ease-out" 
              style={{ width: `${Math.min(100, (mealsSaved / 50) * 100)}%` }}
            ></div>
          </div>
        </div>

        {/* CO2 Reduced Meter */}
        <div className="bg-surface border border-gray-800 rounded-2xl p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <TrendingDown className="w-48 h-48 text-secondary" />
          </div>
          
          <div className="relative z-10 flex flex-col items-center justify-center text-center h-[300px]">
            <h2 className="text-2xl font-bold text-gray-400 mb-6 uppercase tracking-widest">CO2 Diverted</h2>
            <div className="flex items-baseline justify-center space-x-2 mb-4">
              <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-secondary to-blue-900 tabular-nums">
                <span ref={co2Ref}>0</span>
              </div>
              <span className="text-2xl font-bold text-secondary">kg</span>
            </div>
            <p className="text-secondary font-medium bg-secondary/10 px-4 py-1 rounded-full flex items-center">
              <Leaf className="w-4 h-4 mr-2" /> Greenhouse Gas Reduction
            </p>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800">
            <div 
              className="h-full bg-secondary transition-all duration-1000 ease-out" 
              style={{ width: `${Math.min(100, (co2Reduced / 100) * 100)}%` }}
            ></div>
          </div>
        </div>

      </div>
    </div>
  );
}
