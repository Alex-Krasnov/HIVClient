import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSecondDeseaseComponent } from './patient-second-desease.component';

describe('PatientSecondDeseaseComponent', () => {
  let component: PatientSecondDeseaseComponent;
  let fixture: ComponentFixture<PatientSecondDeseaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientSecondDeseaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientSecondDeseaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
