import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFacultyScheduleComponent } from './edit-faculty-schedule.component';

describe('EditFacultyScheduleComponent', () => {
  let component: EditFacultyScheduleComponent;
  let fixture: ComponentFixture<EditFacultyScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFacultyScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFacultyScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
