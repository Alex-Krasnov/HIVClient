import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCardTreatmentComponent } from './patient-card-treatment.component';

describe('PatientCardTreatmentComponent', () => {
  let component: PatientCardTreatmentComponent;
  let fixture: ComponentFixture<PatientCardTreatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientCardTreatmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientCardTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
