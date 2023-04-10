import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCourseScheduleComponent } from './view-course-schedule.component';
import { RouterModule } from '@angular/router';

describe('ViewCourseScheduleComponent', () => {
  let component: ViewCourseScheduleComponent;
  let fixture: ComponentFixture<ViewCourseScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCourseScheduleComponent ],
      imports: [
        RouterModule.forRoot([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCourseScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
