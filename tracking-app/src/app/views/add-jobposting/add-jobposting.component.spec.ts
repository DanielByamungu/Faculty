import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobpostingComponent } from './add-jobposting.component';

describe('AddJobpostingComponent', () => {
  let component: AddJobpostingComponent;
  let fixture: ComponentFixture<AddJobpostingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddJobpostingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddJobpostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
