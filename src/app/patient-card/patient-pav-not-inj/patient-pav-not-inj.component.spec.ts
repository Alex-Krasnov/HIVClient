import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPavNotInjComponent } from './patient-pav-not-inj.component';

describe('PatientPavNotInjComponent', () => {
  let component: PatientPavNotInjComponent;
  let fixture: ComponentFixture<PatientPavNotInjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientPavNotInjComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientPavNotInjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
