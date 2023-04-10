import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {PersistenceService} from "./persistence.service";

@Injectable({
  providedIn: 'root'
})
export class FacultyApplicantguardService implements CanActivate{

  constructor(
    private _router: Router,
    private _localStorage: PersistenceService
  ) {}

  async canActivate(): Promise<boolean> {
    let isFaculty = async (): Promise<boolean> => {
      let user = await this._localStorage.getSessionObject('user');
      return user.type_id === 3;
    }
    let isApplicant = async (): Promise<boolean> => {
      let user = await this._localStorage.getSessionObject('user');
      return user.type_id === 4;
    }
    return await isFaculty() || await isApplicant();
  }
}
