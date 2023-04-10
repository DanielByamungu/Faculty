import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PersistenceService} from "../../services/persistence.service";
import {RestApiService} from "../../services/rest-api.service";
import {JsonConvertionsService} from "../../services/json-convertions.service";
import {Course} from "../../../models/course/course.model";
import {Term} from "../../../models/course/term.model";
import {CourseTaught} from "../../../models/course/courses_taught.model";

interface TableObject {
  course_code: string | undefined;
  course_name: string | undefined;
  section_id: number | undefined;
  term_name: string | undefined;
  course_id: number | undefined;
}

@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.css']
})
export class ViewCoursesComponent implements OnInit {
  errorMessage: any;
  isError: boolean = false;
  u_id: number = -1;
  user_type: number = -1;
  courses: Array<Course> = new Array<Course>();
  terms: Array<Term> = new Array<Term>();
  tableArray: Array<TableObject> = new Array<TableObject>();
  getByNameURL: string = "http://localhost:8080/courses/find-name/";
  getByCodeURL: string = "http://localhost:8080/courses/find-code/";
  filterType: string = "ALL";
  isChecked: boolean = false;
  coursesTaught: CourseTaught[] = [];

  constructor(
    private _router: Router,
    private _localStorage: PersistenceService,
    private _restApi: RestApiService,
    private _convert: JsonConvertionsService
  ) {
  }

  async ngOnInit() {
    this.courses = await this.getCourses();
    this.terms = await this.getTerms();
    for (let i = 0; i < this.courses.length; i++) {
      this.tableArray[i] = {
        course_code: this.courses[i].course_code,
        course_name: this.courses[i].course_name,
        section_id: this.courses[i].section_id,
        term_name: this.getTermName(this.courses[i].term_id),
        course_id: this.courses[i].course_id
      };
    }
    this.coursesTaught = await this._restApi.getCoursesTaughtList();
  }

  async getCourses(): Promise<Array<Course>> {
    return await this._restApi.getListCourses();
  }

  public getTermName(id: number | undefined): string {
    for (let i = 0; i < this.terms.length; i++) {
      if (this.terms[i].term_id == id) {
        return <string>this.terms[i].term_name;
      } else {
        continue;
      }
    }
    return "Error";
  }

  logout() {
    this._localStorage.logout();
    this._router.navigate(['home']);
  }

  async getTerms(): Promise<Array<Term>> {
    return await this._restApi.getListTerms();
  }

  async filterTable(filterBy: HTMLInputElement, type: string) {
    this.filterType = type;
    let url: string = "";
    if (this.filterType == "NAME") {
      let courseName = filterBy.value.toUpperCase().trim();
      url = `http://localhost:8080/courses/find-name/${courseName}`;
      this.courses = await this._restApi.getTableByFilter(url);
      await this._router.navigate(['view-courses']);
    }
    if (this.filterType == "CODE") {
      let courseCode = filterBy.value.toUpperCase().trim();
      url = `http://localhost:8080/courses/find-code/${courseCode}`;
      this.courses = await this._restApi.getTableByFilter(url);
      await this._router.navigate(['view-courses']);
    }
  }

  async checkBoxChanged() {
    if (this.isChecked) {
      for (let x = 0; x < this.courses.length; x++){
        for (let y = 0 ; y < this.coursesTaught.length; y++) {
          if (this.courses[x].course_id == this.coursesTaught[y].course_id) {
            this.courses.splice(x, 1);
            x = x -1;
            break;
          }
        }
      }
    }
    if (!this.isChecked) {
      this.courses = await this.getCourses();
    }
  }
}
