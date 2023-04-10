import { Injectable } from '@angular/core';
import { JsonConvertionsService } from "./json-convertions.service";

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {

  constructor(private _convertJson: JsonConvertionsService) { }

  async isAUserLoggedIn(): Promise<boolean> {
    return !(await this.getSessionObject("user") === null);
  }

  public saveSessionObject (value: any, key:string) {
    let x = this._convertJson.toJSON(value);
    sessionStorage.setItem(key, x);
  }

  public getSessionObject (key: string): any {
    // @ts-ignore
    return this._convertJson.fromJson(sessionStorage.getItem(key));
  }

  public deleteSessionObject (key: string): void {
    sessionStorage.removeItem(key);
    console.log("Removed item from local storage");
  }

  public saveLocalObject (value: any, key:string) {
    let x = this._convertJson.toJSON(value);
    localStorage.setItem(key, x);
  }

  public getLocalObject (key: string): any {
    // @ts-ignore
    return this._convertJson.fromJson(localStorage.getItem(key));
  }

  public deleteLocalObject (key: string): void {
    localStorage.removeItem(key);
    console.log("Removed item from local storage");
  }

  logout() {
    this.deleteSessionObject("user");
  }
}
