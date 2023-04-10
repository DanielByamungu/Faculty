import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Coordinator } from 'src/models/users/coordinator.model';
import { EditFacultyComponent } from './edit-faculty.component';

describe('EditFacultyComponent', () => {
  let component: EditFacultyComponent;
  let fixture: ComponentFixture<EditFacultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditFacultyComponent],
      imports: [RouterModule.forRoot([]), FormsModule],
    }).compileComponents();

    let user: Coordinator = {
      type_id: 1,
      fullName: 'testing',
      hire_date: new Date(),
      email: 'test@gmail.com',
      pswrd: 'testing',
      loggedIn: false,
      u_id: 1,
      pr_id: 1,
    };
    sessionStorage.setItem('user', JSON.stringify(user));

    fixture = TestBed.createComponent(EditFacultyComponent);
    component = fixture.componentInstance;
    fixture.whenStable().then(() => {
      fixture.detectChanges();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
