import { Component, OnInit } from '@angular/core';
import { Faculty } from 'src/models/users/faculty.model';

@Component({
  selector: 'app-faculty-home',
  templateUrl: './faculty-home.component.html',
  styleUrls: ['./faculty-home.component.css']
})
export class FacultyHomeComponent implements OnInit {

  public user = new Faculty()

  constructor() { }

  ngOnInit(): void {
  }

}
