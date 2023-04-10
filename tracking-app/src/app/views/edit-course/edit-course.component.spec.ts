import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditCourseComponent } from './edit-course.component';

describe('EditCourseComponent', () => {
  let component: EditCourseComponent;
  let fixture: ComponentFixture<EditCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCourseComponent],
      imports: [RouterModule.forRoot([]), FormsModule],
    }).compileComponents();

    let user = {
      app_id: 1,
      type_id: 1,
      email: 'test@gmail.com',
      pswrd: 'testing',
      loggedIn: false,
      u_id: 1,
      r_id: -1,
    };
    sessionStorage.setItem('user', JSON.stringify(user));

    fixture = TestBed.createComponent(EditCourseComponent);
    component = fixture.componentInstance;
    fixture.whenStable().then(() => {
      fixture.detectChanges();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
