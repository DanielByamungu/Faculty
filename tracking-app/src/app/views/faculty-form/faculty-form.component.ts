import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coordinator } from '../../../models/users/coordinator.model';
import { Faculty } from '../../../models/users/faculty.model';
import { ErrorMessageComponent } from '../../components/forms/error-message/error-message.component';
import { HashingService } from '../../services/hashing.service';
import { RestApiService } from '../../services/rest-api.service';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-faculty-form',
  templateUrl: './faculty-form.component.html',
  styleUrls: ['./faculty-form.component.css'],
})
export class FacultyFormComponent implements OnInit {
  constructor(
    private _router: Router,
    private _restApi: RestApiService,
    private _hash: HashingService,
    private _validator: ValidationService,
    private _error: ErrorMessageComponent
  ) {}

  url: string = '';
  splitUrl: string[] = [];
  userType: string = '';
  typeId: number = -1;
  newRegister: any;
  errorMessage1: any;
  errorMessage2: any;
  isError: boolean = false;

  ngOnInit(): void {
    // 1. Get URL
    this.url = this._router.url;

    // 2. Split by '/'
    this.splitUrl = this.url.split('/');

    // 3. Get last element
    let index: number = this.splitUrl.length - 1;
    this.userType = this.splitUrl[index];

    if (this.userType == 'faculty') {
      this.typeId = 3;
    } else if (this.userType == 'coordinator') {
      this.typeId = 2;
    }
  }

  onSubmit(): void {
    this.isError = false;
    this.errorMessage1 = '';
    this.errorMessage2 = '';

    // 4. Add to database based on it being coordinator or faculty
    let email = (<HTMLInputElement>document.getElementById('email')).value;
    let password = (<HTMLInputElement>document.getElementById('password'))
      .value;

    if (!this._validator.checkCoord_FacultyEmail(email)) {
      this.isError = true;
      this.errorMessage1 =
        'Invalid E-Mail! Please enter a valid Conestoga E-mail';
      let input = <HTMLInputElement>document.getElementById('email');
      input.className = 'input-validation-error';
      this._router.navigate([`faculty/form/${this.userType}`]);
    }
    if (!this._validator.checkPassword(password)) {
      this.isError = true;
      this.errorMessage2 =
        'Invalid password. \nPlease ensure to meet the following requirements: ' +
        '\n\t -Minimum of 9 characters in length' +
        '\n\t -At least 2 Uppercase Letters' +
        '\n\t -At least 1 Special Character' +
        '\n\t -At least 2 numbers' +
        '\n\t -Minimum of 3 Lowercase characters';
      let input = <HTMLInputElement>document.getElementById('password');
      input.className = 'input-validation-error';
      this._router.navigate([`faculty/form/${this.userType}`]);
    } else if (!this.isError) {
      let userTypeID = this.typeId;
      if (userTypeID == 2) {
        this.newRegister = new Coordinator();
        this.newRegister.email = email;
        this.newRegister.pswrd = this._hash.generateHash(password);
        this.newRegister.type_id = userTypeID;
        this.newRegister.hire_date = '2023-02-27';
        this.newRegister.r_id = 1;
        this._restApi.addCoordinator(this.newRegister);
        this._router.navigate(['management']);
      } else if (userTypeID == 3) {
        this.newRegister = new Faculty();
        this.newRegister.email = email;
        this.newRegister.pswrd = this._hash.generateHash(password);
        this.newRegister.type_id = userTypeID;
        this.newRegister.hire_date = '2023-02-27';
        this.newRegister.r_id = 1;
        this._restApi.addFaculty(this.newRegister);
        this._router.navigate(['management']);
      }
    }
  }
}
