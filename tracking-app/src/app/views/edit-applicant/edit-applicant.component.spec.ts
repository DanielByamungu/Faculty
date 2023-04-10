import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Coordinator } from 'src/models/users/coordinator.model';
import { EditApplicantComponent } from './edit-applicant.component';

describe('EditApplicantComponent', () => {
  let component: EditApplicantComponent;
  let fixture: ComponentFixture<EditApplicantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditApplicantComponent],
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

    fixture = TestBed.createComponent(EditApplicantComponent);
    component = fixture.componentInstance;
    fixture.whenStable().then(() => {
      fixture.detectChanges();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
