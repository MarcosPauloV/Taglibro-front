class LocalStorage {
  static get(key: string): any {
    const value = localStorage.getItem(key);
    if (!value) {
      return null;
    }
    try {
      return JSON.parse(value);
    } catch {
      console.warn(`Invalid JSON for key "${key}"`);
      return null;
    }
  }

  static set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static remove(key: string): void {
    localStorage.removeItem(key);
  }

  static clear(): void {
    localStorage.clear(); // Limpa todos os dados armazenados no localStorage
  }
}

export default LocalStorage;
