import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientChemsexComponent } from './patient-chemsex.component';

describe('PatientChemsexComponent', () => {
  let component: PatientChemsexComponent;
  let fixture: ComponentFixture<PatientChemsexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientChemsexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientChemsexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
