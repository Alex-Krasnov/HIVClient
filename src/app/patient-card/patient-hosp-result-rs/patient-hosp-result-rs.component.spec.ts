import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientHospResultRsComponent } from './patient-hosp-result-rs.component';

describe('PatientHospResultRsComponent', () => {
  let component: PatientHospResultRsComponent;
  let fixture: ComponentFixture<PatientHospResultRsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientHospResultRsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientHospResultRsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
