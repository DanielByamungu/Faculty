import {RestApiService} from "../../app/services/rest-api.service";
import {Term} from "./term.model";

export class Course {
  course_id: number | undefined;
  course_code: string | undefined;
  course_name: string | undefined;
  section_id: number | undefined;
  term_id: number;


  constructor(course_code?: string, course_name?: string, section_id?: number, term_id?: number, id?: number) {
    this.course_code = course_code;
    this.course_name = course_name;
    this.section_id = section_id;
    this.term_id = <number>term_id;
    this.course_id = id;
  }
}
