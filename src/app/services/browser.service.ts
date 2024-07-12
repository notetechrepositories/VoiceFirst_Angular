import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserService {
  private tokenKey: string = 'accessToken';
  isBrowser: boolean;
 
  constructor() {
    this.isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  getItem(key: string): string | null {
    return this.isBrowser ? localStorage.getItem(key): null;
  }

  setItem(key: string, value: string): void {
    if (this.isBrowser) {
      localStorage.setItem(key, value);
    }
  }
  clear(): void {
    if (this.isBrowser) {
      localStorage.clear();
    }
  }
  removeItem(key: string): void {
    if (this.isBrowser) {
      localStorage.removeItem(key)
;
    }
  }

  getCrypto(): Crypto | null {
    return this.isBrowser ? window.crypto : null;
  }

  saveToken(token: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.tokenKey, token);
     
    }
  }

  removeToken(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(this.tokenKey);
     
    }
  }
}
