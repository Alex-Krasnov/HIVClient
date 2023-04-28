import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCheckComponent } from './patient-check.component';

describe('PatientCheckComponent', () => {
  let component: PatientCheckComponent;
  let fixture: ComponentFixture<PatientCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
