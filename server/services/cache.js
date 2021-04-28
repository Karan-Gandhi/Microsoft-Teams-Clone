// 10-min cache
const maximumTimeCached = 10 * 60 * 1000;

class CachedItem {
    constructor(timeCashed, title, data) {
        this.timeCashed = timeCashed;
        this.title = title;
        this.data = data;
    }
}

class CacheStore {
    constructor() {
        this.cache = new Map();
    }

    addItem(title, data) {
        let cachedItem = new CachedItem(Date.now(), title, data);
        this.cache[title] = cachedItem;
        return data;
    }

    getItem(title) {
        if (this.has(title) && Date.now() - this.cache[title].timeCashed <= maximumTimeCached) return this.cache[title].data;
        else if (this.has(title)) this.removeItem(title);
        return undefined;
    }

    has(title) {
        return this.cache[title] != undefined && Date.now() - this.cache[title].timeCashed <= maximumTimeCached;
    }

    removeItem(title) {
        this.cache[title] = undefined;
    }
}

module.exports = CacheStore;
