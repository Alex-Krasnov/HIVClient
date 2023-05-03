import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCardDiagnosticConcomitantComponent } from './patient-card-diagnostic-concomitant.component';

describe('PatientCardDiagnosticConcomitantComponent', () => {
  let component: PatientCardDiagnosticConcomitantComponent;
  let fixture: ComponentFixture<PatientCardDiagnosticConcomitantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientCardDiagnosticConcomitantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientCardDiagnosticConcomitantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
