import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCardResistenceComponent } from './patient-card-resistence.component';

describe('PatientCardResistenceComponent', () => {
  let component: PatientCardResistenceComponent;
  let fixture: ComponentFixture<PatientCardResistenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientCardResistenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientCardResistenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
