import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCardMainComponent } from './patient-card-main.component';

describe('PatientCardMainComponent', () => {
  let component: PatientCardMainComponent;
  let fixture: ComponentFixture<PatientCardMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientCardMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientCardMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
