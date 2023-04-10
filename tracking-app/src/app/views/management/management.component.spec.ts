import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementComponent } from './management.component';

describe('ManagementComponent', () => {
  let component: ManagementComponent;
  let fixture: ComponentFixture<ManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementComponent ]
    })
    .compileComponents();

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
    fixture = TestBed.createComponent(ManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
