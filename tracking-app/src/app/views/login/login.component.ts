import { Component, Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Applicant } from 'src/models/users/applicant.model';
import { Faculty } from 'src/models/users/faculty.model';
import { Coordinator } from 'src/models/users/coordinator.model';
import { Admin } from 'src/models/users/admin.model';
import { HashingService } from "../../services/hashing.service";
import { JsonConvertionsService } from "../../services/json-convertions.service";
import { PersistenceService } from "../../services/persistence.service";
import { RestApiService } from "../../services/rest-api.service";
import { ValidationService } from "../../services/validation.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class LoginComponent implements OnInit {
  isLogin: boolean = false
  errorMessage: any
  isError: boolean = false;
  admin: Admin = new Admin();
  applicant: Applicant = new Applicant();
  faculty: Faculty = new Faculty();
  coordinator: Coordinator = new Coordinator();
  found1: boolean = false;
  found2: boolean = false;
  found3: boolean = false;
  found4: boolean = false;
  actionMessage: string = '';


  constructor(
    private _router: Router,
    private _validator: ValidationService,
    private _localStorage: PersistenceService,
    private _restApi: RestApiService,
    private _jsonConvert: JsonConvertionsService,
    private _hash: HashingService,
  ) {
  }

  ngOnInit() {
    this.actionMessage = this._localStorage.getSessionObject("actionMsg");
  }

  // @ts-ignore
  async loginAdmin(email: string, loginPswrd: string): Promise<boolean> {
    let login_function = () => {
      console.log("Entered Admin Login function");
      console.log("get login user from rest api");
      let adminLogin: Promise<Admin> = Promise.resolve(this._restApi.fetchLogin(email, "admins", loginPswrd));
      return new Promise(resolve => {
        setTimeout(() => {
          this.admin = this._localStorage.getSessionObject("user")
          if (this.admin === null || this.admin.u_id < 0) {
            console.log("Leaving Admin Login function -1");
            resolve(false);
          } else {
            this.isLogin = true;
            this._router.navigate(["job-postings"]);
            console.log("Leaving Admin Login function -2");
            resolve(true);
          }
        }, 1000)
      });
    };
    let async_function = async function () {
      const login_promise = await login_function();
      console.log(login_promise);
    }
    await async_function();
  }

  // @ts-ignore
  async loginApplicant(email: string, loginPswrd: string): Promise<boolean> {
    let login_function = () => {
      console.log("Entered Applicant Login function");
      console.log("get login user from rest api");
      let applicantLogin: Promise<Applicant> = Promise.resolve(this._restApi.fetchLogin(email, "applicants", loginPswrd));
      return new Promise(resolve => {
        setTimeout(() => {
          this.applicant = this._localStorage.getSessionObject("user")
          if (this.applicant === null || this.applicant.u_id < 0) {
            resolve(false);
          } else {
            this.isLogin = true;
            this._router.navigate(["job-postings"]);
            resolve(true);
          }
        }, 1000)
      });
    };
    let async_function = async function () {
      const login_promise = await login_function();
      console.log(login_promise);
    }
    await async_function();
  }

  // @ts-ignore
  async loginCoord(email: string, loginPswrd: string): Promise<boolean> {
    let login_function = () => {
      console.log("Entered Coord Login function");
      console.log("get login user from rest api");
      let coordLogin: Promise<Coordinator> = Promise.resolve(this._restApi.fetchLogin(email, "coordinators", loginPswrd));
      return new Promise(resolve => {
        setTimeout(() => {
          this.coordinator = this._localStorage.getSessionObject("user")
          if (this.coordinator === null || this.coordinator.u_id < 0) {
            resolve(false);
          } else {
            this.isLogin = true;
            this._router.navigate(["job-postings"]);
            resolve(true);
          }

        }, 1000)
      });
    };
    let async_function = async function () {
      const login_promise = await login_function();
      console.log(login_promise);
    }
    await async_function();
  }

  // @ts-ignore
  async loginFaculty(email: string, loginPswrd: string): Promise<boolean> {
    let login_function = () => {
      console.log("Entered Faculty Login function");
      console.log("get login user from rest api");
      let facultyLogin: Promise<Faculty> = Promise.resolve(this._restApi.fetchLogin(email, "faculty", loginPswrd));
      return new Promise(resolve => {
        setTimeout(() => {
          this.faculty = this._localStorage.getSessionObject("user")
          if (this.faculty === null || this.faculty.u_id < 0) {
            resolve(false);
          } else {
            this.isLogin = true;
            this._localStorage.saveSessionObject("LOGIN SUCCESS", "actionMsg")
            this._router.navigate(["job-postings"]);
            resolve(true);
          }
        }, 1000)
      });
    };
    let async_function = async function () {
      const login_promise = await login_function();
      console.log(login_promise);
    }
    await async_function();
  }

  async onSubmit(form: NgForm) {
    this._localStorage.deleteSessionObject("actionMsg");
    let emailLogin: string;
    let pswrdLogin: string;
    this.isError = false;

    emailLogin = (<HTMLInputElement>document.getElementById("email")).value;
    pswrdLogin = (<HTMLInputElement>document.getElementById("password")).value;

    if ((pswrdLogin === null || pswrdLogin === "") && (emailLogin === null || emailLogin === "")) {
      this.isError = true;
      this.errorMessage = "Please enter a valid E-mail \nPlease enter your password";
      let input = (<HTMLInputElement>document.getElementById('email'));
      input.className = "input-validation-error";
      input = (<HTMLInputElement>document.getElementById("password"));
      input.className = "input-validation-error";
      this._router.navigate(['login']).then(r => true);
    } else if (!this._validator.checkEmail(emailLogin)) {
      this.isError = true;
      this.errorMessage = "Invalid E-Mail! Please enter a valid E-mail";
      let input = (<HTMLInputElement>document.getElementById('email'));
      input.className = "input-validation-error";
      this._router.navigate(['login']).then(r => true);
    } else if (pswrdLogin === null || pswrdLogin === "") {
      this.isError = true;
      this.errorMessage = "Please enter your password";
      let input = (<HTMLInputElement>document.getElementById("password"));
      input.className = "input-validation-error";
      this._router.navigate(['login']).then(r => true);
    } else {
      this.found1 = await this.loginApplicant(emailLogin, pswrdLogin);
      if (!this.found1 && !this.isLogin) {
        console.log("isLogin: " + this.isLogin);
        console.log("APPLICANT LOGIN FAILED");
        this.found2 = await this.loginAdmin(emailLogin, pswrdLogin);
      } if (!this.found2 && !this.isLogin) {
        console.log("isLogin: " + this.isLogin);
        console.log("ADMIN LOGIN FAILED");
        this.found3 = await this.loginCoord(emailLogin, pswrdLogin);
      } if (!this.found3 && !this.isLogin) {
        console.log("isLogin: " + this.isLogin);
        console.log("COORDINATOR LOGIN FAILED");
        this.found4 = await this.loginFaculty(emailLogin, pswrdLogin);
      } if (!this.found4 && !this.isLogin) {
        console.log("isLogin: " + this.isLogin);
        console.log("FACULTY LOGIN FAILED");
      } if (!this.isLogin) {
        this.isError = true;
        this.errorMessage = "Invalid Login! Please try again...";
        this._router.navigate(['login']).then(r => true);
      }
    }
  }

  logout() {
    this._localStorage.logout();
    this._router.navigate(['home']);
    console.log("LOGGED OUT!!!!");
  }
}
