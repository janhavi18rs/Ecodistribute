import { NavLink } from 'react-router-dom';
import { Store, Map, Building2, Leaf, Clock, ChevronDown, RefreshCw } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Navbar() {
  const { simulateTimeJump, resetSimulation } = useStore();
  const [showSimMenu, setShowSimMenu] = useState(false);
  const dropdownRef = useRef(null);
  const btnRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSimMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSimOption = (offsetMs) => {
    simulateTimeJump(offsetMs);
    setShowSimMenu(false);
    
    if (btnRef.current) {
      gsap.fromTo(btnRef.current, 
        { scale: 0.95, borderColor: '#39ff14' },
        { scale: 1, borderColor: '#00f0ff', duration: 0.2 }
      );
    }
  };

  const handleReset = () => {
    resetSimulation();
    setShowSimMenu(false);
    if (btnRef.current) {
      gsap.fromTo(btnRef.current, 
        { scale: 0.95, borderColor: '#ff3b30' },
        { scale: 1, borderColor: '#00f0ff', duration: 0.2 }
      );
    }
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
              
              <div className="relative" ref={dropdownRef}>
                <button
                  ref={btnRef}
                  onClick={() => setShowSimMenu(!showSimMenu)}
                  className="ml-4 flex items-center px-4 py-2 border border-secondary text-secondary rounded-md text-sm font-medium hover:bg-secondary/10 transition-colors cursor-pointer"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Simulation Control
                  <ChevronDown className="w-4 h-4 ml-1 opacity-70" />
                </button>

                {showSimMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-surface/95 backdrop-blur-md border border-gray-800 rounded-lg shadow-2xl z-50 overflow-hidden py-1">
                    <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-800">
                      Time Warp Jumps
                    </div>
                    <button
                      onClick={() => handleSimOption(1000 * 60 * 60)}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-800 text-gray-200 transition-colors flex items-center cursor-pointer"
                    >
                      <Clock className="w-3.5 h-3.5 mr-2 text-secondary" />
                      Simulate +1 Hour
                    </button>
                    <button
                      onClick={() => handleSimOption(1000 * 60 * 60 * 4)}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-800 text-gray-200 transition-colors flex items-center cursor-pointer"
                    >
                      <Clock className="w-3.5 h-3.5 mr-2 text-red-400" />
                      Simulate +4 Hours (Expiry)
                    </button>
                    <button
                      onClick={() => handleSimOption(1000 * 60 * 60 * 12)}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-800 text-gray-200 transition-colors flex items-center cursor-pointer"
                    >
                      <Clock className="w-3.5 h-3.5 mr-2 text-secondary" />
                      Simulate +12 Hours
                    </button>
                    <button
                      onClick={() => handleSimOption(1000 * 60 * 60 * 24)}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-800 text-gray-200 transition-colors flex items-center cursor-pointer"
                    >
                      <Clock className="w-3.5 h-3.5 mr-2 text-secondary" />
                      Simulate +24 Hours (1 Day)
                    </button>
                    
                    <div className="border-t border-gray-800 my-1"></div>
                    
                    <button
                      onClick={handleReset}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-red-950/20 text-red-400 hover:text-red-300 transition-colors flex items-center font-semibold cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5 mr-2 text-red-500" />
                      Reset Simulation
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
