import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCardVisitComponent } from './patient-card-visit.component';

describe('PatientVisitComponent', () => {
  let component: PatientCardVisitComponent;
  let fixture: ComponentFixture<PatientCardVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientCardVisitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientCardVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
