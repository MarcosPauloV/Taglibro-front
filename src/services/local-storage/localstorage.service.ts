class LocalStorage {
  public static setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  public static getItem(key: string) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
  public static removeItem(key: string) {
    localStorage.removeItem(key);
  }
  public static clear() {
    localStorage.clear();
  }
}

export default LocalStorage;
