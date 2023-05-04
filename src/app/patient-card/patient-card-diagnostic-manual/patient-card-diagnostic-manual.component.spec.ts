import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCardDiagnosticManualComponent } from './patient-card-diagnostic-manual.component';

describe('PatientCardDiagnosticManualComponent', () => {
  let component: PatientCardDiagnosticManualComponent;
  let fixture: ComponentFixture<PatientCardDiagnosticManualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientCardDiagnosticManualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientCardDiagnosticManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
