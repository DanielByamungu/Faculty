import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Applicant } from 'src/models/users/applicant.model';
import { ErrorMessageComponent } from "../../components/forms/error-message/error-message.component";
import { HashingService } from "../../services/hashing.service";
import { PersistenceService } from "../../services/persistence.service";
import { RestApiService } from "../../services/rest-api.service";
import { ValidationService } from "../../services/validation.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  isLogin: boolean = false;
  errorMessage1: any;
  errorMessage2: any;
  isError: boolean = false;
  constructor(
    private _router: Router,
    private _validator: ValidationService,
    private _error: ErrorMessageComponent,
    private _restApi: RestApiService,
    private _storage: PersistenceService,
    private _hash: HashingService,
  ) {}
  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.isError = false;
    this.errorMessage1 = "";
    this.errorMessage2 = "";
    let email = (<HTMLInputElement> document.getElementById('email')).value;
    let password = (<HTMLInputElement> document.getElementById('password')).value;

    if (!this._validator.checkEmail(email)) {
      console.log("FAILED EMAIL");
      this.isError = true;
      this.errorMessage1 = "Invalid E-Mail! Please enter a valid E-mail";
      let input = (<HTMLInputElement> document.getElementById('email'));
      input.className = "input-validation-error";
      this._router.navigate(['register']);
    }
    if (!this._validator.checkPassword(password)) {
      console.log("FAILED PASSWORD");
      this.isError = true;
      this.errorMessage2 = "Invalid password. \nPlease ensure to meet the following requirements: " +
        "\n\t -Minimum of 9 characters in length" +
        "\n\t -At least 2 Uppercase Letters" +
        "\n\t -At least 1 Special Character" +
        "\n\t -At least 2 numbers" +
        "\n\t -Minimum of 3 Lowercase characters";
      let input = (<HTMLInputElement> document.getElementById('password'));
      input.className = "input-validation-error";
      this._router.navigate(['register']);
    } else if (!this.isError){
      console.log("PASSED ALL");
      let newApplicant = new Applicant();
      newApplicant.email = email;
      newApplicant.pswrd = this._hash.generateHash(password);
      newApplicant.type_id = 4;
      this._restApi.addApplicant(newApplicant);
      this._storage.saveSessionObject("REGISTERED SUCCESSFULLY!", "actionMsg");
      this._router.navigate(['login']);
    }
 }
}
