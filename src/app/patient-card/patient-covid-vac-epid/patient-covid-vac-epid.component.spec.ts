import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCovidVacEpidComponent } from './patient-covid-vac-epid.component';

describe('PatientCovidVacEpidComponent', () => {
  let component: PatientCovidVacEpidComponent;
  let fixture: ComponentFixture<PatientCovidVacEpidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientCovidVacEpidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientCovidVacEpidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
