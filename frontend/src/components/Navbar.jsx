import { NavLink } from 'react-router-dom';
import { Store, Map, Building2, Leaf, Clock } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Navbar() {
  const { simulateTimeJump } = useStore();
  const btnRef = useRef(null);

  // Simulation mode: speed up 1 hour per click or continuously
  const handleSimulate = () => {
    // Jump 1 hour into the future
    simulateTimeJump(1000 * 60 * 60);
    
    gsap.fromTo(btnRef.current, 
      { scale: 0.9, backgroundColor: '#39ff14', color: '#000' },
      { scale: 1, backgroundColor: 'transparent', color: '#39ff14', duration: 0.3 }
    );
  };

  const navItems = [
    { to: '/', label: 'Retailer', icon: Store },
    { to: '/consumer', label: 'Consumer map', icon: Map },
    { to: '/ngo', label: 'NGO Portal', icon: Building2 },
    { to: '/sustainability', label: 'Impact', icon: Leaf },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent uppercase tracking-wider">
              EcoDistribute <span className="text-white">AI</span>
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-surface text-primary'
                        : 'text-gray-300 hover:bg-surface hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                </NavLink>
              ))}
              
              <button
                ref={btnRef}
                onClick={handleSimulate}
                className="ml-4 flex items-center px-4 py-2 border border-primary text-primary rounded-md text-sm font-medium hover:bg-primary/10 transition-colors"
              >
                <Clock className="w-4 h-4 mr-2" />
                Simulate +1h
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
