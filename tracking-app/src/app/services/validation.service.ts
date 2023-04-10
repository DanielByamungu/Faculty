import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  private emailRegex = new RegExp("^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");
  private passwrdRegex = new RegExp("^(?=.*[A-Z].{2,})(?=.*[!@#$&*].{1,})(?=.*[0-9].{1,})(?=.*[a-z].{3,}).{8,}$")
  private emailConestogaRegex = new RegExp("^[\\w-.]+@conestogac.on.ca$");
  private phoneRegex = new RegExp("^[\\(][0-9]{3}[\\)][\\s]{0,1}[0-9]{3}[-\\s][0-9]{4}$")
  private courseCodeRegex = new RegExp("^[A-Z]{4}[0-9]{4}$")
  private nameRegex = new RegExp("^[a-zA-Z\\s]*$")

  public checkEmail (email: string): boolean {
    return this.emailRegex.test(email);
  }

  public checkPassword (password: string): boolean {
    return this.passwrdRegex.test(password);
  }

  public checkCoord_FacultyEmail (email: string): boolean {
    return this.emailConestogaRegex.test(email);
  }

  public checkPhone (phoneNum: string): boolean {
    return this.phoneRegex.test(phoneNum);
  }

  public checkCourseCode (courseCode: string): boolean {
    return this.courseCodeRegex.test(courseCode);
  }

  public checkName (name: string): boolean {
    name = name.trim().toUpperCase();
    return this.nameRegex.test(name);
  }
}
