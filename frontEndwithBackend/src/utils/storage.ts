// Local Storage utilities for caching and offline support

export class StorageService {
  // Generic get/set methods
  static get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting ${key} from localStorage:`, error);
      return null;
    }
  }

  static set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error);
    }
  }

  static remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
    }
  }

  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  // Specific methods for your app
  static getAuthToken(): string | null {
    return this.get<string>('token');
  }

  static setAuthToken(token: string): void {
    this.set('token', token);
  }

  static removeAuthToken(): void {
    this.remove('token');
  }

  static getUser(): any | null {
    return this.get('user');
  }

  static setUser(user: any): void {
    this.set('user', user);
  }

  static removeUser(): void {
    this.remove('user');
  }

  // Cache management
  static getCachedData<T>(key: string, maxAge: number = 5 * 60 * 1000): T | null {
    try {
      const cached = this.get<{ data: T; timestamp: number }>(`cache_${key}`);
      if (cached && Date.now() - cached.timestamp < maxAge) {
        return cached.data;
      }
      return null;
    } catch {
      return null;
    }
  }

  static setCachedData<T>(key: string, data: T): void {
    this.set(`cache_${key}`, {
      data,
      timestamp: Date.now(),
    });
  }

  static clearCache(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('cache_')) {
        this.remove(key);
      }
    });
  }
}