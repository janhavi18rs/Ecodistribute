import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://ecodistribute.onrender.com/api';

export const useStore = create((set, get) => ({
  inventory: [],
  claimedItems: [],
  currentTime: Date.now(),
  simulationSpeed: 1,
  isSimulating: false,
  mealsSaved: 0,
  co2Reduced: 0, // in kg
  
  fetchInventory: async () => {
    try {
      const res = await axios.get(`${API_URL}/inventory`);
      set({ inventory: res.data.inventory, currentTime: res.data.currentTime });
    } catch (error) {
      console.error("Failed to fetch inventory", error);
    }
  },
  
  simulateTimeJump: async (offsetMs) => {
    try {
      const res = await axios.post(`${API_URL}/simulate`, { offsetMs });
      set({ inventory: res.data.inventory, currentTime: res.data.currentTime });
    } catch (error) {
      console.error("Failed to simulate time jump", error);
    }
  },
  
  claimItem: async (itemId) => {
    try {
      const itemToClaim = get().inventory.find(i => i.id === itemId);
      await axios.post(`${API_URL}/claim`, { itemId });
      // Remove locally immediately for snappy UI
      set(state => ({ 
        inventory: state.inventory.filter(i => i.id !== itemId),
        claimedItems: itemToClaim ? [...state.claimedItems, itemToClaim] : state.claimedItems,
        mealsSaved: state.mealsSaved + 1, // Assume 1 item = 1 meal for demo
        co2Reduced: state.co2Reduced + 2.5 // Assume 2.5kg CO2 saved per item
      }));
    } catch (error) {
      console.error("Failed to claim item", error);
    }
  },
  
  getAiScore: async (itemId) => {
    try {
      const res = await axios.post(`${API_URL}/ai/score`, { itemId });
      return res.data;
    } catch (error) {
      console.error("Failed to get AI score", error);
      return { score: 0, reasoning: 'Error fetching AI score' };
    }
  },

  resetSimulation: async () => {
    try {
      const res = await axios.post(`${API_URL}/reset`);
      set({ 
        inventory: res.data.inventory, 
        currentTime: res.data.currentTime,
        claimedItems: [],
        mealsSaved: 0,
        co2Reduced: 0
      });
    } catch (error) {
      console.warn("Backend reset failed, resetting locally:", error);
      set({
        claimedItems: [],
        mealsSaved: 0,
        co2Reduced: 0
      });
      get().fetchInventory();
    }
  }
}));
