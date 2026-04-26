import { useState } from 'react';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';
import { Brain, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function RetailerDashboard() {
  const { inventory, getAiScore } = useStore();
  const [aiScores, setAiScores] = useState({});
  const [loadingAi, setLoadingAi] = useState(null);

  const handleAiAnalysis = async (itemId) => {
    setLoadingAi(itemId);
    const result = await getAiScore(itemId);
    setAiScores(prev => ({ ...prev, [itemId]: result }));
    setLoadingAi(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Retailer Dashboard</h1>
          <p className="text-gray-400 mt-1">Manage surplus inventory and AI perishability tracking</p>
        </div>
        <div className="flex items-center space-x-2 bg-surface p-3 rounded-lg border border-gray-800">
          <span className="text-sm font-medium">Auto-Donation Switch</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>

      <div className="bg-surface rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-[#0a0a0a]">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Item</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Current Price</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Risk Level</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">AI Insight</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {inventory.map((item) => (
              <motion.tr 
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="hover:bg-gray-800/50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-white">{item.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {item.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">₹{item.currentPrice.toFixed(2)}</span>
                    {item.currentPrice < item.initialPrice && !item.isDonated && (
                      <span className="text-xs text-danger line-through">₹{item.initialPrice.toFixed(2)}</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${item.riskLevel === 'Green' ? 'bg-primary/20 text-primary' : 
                      item.riskLevel === 'Yellow' ? 'bg-warning/20 text-warning' : 
                      'bg-danger/20 text-danger'}`}>
                    {item.riskLevel}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.isDonated ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-secondary/20 text-secondary border border-secondary/30">
                      DONATION MODE
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-800 text-gray-300">
                      ON SALE
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {aiScores[item.id] ? (
                    <div className="flex flex-col items-end text-xs">
                      <span className={`font-bold ${aiScores[item.id].score > 80 ? 'text-danger' : 'text-primary'}`}>
                        Score: {aiScores[item.id].score}/100
                      </span>
                      <span className="text-gray-500 max-w-[200px] truncate" title={aiScores[item.id].reasoning}>
                        {aiScores[item.id].reasoning}
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAiAnalysis(item.id)}
                      disabled={loadingAi === item.id}
                      className="inline-flex items-center text-xs font-medium text-secondary hover:text-white transition-colors disabled:opacity-50"
                    >
                      {loadingAi === item.id ? (
                        <span className="animate-pulse">Analyzing...</span>
                      ) : (
                        <>
                          <Brain className="w-4 h-4 mr-1" />
                          Predict Risk
                        </>
                      )}
                    </button>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {inventory.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No items in inventory.
          </div>
        )}
      </div>
    </div>
  );
}
