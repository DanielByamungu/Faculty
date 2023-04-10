import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from '../../../models/users/admin.model';
import { Coordinator } from '../../../models/users/coordinator.model';
import { Faculty } from '../../../models/users/faculty.model';
import { ErrorMessageComponent } from '../../components/forms/error-message/error-message.component';
import { HashingService } from '../../services/hashing.service';
import { JsonConvertionsService } from '../../services/json-convertions.service';
import { PersistenceService } from '../../services/persistence.service';
import { RestApiService } from '../../services/rest-api.service';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-edit-faculty',
  templateUrl: './edit-faculty.component.html',
  styleUrls: ['./edit-faculty.component.css'],
})
export class EditFacultyComponent implements OnInit {
  public isError = false;
  public errorMessage1 = '';
  public errorMessage2 = '';
  public errorMessage3 = '';
  public errorMessage4 = '';
  public errorMessage5 = '';
  public u_id = -1;
  public faculty: Faculty = new Faculty();
  // @ts-ignore
  public user: Admin | Coordinator;

  constructor(
    private _localStorage: PersistenceService,
    private _restApi: RestApiService,
    private _json: JsonConvertionsService,
    private _activatedRoute: ActivatedRoute,
    private _hash: HashingService,
    private _validator: ValidationService,
    private _error: ErrorMessageComponent,
    private _router: Router
  ) {}

  async ngOnInit() {
    this.user = this._localStorage.getSessionObject('user');
    this.u_id = Number(this._activatedRoute.snapshot.paramMap.get('u_id'));
    this.faculty = await this._restApi.getFacultyById(this.u_id);
  }

  submit(editFacultyForm: NgForm) {
    this.isError = false;
    this.errorMessage1 = '';
    this.errorMessage2 = '';
    this.errorMessage3 = '';
    this.errorMessage4 = '';
    this.errorMessage5 = '';
    let pswrdInput = editFacultyForm.control.get('password');

    if (!this._validator.checkName(this.faculty.full_name.toUpperCase())){
      this.isError = true;
      this.errorMessage1 = "Invalid Name! Please enter a valid name!";
      let input = (<HTMLInputElement> document.getElementById('fullName'));
      input.className = "input-validation-error";
      this._router.navigate([`edit-faculty/${this.u_id}`]);
    }

    if (!this._validator.checkCoord_FacultyEmail(this.faculty.email)){
      this.isError = true;
      this.errorMessage2 = "Invalid E-Mail! Please enter a valid Conestoga E-mail";
      let input = (<HTMLInputElement> document.getElementById('email'));
      input.className = "input-validation-error";
      this._router.navigate([`edit-faculty/${this.u_id}`]);
    }

    if (this.faculty.home_phone === null && this.faculty.mobile_phone === null) {
      this.isError = true;
      this.errorMessage3 = "Invalid Phone #! Please enter a valid Phone # \n(555)555-5555 OR \n(123) 123-1234\n";
      this.errorMessage4 = "Invalid Phone #! Please enter a valid Phone # \n(555)555-5555 OR \n(123) 123-1234\n";
      let input = (<HTMLInputElement>document.getElementById('homePhone'));
      input.className = "input-validation-error";
      input = (<HTMLInputElement>document.getElementById('mobilePhone'));
      input.className = "input-validation-error";
      this._router.navigate([`edit-faculty/${this.u_id}`]);
    } else {
      if (this.faculty.home_phone !== null && this.faculty.mobile_phone === null) {
        if (!this._validator.checkPhone(this.faculty.home_phone)) {
          this.isError = true;
          this.errorMessage3 = "Invalid Phone #! Please enter a valid Phone # \n(555)555-5555 OR \n(123) 123-1234\n";
          let input = (<HTMLInputElement>document.getElementById('homePhone'));
          input.className = "input-validation-error";
          this._router.navigate([`edit-faculty/${this.u_id}`]);
        }
      } else if (this.faculty.mobile_phone !== null && this.faculty.home_phone === null) {
        if (!this._validator.checkPhone(this.faculty.mobile_phone)) {
          this.isError = true;
          this.errorMessage4 = "Invalid Phone #! Please enter a valid Phone # \n(555)555-5555 OR \n(123) 123-1234\n";
          let input = (<HTMLInputElement>document.getElementById('mobilePhone'));
          input.className = "input-validation-error";
          this._router.navigate([`edit-faculty/${this.u_id}`]);
        }
      } else if (this.faculty.home_phone !== null && this.faculty.mobile_phone !== null) {
        if (!this._validator.checkPhone(this.faculty.home_phone ) && !this._validator.checkPhone(this.faculty.mobile_phone)) {
          this.isError = true;
          this.errorMessage3 = "Invalid Phone #! Please enter a valid Phone # \n(555)555-5555 OR \n(123) 123-1234\n";
          this.errorMessage4 = "Invalid Phone #! Please enter a valid Phone # \n(555)555-5555 OR \n(123) 123-1234\n";
          let input = (<HTMLInputElement>document.getElementById('homePhone'));
          input.className = "input-validation-error";
          input = (<HTMLInputElement>document.getElementById('mobilePhone'));
          input.className = "input-validation-error";
          this._router.navigate([`edit-faculty/${this.u_id}`]);
        }
      }
    }

    if(!this.isError) {
      this.faculty.full_name = this.faculty.full_name.toUpperCase().trim();
      let changed = pswrdInput?.touched;
      console.log(this._json.toJSON(this.faculty));
      if (changed) {
        if (!this._validator.checkPassword(this.faculty.pswrd)) {
          this.isError = true;
          this.errorMessage5 = "Invalid password. \nPlease ensure to meet the following requirements: " +
            "\n\t -Minimum of 9 characters in length" +
            "\n\t -At least 2 Uppercase Letters" +
            "\n\t -At least 1 Special Character" +
            "\n\t -At least 2 numbers" +
            "\n\t -Minimum of 3 Lowercase characters";
          let input = (<HTMLInputElement> document.getElementById('password'));
          input.className = "input-validation-error";
          this._router.navigate([`edit-faculty/${this.u_id}`]);
        }
        if(!this.isError) {
          this.faculty.pswrd = this._hash.generateHash(this.faculty.pswrd);
        }
      }
      this._restApi.postFetch(this.faculty, `/faculty/${this.faculty.u_id}`, 'put');
      this._router.navigate(['/view-faculty']);
    }
  }
}
