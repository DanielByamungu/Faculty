import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyRatingComponent } from './faculty-rating.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('FacultyRatingComponent', () => {
  let component: FacultyRatingComponent;
  let fixture: ComponentFixture<FacultyRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyRatingComponent ],
      imports: [
        RouterModule.forRoot([]),
        FormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
