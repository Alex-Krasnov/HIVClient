import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCardCovidComponent } from './patient-card-covid.component';

describe('PatientCardCovidComponent', () => {
  let component: PatientCardCovidComponent;
  let fixture: ComponentFixture<PatientCardCovidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientCardCovidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientCardCovidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
