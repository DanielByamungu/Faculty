import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewApplicantsComponent } from './view-applicants.component';
import { Applicant } from 'src/models/users/applicant.model';

describe('ViewApplicantsComponent', () => {
  let component: ViewApplicantsComponent;
  let fixture: ComponentFixture<ViewApplicantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewApplicantsComponent ]
    })
    .compileComponents();

    let user: Applicant = {
      type_id: 1,
      full_name: "testing",
      home_phone: "(515) 111-1111",
      mobile_phone: "(225) 111-1111",
      email: "test@gmail.com",
      pswrd: "testing",
      loggedIn: false,
      u_id: 1,
    };
    sessionStorage.setItem("user", JSON.stringify(user));

    fixture = TestBed.createComponent(ViewApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
