import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterModule } from '@angular/router';
import { ApplicationFormComponent } from './application-form.component';

describe('ApplicationFormComponent', () => {
  let component: ApplicationFormComponent;
  let fixture: ComponentFixture<ApplicationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicationFormComponent],
      imports: [RouterModule.forRoot([])],
    }).compileComponents();

    let user = {
      app_id: 1,
      type_id: 1,
      email: "test@gmail.com",
      pswrd: "testing",
      loggedIn: false,
      u_id: 1,
      r_id: -1
    }
    sessionStorage.setItem("user", JSON.stringify(user));
    fixture = TestBed.createComponent(ApplicationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
