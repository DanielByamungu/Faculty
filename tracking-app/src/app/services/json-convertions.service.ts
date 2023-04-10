import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonConvertionsService {

  constructor() { }

  public toJSON (object: any): any {
    return JSON.stringify(object);
  }

  public fromJson (json: any): any {
    return JSON.parse(json);
  }
}
