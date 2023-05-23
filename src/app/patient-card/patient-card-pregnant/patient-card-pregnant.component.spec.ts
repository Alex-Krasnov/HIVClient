import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCardPregnantComponent } from './patient-card-pregnant.component';

describe('PatientCardPregnantComponent', () => {
  let component: PatientCardPregnantComponent;
  let fixture: ComponentFixture<PatientCardPregnantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientCardPregnantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientCardPregnantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
