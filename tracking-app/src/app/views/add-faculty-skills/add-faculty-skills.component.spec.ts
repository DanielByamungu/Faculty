import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFacultySkillsComponent } from './add-faculty-skills.component';
import { RouterModule } from '@angular/router';

describe('AddFacultySkillsComponent', () => {
  let component: AddFacultySkillsComponent;
  let fixture: ComponentFixture<AddFacultySkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFacultySkillsComponent ],
      imports: [
        RouterModule.forRoot([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFacultySkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
