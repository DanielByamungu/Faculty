import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJobpostingComponent } from './edit-jobposting.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('EditJobpostingComponent', () => {
  let component: EditJobpostingComponent;
  let fixture: ComponentFixture<EditJobpostingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditJobpostingComponent ],
      imports: [
        RouterModule.forRoot([]),
        FormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditJobpostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
