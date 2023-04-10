import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Section } from 'src/models/course/section.model';
import { Term } from 'src/models/course/term.model';
import { Course } from '../../../models/course/course.model';
import { Admin } from '../../../models/users/admin.model';
import { Coordinator } from '../../../models/users/coordinator.model';
import { ErrorMessageComponent } from '../../components/forms/error-message/error-message.component';
import { HashingService } from '../../services/hashing.service';
import { JsonConvertionsService } from '../../services/json-convertions.service';
import { PersistenceService } from '../../services/persistence.service';
import { RestApiService } from '../../services/rest-api.service';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css'],
})
export class EditCourseComponent implements OnInit {
  public errorMessage = '';
  public isError = false;
  public sections: Section[] = [];
  public terms: Term[] = [];
  public course_id = -1;
  public course: Course = new Course();
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
    this.course_id = Number(this._activatedRoute.snapshot.paramMap.get('id'));
    this.course = await this._restApi.getCourse(this.course_id);
    console.log('COURSE: ' + this._json.toJSON(this.course));
    this.sections = await this._restApi.getListSections();
    this.terms = await this._restApi.getListTerms();
  }

  submit() {
    this.isError = false;
    if (!this._validator.checkCourseCode(<string>this.course.course_code)) {
      this.isError = true;
      this.errorMessage = "Please enter a valid Course Code";
      let input = (<HTMLInputElement>document.getElementById('courseCode'));
      input.className = "input-validation-error";
      this._router.navigate([`edit-course/${this.course.course_id}`]);
    }
    if(!this.isError) {
      this.course.course_name = this.course.course_name?.trim().toUpperCase();
      this._restApi.postFetch(this.course, `/courses/${this.course.course_id}`, "put");
    }
  }
}
