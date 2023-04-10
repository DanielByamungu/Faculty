import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { WorkBook, WorkSheet, read, utils } from 'xlsx';
import { Course } from '../../../models/course/course.model';
import { CourseTaught } from '../../../models/course/courses_taught.model';
import { Faculty } from '../../../models/users/faculty.model';
import { HashingService } from '../../services/hashing.service';
import { JsonConvertionsService } from '../../services/json-convertions.service';
import { PersistenceService } from '../../services/persistence.service';
import { RestApiService } from '../../services/rest-api.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
})
export class ManagementComponent implements OnInit {
  constructor(
    private _router: Router,
    private _localStorage: PersistenceService,
    private _convertJson: JsonConvertionsService,
    private _restApi: RestApiService,
    private _hash: HashingService
  ) {}

  user: any;
  today: Date = new Date();
  successMsg: string = '';
  workSheet: WorkSheet | null = null;
  managementTab: number = 1;

  ngOnInit(): void {
    this.user = this._localStorage.getSessionObject('user');
    this.successMsg = this._localStorage.getSessionObject('success');
  }

  uploadExcelForm = new FormGroup({
    userId: new FormControl(),
    sheet: new FormControl(),
  });

  public tabClickEvent(tabId: number): void {
    this.managementTab = tabId;
  }

  logout() {
    this._localStorage.logout();
    this._router.navigate(['home']);
    console.log('LOGGED OUT!!!!');
  }

  onchange(sheet: HTMLInputElement, event: any) {
    let addCourse: Course = new Course();
    let addFaculty: Faculty = new Faculty();
    let addCT: CourseTaught = new CourseTaught(-1, -1);
    const target: DataTransfer = <DataTransfer>event.target;
    if (target.files.length !== 1)
      throw new Error('Cannot select multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = async (e: any) => {
      const arrayBuffer: ArrayBuffer = e.target.result;
      const workBook: WorkBook = read(arrayBuffer);
      const numSheets = workBook.SheetNames.length;
      console.log('numSheets', numSheets);
      for (let i = 0; i < numSheets; i++) {
        const sheetName: string = workBook.SheetNames[i];
        console.log(sheetName + ' sheet being parsed!');
        switch (sheetName.trim().toLowerCase()) {
          case 'courses':
            this.workSheet = workBook.Sheets[sheetName];
            const codes = utils.sheet_to_json<rowCourse>(this.workSheet, {
              header: 1,
            });
            for (let x = 1; x < codes.length; x++) {
              let row: string = codes[x].toString();
              let split: string[] = row.split(',');
              addCourse.course_code = split[0].trim();
              addCourse.course_name = split[1].trim().toUpperCase();
              addCourse.section_id = parseInt(split[2].trim());
              switch (split[3].trim().toUpperCase()) {
                case 'SPRING 2023':
                  addCourse.term_id = 1;
                  break;
                case 'FALL 2023':
                  addCourse.term_id = 2;
                  break;
                case 'WINTER 2024':
                  addCourse.term_id = 3;
                  break;
                case 'SPRING 2024':
                  addCourse.term_id = 4;
                  break;
              }
              await this._restApi.postFetch(addCourse, '/courses', 'post');
            }
            break;

          case 'faculty':
            this.workSheet = workBook.Sheets[sheetName];
            const faculty = utils.sheet_to_json<rowFaculty>(this.workSheet, {
              header: 1,
            });
            for (let y = 1; y < faculty.length; y++) {
              let row: string = faculty[y].toString();
              let split: string[] = row.split(',');
              addFaculty.full_name = split[0].toUpperCase().trim();
              addFaculty.email = split[1].trim();
              //addFaculty.hire_date = new Date(split[2]);
              addFaculty.hire_date = new Date('2000-01-01');
              addFaculty.type_id = 3;
              addFaculty.pswrd = this._hash.generateHash('TEst123!@#');
              await this._restApi.postFetch(addFaculty, '/faculty', 'post');
            }
            break;

          case 'courses_taught':
            this.workSheet = workBook.Sheets[sheetName];
            const ct = utils.sheet_to_json<rowCT>(this.workSheet, {
              header: 1,
            });
            for (let a = 1; a < ct.length; a++) {
              let row: string = ct[a].toString();
              let split: string[] = row.split(',');
              //let u_id = await this._restApi.getFacultyByEmail(split[3]);
              addCT.course_id = await this._restApi.getCourseId(
                split[0],
                parseInt(split[1]),
                split[2]
              );
              console.log('course_id:', addCT.course_id);
              addCT.u_id = await this._restApi.getFacultyIdByEmail(split[3]);
              await this._restApi.postFetch(addCT, '/coursestaught', 'post');
            }
        }
        setTimeout(() => {
          console.log('Delayed for 1 second.');
        }, 1000);
      }
    };
    reader.readAsArrayBuffer(target.files[0]);
  }
}

interface rowCourse {
  Code: string;
  Name: string;
  Section: number;
  Term: string;
}

interface rowFaculty {
  Name: string;
  Email: string;
  Hired: Date;
}

interface rowCT {
  Code: string;
  Section: number;
  Term: string;
  Email: string;
}
