import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCheckOutComponent } from './patient-check-out.component';

describe('PatientCheckOutComponent', () => {
  let component: PatientCheckOutComponent;
  let fixture: ComponentFixture<PatientCheckOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientCheckOutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientCheckOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
