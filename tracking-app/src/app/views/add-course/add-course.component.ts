import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Section } from '../../../models/course/section.model';
import { Term } from '../../../models/course/term.model';
import { JsonConvertionsService } from '../../services/json-convertions.service';
import { PersistenceService } from '../../services/persistence.service';
import { RestApiService } from '../../services/rest-api.service';
import { LoginComponent } from '../login/login.component';
import {Course} from "../../../models/course/course.model";
import {ValidationService} from "../../services/validation.service";

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent implements OnInit {
  errorMessage: any;
  isError: boolean = false;
  u_id: number = -1;
  user_type: number = -1;
  sections: Array<Section> | undefined;
  terms: Array<Term> | undefined;
  course: any;

  constructor(
    private _login: LoginComponent,
    private _router: Router,
    private _convertJson: JsonConvertionsService,
    private _getUrl: ActivatedRoute,
    private _persistence: PersistenceService,
    private _restApi: RestApiService,
    private _validate: ValidationService,
  ) {}

  add_Edit_Course_Form = new FormGroup({
    courseId: new FormControl(),
    courseCode: new FormControl(),
    courseName: new FormControl(),
    sectionId: new FormControl(),
    termId: new FormControl(),
  });

  // @ts-ignore
  async getTerms(): Promise<Array<Term>> {
    let returnedTerms = await this._restApi.getListTerms();
    console.log(returnedTerms);
    return returnedTerms;
  }

  // @ts-ignore
  async getSections(): Promise<Array<Section>> {
    let returnedSections = await this._restApi.getListSections();
    console.log('Returned Section: ' + returnedSections);
    return returnedSections;
  }

  async ngOnInit() {
    this.sections = await this.getSections();
    this.terms = await this.getTerms();
    console.log(this.sections);
    console.log(this.terms);
  }

  submit() {
    this.isError = false;
    let courseCode = this.add_Edit_Course_Form.get('courseCode')?.value;
    let courseName = this.add_Edit_Course_Form.get('courseName')?.value;
    let sectionId = this.add_Edit_Course_Form.get('sectionId')?.value;
    let termId = this.add_Edit_Course_Form.get('termId')?.value;

    if(!this._validate.checkCourseCode(courseCode)){
      this.isError = true;
      this.errorMessage = "Please enter a valid Course Code";
      let input = (<HTMLInputElement>document.getElementById("courseCode"));
      input.className = "input-validation-error";
      this._router.navigate(['add-course']).then(r => true);
    } else if (courseName === "" || courseName === undefined){
      this.isError = true;
      this.errorMessage = "Please enter a Course Name";
      let input = (<HTMLInputElement>document.getElementById("courseName"));
      input.className = "input-validation-error";
      this._router.navigate(['add-course']).then(r => true);
    } else if (sectionId === 'default') {
      this.isError = true;
      this.errorMessage = "Please choose a section #";
      let input = (<HTMLInputElement>document.getElementById("sectionId"));
      input.className = "input-validation-error";
      this._router.navigate(['add-course']).then(r => true);
    } else if (termId === 'default') {
      this.isError = true;
      this.errorMessage = "Please choose a college Term";
      let input = (<HTMLInputElement>document.getElementById("termId"));
      input.className = "input-validation-error";
      this._router.navigate(['add-course']).then(r => true);
    } else if (!this.isError){
      this.course = new Course (
        courseCode,
        courseName.toUpperCase(),
        sectionId,
        termId
      );
      this._restApi.postFetch(this.course, "/courses", "post");
      this._persistence.saveSessionObject('success', "COURSE ADDED SUCCESSFULLY!!");
      this._router.navigate(['/management']);
    }
  }
}
