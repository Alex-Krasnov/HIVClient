import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCovidEpidComponent } from './patient-covid-epid.component';

describe('PatientCovidEpidComponent', () => {
  let component: PatientCovidEpidComponent;
  let fixture: ComponentFixture<PatientCovidEpidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientCovidEpidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientCovidEpidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
