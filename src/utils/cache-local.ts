export enum CacheKeys {
  // * add the cache keys
  USER_INFO = "#_userInfo",
}

enum CacheType {
  Local,
  Session,
}

class Cache {
  private storage: Storage

  constructor(type: CacheType) {
    this.storage = type === CacheType.Local ? localStorage : sessionStorage
  }

  setCache(key: CacheKeys, value: unknown): this {
    if (value !== undefined && value !== null) {
      try {
        this.storage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.error("Error setting cache:", error)
      }
    }

    return this
  }

  getCache<T = any>(key: CacheKeys, defaultValue: T): T {
    try {
      const item = this.storage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error("Error retrieving cache:", error)
      return defaultValue
    }
  }

  removeCache(key: CacheKeys): this {
    this.storage.removeItem(key)
    return this
  }

  clearCache(): this {
    this.storage.clear()
    return this
  }
}

const localCache = new Cache(CacheType.Local)
const sessionCache = new Cache(CacheType.Session)

export { localCache, sessionCache }
