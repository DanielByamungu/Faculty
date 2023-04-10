import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PersistenceService } from './persistence.service';

@Injectable({
  providedIn: 'root',
})
export class AuthguardService implements CanActivate {
  async canActivate() {
    if (!await this._localStorage.isAUserLoggedIn()) {
      await this._router.navigate(['login']);
      return false;
    }
    return true;
  }

  constructor(
    private _router: Router,
    private _localStorage: PersistenceService
  ) {}
}
