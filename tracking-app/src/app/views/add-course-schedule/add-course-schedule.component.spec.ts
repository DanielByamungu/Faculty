import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterModule } from '@angular/router';
import { Coordinator } from 'src/models/users/coordinator.model';
import { AddCourseScheduleComponent } from './add-course-schedule.component';

describe('AddCourseScheduleComponent', () => {
  let component: AddCourseScheduleComponent;
  let fixture: ComponentFixture<AddCourseScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCourseScheduleComponent],
      imports: [RouterModule.forRoot([])],
    }).compileComponents();

    let user: Coordinator = {
      fullName: 'testing',
      hire_date: new Date(),
      pr_id: 1,
      type_id: 1,
      email: 'test@gmail.com',
      pswrd: 'testing',
      loggedIn: false,
      u_id: 1,
    };
    window.sessionStorage.setItem('user', JSON.stringify(user));

    fixture = TestBed.createComponent(AddCourseScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
