import {Injectable} from '@angular/core';
import {CanActivate, CanActivateFn, Router} from "@angular/router";
import {PersistenceService} from "./persistence.service";

@Injectable({
  providedIn: 'root'
})
export class AdminguardService implements CanActivate {

  constructor(
    private _router: Router,
    private _localStorage: PersistenceService,
  ) {
  }

  async canActivate() {
    let user = await this._localStorage.getSessionObject('user');
    if (user.type_id !== 1 && user.type_id !== 2) {
      await this._router.navigate(['**']);
      return false;
    } else {
      return true;
    }
  }
}
