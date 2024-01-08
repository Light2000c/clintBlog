import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
  ) { }


  public set(key: string, value: string){
    return localStorage.setItem(key, value);
  }

  public get(key: string){
    // return localStorage.getItem(key);
    if (isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined') {
      return localStorage.getItem(key);
    } else {
      console.error('localStorage is not available.');
      return null;
    }
  }

  public clear(){
    return localStorage.clear();
  }
}
