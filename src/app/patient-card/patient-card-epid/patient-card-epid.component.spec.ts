import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCardEpidComponent } from './patient-card-epid.component';

describe('PatientCardEpidComponent', () => {
  let component: PatientCardEpidComponent;
  let fixture: ComponentFixture<PatientCardEpidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientCardEpidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientCardEpidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
