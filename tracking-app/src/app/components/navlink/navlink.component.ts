import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersistenceService } from '../../services/persistence.service';

@Component({
  selector: 'navlink',
  templateUrl: './navlink.component.html',
  styleUrls: ['./navlink.component.css'],
})
export class NavlinkComponent implements OnInit {
  @Input() linkref: string = '';
  @Input() linkval: string = '';
  @Input() active: boolean = false;
  @Input() signOut: boolean = false;

  constructor(
    private _localStorage: PersistenceService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  logout() {
    this._localStorage.logout();
    this._router.navigate(['/home']);
    console.log('LOGGED OUT!!!!');
  }
}
