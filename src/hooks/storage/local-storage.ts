class LocalStorage {
  public static set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  public static get(key: string) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
  public static remove(key: string) {
    localStorage.removeItem(key);
  }
  public static clear() {
    localStorage.clear();
  }
}

export default LocalStorage;
