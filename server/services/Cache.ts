import * as fs from "fs";

const DEFAULT_CACHE_TIME = 10e3 * 60; // 10 min

export default class Cache<U> {
  private fileName: string;
  private data: Map<string, CacheItem<string, U>>;

  constructor(filename: string) {
    this.fileName = filename;
    this.data = new Map();
  }

  public addItem(id: string, data: U): void {
    this.data.set(id, new CacheItem<string, U>(id, data));
    this.writeFile();
  }

  public getItem(id: string): U | null {
    if (this.itemExists(id)) {
      return this.data.get(id)?.data as U;
    } else return null;
  }

  public itemExists(id: string) {
    if (!this.data.has(id)) return null;
    const item = this.data.get(id);
    if (item?.isValid(DEFAULT_CACHE_TIME)) return true;
    else {
      this.data.delete(id);
      this.writeFile();
      return false;
    }
  }

  public deleteIfPresent(id: string) {
    if (this.itemExists(id)) {
      this.data.delete(id);
      this.writeFile();
    }
  }

  private writeFile() {
    const obj = Object.fromEntries(this.data);
    fs.writeFileSync(this.fileName, JSON.stringify(obj));
  }

  public fromFile() {
    const json = fs.readFileSync(this.fileName, "utf-8");
    if (json.length === 0) return;
    const data = new Map<string, CacheItemInterface<string, U>>(Object.entries(JSON.parse(json)));
    data.forEach((value, key) => this.data.set(key, new CacheItem(value.id, value._data, value.dateCreated)));
  }
}

export class CacheItem<T, U> {
  private dateCreated: number;
  public id: T;
  private _data: U;

  constructor(id: T, data: U, dateCreated?: number) {
    this.dateCreated = dateCreated || Date.now();
    this.id = id;
    this._data = data as U;
  }

  public fromObj(obj: CacheItemInterface<T, U>) {}

  public isValid(timeDifference: number): boolean {
    if (Date.now() - this.dateCreated <= timeDifference) return true;
    return false;
  }

  public get data(): U {
    return this._data;
  }
}

interface CacheItemInterface<T, U> {
  dateCreated: number;
  id: T;
  _data: U;
}
