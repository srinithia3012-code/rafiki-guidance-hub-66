// Simple cache implementation for API responses and localStorage persistence

// In-memory API response cache
const apiCache = new Map<string, { data: any; timestamp: number }>();

// Cache expiration time (default: 5 minutes)
const CACHE_EXPIRATION = 5 * 60 * 1000;

// Cache a response with a specified key
export const cacheApiResponse = (key: string, data: any, expirationMs = CACHE_EXPIRATION) => {
  apiCache.set(key, {
    data,
    timestamp: Date.now() + expirationMs
  });
};

// Get a cached response if it exists and is not expired
export const getCachedApiResponse = (key: string) => {
  const cachedData = apiCache.get(key);
  
  if (!cachedData) return null;
  
  // Check if the cache has expired
  if (Date.now() > cachedData.timestamp) {
    apiCache.delete(key);
    return null;
  }
  
  return cachedData.data;
};

// Clear a specific cache entry
export const clearCacheEntry = (key: string) => {
  apiCache.delete(key);
};

// Clear all cache entries
export const clearAllCache = () => {
  apiCache.clear();
};

// Generates a cache key from an object (for API requests)
export const generateCacheKey = (obj: any): string => {
  return JSON.stringify(obj);
};

// Local Storage utilities with type safety

// Save data to localStorage with expiration
export const setLocalStorageWithExpiry = (key: string, value: any, expirationMs = CACHE_EXPIRATION) => {
  const item = {
    value,
    expiry: Date.now() + expirationMs
  };
  localStorage.setItem(key, JSON.stringify(item));
};

// Get data from localStorage, considering expiration
export const getLocalStorageWithExpiry = <T>(key: string): T | null => {
  const itemStr = localStorage.getItem(key);
  
  // Return null if item doesn't exist
  if (!itemStr) return null;
  
  try {
    const item = JSON.parse(itemStr);
    
    // Check if the item has expired
    if (Date.now() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    
    return item.value as T;
  } catch (error) {
    // If there's an error parsing JSON, remove the item and return null
    localStorage.removeItem(key);
    return null;
  }
};

// Remove a specific item from localStorage
export const removeLocalStorageItem = (key: string): void => {
  localStorage.removeItem(key);
};

// Session persistence for chat messages
export const saveChatHistory = (userId: string, category: string, messages: any[]) => {
  // Only save if there are messages and at least one is not the welcome message
  if (messages.length > 1) {
    setLocalStorageWithExpiry(`chat_history_${userId}_${category}`, messages, 24 * 60 * 60 * 1000); // 24 hours
  }
};

// Get saved chat history
export const getSavedChatHistory = <T>(userId: string, category: string): T[] | null => {
  return getLocalStorageWithExpiry<T[]>(`chat_history_${userId}_${category}`);
};

// Clear chat history for a user and category
export const clearChatHistory = (userId: string, category: string): void => {
  removeLocalStorageItem(`chat_history_${userId}_${category}`);
}; 