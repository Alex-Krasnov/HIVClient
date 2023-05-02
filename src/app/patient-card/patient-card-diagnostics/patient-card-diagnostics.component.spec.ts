import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCardDiagnosticsComponent } from './patient-card-diagnostics.component';

describe('PatientCardDiagnosticsComponent', () => {
  let component: PatientCardDiagnosticsComponent;
  let fixture: ComponentFixture<PatientCardDiagnosticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientCardDiagnosticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientCardDiagnosticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
