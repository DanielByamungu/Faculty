import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Applicant } from 'src/models/users/applicant.model';
import { PersistenceService } from "../../services/persistence.service";

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public user: any;
  public isUserLoggedIn: boolean = false;

  constructor(private _router: Router, private _localStorage: PersistenceService) {
    //this.database.initDB();
  }
  ngOnInit(): void {
    this.user = this._localStorage.getSessionObject("user");

    console.log("User:", this.user);
    console.log("isUserLoggedIn:", this.isUserLoggedIn);


    if (this.user != null) {
      this.isUserLoggedIn = true;
    }
  }

  logout() {
    this._localStorage.logout();
    this._router.navigate(['home']);
  }
}
