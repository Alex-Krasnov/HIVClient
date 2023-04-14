import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCorrepIllnessesComponent } from './patient-correp-illnesses.component';

describe('PatientCorrepIllnessesComponent', () => {
  let component: PatientCorrepIllnessesComponent;
  let fixture: ComponentFixture<PatientCorrepIllnessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientCorrepIllnessesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientCorrepIllnessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
