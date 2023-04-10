import {Injectable} from '@angular/core';
import {Admin} from '../../models/users/admin.model';
import {Applicant} from '../../models/users/applicant.model';
import {Coordinator} from '../../models/users/coordinator.model';
import {Faculty} from '../../models/users/faculty.model';
import {Section} from '../../models/course/section.model';
import {Term} from '../../models/course/term.model';
import {HashingService} from './hashing.service';
import {JsonConvertionsService} from './json-convertions.service';
import {PersistenceService} from './persistence.service';
import {Course} from "../../models/course/course.model";
import {Program} from "../../models/course/program.model";
import {DayOfWeek} from "../../models/schedules/days_week.model";
import {ApplicantAvailability} from "../../models/schedules/applicant_availability.model";
import {Skill} from "../../models/skills/skill.model";
import {SkillRanking} from "../../models/skills/skill_ranking.model";
import {JobPosting} from "../../models/jobs/job_posting.model";
import {Application} from "../../models/jobs/application.model";
import {CourseTaught} from "../../models/course/courses_taught.model";
import {Status} from "../../models/jobs/status.model";
import {FacultyAvailability} from "../../models/schedules/faculty_availability.model";
import {CourseSchedule} from "../../models/schedules/course_schedule.model";
import {Rating} from "../../models/users/rating.model";
import {FacultySkill} from "../../models/skills/faculty_skills.model";
import {ApplicantSkills} from "../../models/skills/applicant_skills.model";

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  private admin: Admin = new Admin();
  private coord: Coordinator = new Coordinator();
  private faculty: Faculty = new Faculty();
  private applicant: Applicant = new Applicant();

  constructor(
    private _jsonConvert: JsonConvertionsService,
    private _hash: HashingService,
    private _localStorage: PersistenceService,
    private _json: JsonConvertionsService
  ) {
  }

  async fetchLogin(email: string, table: string, loginPswrd: string): Promise<any> {
    /* const params = {
       param1: value1,
       param2: value2,
     };*/
    const options = {
      method: 'POST',
      mode: 'cors',
      // body: object,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origins': '*',
      },
    };
    // @ts-ignore
    fetch('http://localhost:8080/' + table + '/login?email=' + email, options).then(async (response) => {
      if (!response.ok) {
        throw new Error('Http error! Status: ' + response.status);
      }
      switch (table) {
        case 'admins':
          try {
            this.admin = await response.json();
            if (this._hash.validatePassword(loginPswrd, this.admin.pswrd)) {
              console.log('PASSED ADMIN PSWRD VALIDATION');
              this._localStorage.saveSessionObject(this.admin, 'user');
              return this.admin;
            } else {
              console.log('FAILED ADMIN PSWRD VALIDATION');
              throw Error;
            }
          } catch (e) {
            return (this.admin = new Admin());
          }

        case 'coordinators':
          console.log("IN CASE 'coordinators'");
          try {
            this.coord = await response.json();
            if (this._hash.validatePassword(loginPswrd, this.coord.pswrd)) {
              console.log('PASSED COORD PSWRD VALIDATION');
              this._localStorage.saveSessionObject(this.coord, 'user');
              return this.coord;
            } else {
              console.log('FAILED COORD PSWRD VALIDATION');
              throw Error;
            }
          } catch (e) {
            return this.coord;
          }

        case 'faculty':
          try {
            this.faculty = await response.json();
            if (this._hash.validatePassword(loginPswrd, this.faculty.pswrd)) {
              console.log('PASSED FACULTY PSWRD VALIDATION');
              this._localStorage.saveSessionObject(this.faculty, 'user');
              return this.faculty;
            } else {
              console.log('FAILED FACULTY PSWRD VALIDATION');
              throw Error;
            }
          } catch (e) {
            return this.faculty;
          }

        case 'applicants':
          try {
            this.applicant = await response.json();
            if (this._hash.validatePassword(loginPswrd, this.applicant.pswrd)) {
              console.log('PASSED APPLICANT PSWRD VALIDATION');
              this._localStorage.saveSessionObject(this.applicant, 'user');
              return this.applicant;
            } else {
              console.log('FAILED APPLICANT PSWRD VALIDATION');
              throw Error;
            }
          } catch (e) {
            return (this.applicant = new Applicant());
          }
        default:
          return response.json();
      }
    });
  }

  async deleteFetch(url: string) {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origins': '*',
      },
    };

    await fetch(`http://localhost:8080${url}`, options);
  }

  postFetch(object: Object, url: string, method: string) {
    const options = {
      method: method.toUpperCase().trim(),
      RequestMode: 'cors',
      body: this._jsonConvert.toJSON(object),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origins': '*',
      },
    };
    fetch('http://localhost:8080' + url, options)
      .then((response) => response.json())
      .then((response) => {
        return response;
      });
  }

  async getUsers(tableName: string, type_id: number): Promise<any> {

    switch (type_id) {
      case 1:
        try {
          let admins = new Array<Admin>();
          let list_function = async (): Promise<Admin[]> => {
            console.log('Entered List Function');
            return await fetch('http://localhost:8080/admins')
              .then(async (response) => {
                let data = await response.json();
                for (let i = 0; i < data.length; i++) {
                  this.admin = new Admin();
                  this.admin.u_id = data[i].u_id;
                  this.admin.email = data[i].email;
                  this.admin.type_id = data[i].type_id;
                  admins[i] = this.coord;
                }
                return admins;
              });
          }
          return list_function();
        } catch (e) {
          return ("ERROR");
        }

      case 2:
        try {
          let coords = new Array<Coordinator>();
          let list_function = async (): Promise<Coordinator[]> => {
            console.log('Entered List Function');
            return await fetch('http://localhost:8080/coordinators')
              .then(async (response) => {
                let data = await response.json();
                console.info("HERE: ")
                for (let i = 0; i < data.length; i++) {
                  coords[i] = this.coord = new Coordinator(
                    data[i].hire_date,
                    data[i].pr_id,
                    data[i].email,
                    data[i].type_id,
                    data[i].u_id,
                  );
                  console.log(coords[i]);
                }
                return coords;
              });
          }
          return list_function();
        } catch (e) {
          return ("ERROR");
        }

      case 3:
        try {
          let faculty = new Array<Faculty>();
          let list_function = async (): Promise<Faculty[]> => {
            console.log('Entered List Function');
            return await fetch('http://localhost:8080/faculty')
              .then(async (response) => {
                let data = await response.json();
                for (let i = 0; i < data.length; i++) {
                  this.faculty = new Faculty();
                  this.faculty = data[i];
                  /*          this.faculty.u_id = data[i].u_id;
                            this.faculty.email = data[i].email;
                            this.faculty.type_id = data[i].type_id;
                            this.faculty.hire_date = data[i].hire_date;
                            this.faculty.full_name = data[i].full_name;
                            this.faculty.home_phone = data[i].home_phone;
                            this.faculty.mobile_phone = data[i].mobile_phone;*/
                  faculty[i] = this.faculty;
                }
                return faculty;
              });
          }
          return list_function();
        } catch (e) {
          return ("ERROR");
        }

      case 4:
        try {
          let applicants = new Array<Applicant>();
          let list_function = async (): Promise<Applicant[]> => {
            console.log('Entered List Function');
            return await fetch('http://localhost:8080/applicants')
              .then(async (response) => {
                let data = await response.json();
                for (let i = 0; i < data.length; i++) {
                  this.applicant = new Applicant();
                  this.applicant = data[i];
                  /*    this.applicant.u_id = data[i].u_id;
                      this.applicant.email = data[i].email;
                      this.applicant.type_id = data[i].type_id;
                      this.applicant.full_name = data[i].full_name;
                      this.applicant.home_phone = data[i].home_phone;
                      this.applicant.mobile_phone = data[i].mobile_phone;*/
                  applicants[i] = this.applicant;
                }
                return applicants;
              });
          }
          return list_function();
        } catch (e) {
          return "ERROR";
        }

      default:
        return "ERROR";
    }

  }

  addAdmin(adminUser: Admin) {
    const options = {
      method: 'POST',
      RequestMode: 'cors',
      body: this._jsonConvert.toJSON(adminUser),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origins': '*',
      },
    };

    fetch('http://localhost:8080/admins', options)
      .then((response) => response.json())
      .then((response) => {
        console.log('INSERT ADMIN SUCCESS: ' + response);
      });
  }

  addApplicant(appUser: Applicant) {
    const options = {
      method: 'POST',
      RequestMode: 'cors',
      body: this._jsonConvert.toJSON(appUser),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origins': '*',
      },
    };

    fetch('http://localhost:8080/applicants', options)
      .then((response) => response.json())
      .then((response) => {
        console.log('INSERT APPLICANT SUCCESS: ' + response);
      });
  }

  addCoordinator(coordUser: Coordinator) {
    const options = {
      method: 'POST',
      RequestMode: 'cors',
      body: this._jsonConvert.toJSON(coordUser),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origins': '*',
      },
    };

    fetch('http://localhost:8080/coordinators', options)
      .then((response) => response.json())
      .then((response) => {
        console.log('INSERT COORDINATOR SUCCESS: ' + response);
      });
  }

  addFaculty(facultyUser: Faculty) {
    const options = {
      method: 'POST',
      RequestMode: 'cors',
      body: this._jsonConvert.toJSON(facultyUser),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origins': '*',
      },
    };

    fetch('http://localhost:8080/faculty', options)
      .then((response) => response.json())
      .then((response) => {
        console.log('INSERT FACULTY SUCCESS: ' + response);
      });
  }

  addNewRegister(newUser: any, userId: number) {
    if (userId == 2) {
      let createUser: Coordinator = newUser;

      const options = {
        method: 'POST',
        RequestMode: 'cors',
        body: this._jsonConvert.toJSON(createUser),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origins': '*',
        },
      };
      fetch('http://localhost:8080/coordinators', options)
        .then((response) => response.json())
        .then((response) => {
          console.log('INSERT COORDINATOR SUCCESS: ' + response);
        });
    } else if (userId == 3) {
      let createUser: Faculty = newUser;

      const options = {
        method: 'POST',
        RequestMode: 'cors',
        body: this._jsonConvert.toJSON(createUser),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origins': '*',
        },
      };
      fetch('http://localhost:8080/faculty', options)
        .then((response) => response.json())
        .then((response) => {
          console.log('INSERT FACULTY SUCCESS: ' + response);
        });
    }
  }

  async getListSections(): Promise<Section[]> {
    let sections = new Array<Section>();
    let list_function = async (): Promise<Section[]> => {
      console.log('Entered List Function');
      return await fetch('http://localhost:8080/sections')
        .then(async (response) => {
          let data = await response.json();
          for (let i = 0; i < data.length; i++) {
            sections[i] = new Section(
              data[i].section_id,
              data[i].section_number
            );
          }
          return sections;
        })
    };
    return list_function();
  }

  async getListTerms(): Promise<Term[]> {
    let terms = new Array<Term>();
    let list_function = async (): Promise<Term[]> => {
      console.log('Entered List Function');
      return await fetch('http://localhost:8080/terms')
        .then(async (response) => {
          let data = await response.json();
          for (let i = 0; i < data.length; i++) {
            terms[i] = new Term(
              data[i].term_id,
              data[i].term_name
            );
          }
          return terms;
        });
    }
    return list_function();
  }

  async getListCourses(): Promise<Course[]> {
    let courses = new Array<Course>();
    let list_function = async (): Promise<Course[]> => {
      console.log('Entered COURSE List Function');
      return await fetch('http://localhost:8080/courses')
        .then(async (response) => {
          let data = await response.json();
          for (let i = 0; i < data.length; i++) {
            courses[i] = new Course(
              data[i].course_code,
              data[i].course_name,
              data[i].section_id,
              data[i].term_id,
              data[i].course_id
            );
          }
          return courses;
        });
    }
    return list_function();
  }

  async getCoursesTaughtList(): Promise<CourseTaught[]> {
    let taughtCourses: CourseTaught[] = [];
    let list_function = async (): Promise<CourseTaught[]> => {
      console.log("Entered COURSES TAUGHT List Function");
      return await fetch('http://localhost:8080/coursestaught/all')
        .then(async (response) => {
          let data = await response.json();
          for (let i = 0; i < data.length; i++) {
            taughtCourses[i] = new CourseTaught(
              data[i].course_id,
              data[i].u_id
            );
          }
          return taughtCourses;
        });
    }
    return list_function();
  }

  async getCoursesTaughtByUserId(u_id: number): Promise<CourseTaught[]> {
    let taughtCourses: CourseTaught[] = [];
    let list_function = async (): Promise<CourseTaught[]> => {
      return await fetch(`http://localhost:8080/coursestaught/courses/${u_id}`)
        .then(async (response) => {
          let data = await response.json();
          for (let i = 0; i < data.length; i++) {
            taughtCourses[i] = new CourseTaught(
              data[i].course_id,
              data[i].u_id
            );
          }
          return taughtCourses;
        });
    }
    return list_function();
  }

  async getListCoords(): Promise<Coordinator[]> {
    let coords = new Array<Coordinator>();
    let list_function = async (): Promise<Coordinator[]> => {
      console.log('Entered COORD List Function');
      return await fetch('http://localhost:8080/coordinators')
        .then(async (response) => {
          let data = await response.json();
          for (let i = 0; i < data.length; i++) {
            coords[i] = new Coordinator(
              data[i].hire_date,
              data[i].pr_id,
              data[i].email,
              data[i].type_id,
              data[i].u_id,
            );
          }
          return coords;
        });
    }
    return list_function();
  }

  async getListFaculty(): Promise<Faculty[]> {
    let fList: Faculty[] = [];
    let list_function = async (): Promise<Faculty[]> => {
      console.log("Entered FACULTY List Function");
      return await fetch('http://localhost:8080/faculty')
        .then(async (response) => {
          let data = await response.json();
          for (let i = 0; i < data.length; i++) {
            fList[i] = new Faculty(
              data[i].email,
              data[i].pswrd,
              data[i].type_id,
              data[i].u_id,
              data[i].hire_date,
              data[i].full_name
            );
          }
          return fList;
        });
    }
    return list_function();
  }

  async getCourse(id: number): Promise<Course> {
    let course = new Course();
    let get_function = async (): Promise<Course> => {
      return await fetch('http://localhost:8080/courses/' + id)
        .then(async (response) => {
          let data = response.json();
          course = await data;
          return course;
        });
    }
    return get_function();
  }

  async getTerm(id: number | undefined): Promise<Term> {
    let term = new Term();
    let get_function = async (): Promise<Term> => {
      return await fetch('http://localhost:8080/terms/' + id)
        .then(async (response) => {
          let data = response.json();
          term = await data;
          return term;
        });
    }
    return get_function();
  }

  async getTableByFilter(url: string): Promise<Course[]> {
    let courses = new Array<Course>();
    let list_function = async (): Promise<Course[]> => {
      return await fetch(url)
        .then(async (response) => {
          let data = await response.json();
          for (let i = 0; i < data.length; i++) {
            courses[i] = new Course(
              data[i].course_code,
              data[i].course_name,
              data[i].section_id,
              data[i].term_id,
              data[i].course_id
            );
          }
          return courses;
        });
    }
    return list_function();
  }

  async getListPrograms(): Promise<Program[]> {
    let programs = new Array<Program>();
    let list_function = async (): Promise<Program[]> => {
      console.log('Entered PROGRAMS List Function');
      return await fetch('http://localhost:8080/programs')
        .then(async (response) => {
          let data = await response.json();
          for (let i = 0; i < data.length; i++) {
            programs[i] = new Program(
              data[i].pr_id,
              data[i].pr_name
            );
          }
          return programs;
        });
    }
    return list_function();
  }

  async getListDays(): Promise<DayOfWeek[]> {
    let days: DayOfWeek[] = [];
    let list_function = async (): Promise<DayOfWeek[]> => {
      console.log("Entered DAYS List Function");
      return await fetch('http://localhost:8080/daysofweek')
        .then(async (response) => {
          let data = await response.json();
          for (let i = 0; i < data.length; i++) {
            days[i] = new DayOfWeek(
              data[i].day_id,
              data[i].day_of_week
            );
          }
          return days;
        });
    }
    return list_function();
  }

  async getAvailability(table: string, id: number): Promise<ApplicantAvailability[]> {
    let availability: ApplicantAvailability[] | FacultyAvailability[] = [];
    let list_function = async (): Promise<ApplicantAvailability[]> => {
      console.log("Entered AVAILABILITY List Function");
      return await fetch(`http://localhost:8080/${table}/getByUser/${id}`)
        .then(async (response) => {
          let data = await response.json();
          for (let i = 0; i < data.length; i++) {
            availability[i] = new ApplicantAvailability(
              data[i].u_id,
              data[i].day_id,
              data[i].start_time,
              data[i].end_time,
              data[i].av_id
            );
          }
          return availability;
        });
    }
    return list_function();
  }

  async getAllSkills(): Promise<Skill[]> {
    let skills: Skill[] = [];
    let list_function = async (): Promise<Skill[]> => {
      return await fetch('http://localhost:8080/skills')
        .then(async (response) => {
          let data = await response.json();
          for (let i = 0; i < data.length; i++) {
            skills[i] = new Skill(
              data[i].skill_id,
              data[i].skill_name
            );
          }
          return skills;
        });
    }
    return list_function();
  }

  async getSkillsByUserId(u_id: number, table: string): Promise<FacultySkill[] | ApplicantSkills[]> {
    let skills: FacultySkill[] | ApplicantSkills[] = [];
    let list_function = async (): Promise<FacultySkill[] | ApplicantSkills[]> => {
      return await fetch(`http://localhost:8080/${table}skills/skills/${u_id}`)
        .then(async (response) => {
          let data = await response.json();
          for (let i = 0; i < data.length; i++) {
            skills[i] = data[i];
          }
          return skills;
        });
    }
    return list_function();
  }

  async getRankings(): Promise<SkillRanking[]> {
    let rankings: SkillRanking[] = [];
    let list_function = async (): Promise<SkillRanking[]> => {
      console.log("Entered SKILLS List Function");
      return await fetch('http://localhost:8080/skillrankings')
        .then(async (response) => {
          let data = await response.json();
          for (let i = 0; i < data.length; i++) {
            rankings[i] = new SkillRanking(
              data[i].ranking_id,
              data[i].ranking
            );
          }
          return rankings;
        });
    }
    return list_function();
  }

  async getJobPostings(): Promise<JobPosting[]> {
    let jobs: JobPosting[] = [];
    let list_funciton = async (): Promise<JobPosting[]> => {
      console.log("Entered JOBS List Function");
      return await fetch('http://localhost:8080/jobpostings')
        .then(async (response) => {
          let data = await response.json();
          for (let i = 0; i < data.length; i++) {
            jobs[i] = new JobPosting(
              data[i].course_id,
              data[i].job_id
            );
          }
          console.log("LEAVING JOBS LIST FUNCTION");
          return jobs;
        });
    };
    return list_funciton();
  }

  async getPostingById(id: number): Promise<JobPosting> {
    let posting = new JobPosting(-1, -1);
    let get_function = async (): Promise<JobPosting> => {
      return await fetch(`http://localhost:8080/jobpostings/${id}`)
        .then(async (response) => {
          let data = await response.json();
          posting = await data;
          return posting;
        });
    }
    return get_function();
  }

  async getFacultyById(u_id: number): Promise<Faculty> {
    let faculty: Faculty = new Faculty();
    let get_function = async (): Promise<Faculty> => {
      return await fetch(`http://localhost:8080/faculty/${u_id}`)
        .then(async (response) => {
          let data = await response.json();
          faculty = data;
          return faculty;
        });
    }
    return get_function();
  }

  async getFacultyIdByEmail(email: string): Promise<number> {
    let u_id: number;
    let list_function = async (): Promise<number> => {
      console.log("Enter GET FACULTY BY EMAIL Function");
      return await fetch(`http://localhost:8080/faculty/email/${email}`)
        .then(async (response) => {
          let data = await response.json();
          u_id = parseInt(data);
          return u_id;
        });
    }
    return list_function();
  };

  async getFacultyByFullName(url: string): Promise<Faculty> {
    let faculty: Faculty = new Faculty();
    let list_function = async (): Promise<Faculty> => {
      console.log("Enter GET FACULTY BY EMAIL Function");
      return await fetch(`http://localhost:8080/${url}`)
        .then(async (response) => {
          let data = await response.json();
          faculty.u_id = data.u_id;
          faculty.full_name = data.full_name;
          faculty.email = data.email;
          faculty.hire_date = data.hire_date;
          faculty.type_id = data.type_id;
          return faculty;
        });
    }
    return list_function();
  };

  async getFacultyByEmail(url: string): Promise<Faculty> {
    let faculty: Faculty = new Faculty();
    let list_function = async (): Promise<Faculty> => {
      return await fetch(`http://localhost:8080/${url}`)
        .then(async (response) => {
          let data = await response.json();
          faculty.u_id = data.u_id;
          faculty.full_name = data.full_name;
          faculty.email = data.email;
          faculty.hire_date = data.hire_date;
          faculty.type_id = data.type_id;
          return faculty;
        });
    }
    return list_function();
  };

  async getFacultyBySKill(skill_id: number, ranking_id: number): Promise<Faculty[]> {
    let facultyList: Faculty[] = [];
    let list_function = async (): Promise<Faculty[]> => {
      return await fetch(`http://localhost:8080/facultyskills/faculty/${skill_id}/${ranking_id}`)
        .then(async (response) => {
          facultyList = await response.json();
          console.log("TABLE LIST API SERVICE " + this._json.toJSON(response));
          return facultyList;
        });
    }
    return list_function();
  }

  async getApplicantBySKill(skill_id: number, ranking_id: number): Promise<Faculty[]> {
    let applicantList: Faculty[] = [];
    let list_function = async (): Promise<Faculty[]> => {
      return await fetch(`http://localhost:8080/applicantskills/users/${skill_id}/${ranking_id}`)
        .then(async (response) => {
          applicantList = await response.json();
          return applicantList;
        });
    }
    return list_function();
  }

  async getApplicantById(u_id: number): Promise<Applicant> {
    let applicant = new Applicant();
    let get_function = async (): Promise<Applicant> => {
      return await fetch(`http://localhost:8080/applicants/${u_id}`)
        .then(async (response) => {
          applicant = await response.json();
          return applicant;
        });
    }
    return get_function();
  }

  async getApplicantByName(url: string): Promise<Applicant[]> {
    let applicants: Applicant[] = [];
    let list_function = async (): Promise<Applicant[]> => {
      return await fetch(`http://localhost:8080/${url}`)
        .then(async (response) => {
          applicants = await response.json();
          return applicants;
        });
    }
    return list_function();
  };


  async getCourseId(course_code: string, section_number: number, term_name: string): Promise<number> {
    let course_id: number;
    let list_function = async (): Promise<number> => {
      console.log("Entered GET COURSE ID Function");
      return await fetch(`http://localhost:8080/coursestaught/getid/${course_code}/${section_number}/${term_name}`)
        .then(async (response) => {
          let data = await response.json();
          course_id = parseInt(data);
          return course_id;
        });
    }
    return list_function();
  };

  async getAllApplications(): Promise<Application[]> {
    let appList: Application[] = [];
    let list_function = async (): Promise<Application[]> => {
      return await fetch('http://localhost:8080/applications/')
        .then(async (response) => {
          appList = await response.json();
          return appList;
        });
    }
    return list_function();
  }

  async getAllApplicationByJobId(job_id: number): Promise<Application[]> {
    let appList: Application[] = [];
    let list_funciton = async (): Promise<Application[]> => {
      return await fetch(`http://localhost:8080/applications/job-id/${job_id}`)
        .then(async (response) => {
          appList = await response.json();
          return appList;
        });
    }
    return list_funciton();
  }

  async getApplicationById(app_id: number): Promise<Application> {
    let application = new Application();
    let get_function = async (): Promise<Application> => {
      return await fetch(`http://localhost:8080/applications/${app_id}`)
        .then(async (response) => {
          let data = await response.json();
          application = await data;
          return application;
        });
    }
    return get_function();
  }

  async getStatusById(s_id: number): Promise<Status> {
    let status = new Status();
    let get_function = async (): Promise<Status> => {
      return await fetch(`http://localhost:8080/status/${s_id}`)
        .then(async (response) => {
          let data = await response.json();
          status = await data;
          return status;
        });
    }
    return get_function();
  }

  async getListStatus(): Promise<Status[]> {
    let statusList: Status[] = [];
    let list_function = async (): Promise<Status[]> => {
      console.log("Entered FACULTY List Function");
      return await fetch('http://localhost:8080/status')
        .then(async (response) => {
          let data = await response.json();
          for (let i = 0; i < data.length; i++) {
            statusList[i] = new Status(
              data[i].s_id,
              data[i].s_name
            );
          }
          return statusList;
        });
    }
    return list_function();
  }

  async getCourseScheduleByCourseId(course_id: number): Promise<CourseSchedule[]> {
    let oneCourseSchedule: CourseSchedule[] = [];
    let get_function = async (): Promise<CourseSchedule[]> => {
      return await fetch(`http://localhost:8080/courseschedule/get-course/${course_id}`)
        .then(async (response) => {
          let data = await response.json();
          for (let i = 0; i < data.length; i++) {
            oneCourseSchedule[i] = new CourseSchedule(
              data[i].course_id,
              data[i].day_id,
              data[i].start_time,
              data[i].end_time,
              data[i].cs_id
            );
          }
          return oneCourseSchedule;
        });
    }
    return get_function();
  }

  async getFacultyRatingsById(u_id: number): Promise<Rating[]> {
    let ratings: Rating[] = [];
    let list_funciton = async (): Promise<Rating[]> => {
      return await fetch(`http://localhost:8080/ratings/faculty/${u_id}`)
        .then(async (response) => {
          let data = await response.json();
          for (let i = 0; i < data.length; i++) {
            ratings[i] = new Rating(
              data[i].rating_id,
              data[i].u_id,
              data[i].rating_value
            );
          }
          return ratings;
        });
    };
    return list_funciton();
  }
}

