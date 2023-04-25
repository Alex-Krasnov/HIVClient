import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPavComponent } from './patient-pav.component';

describe('PatientPavComponent', () => {
  let component: PatientPavComponent;
  let fixture: ComponentFixture<PatientPavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientPavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientPavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
