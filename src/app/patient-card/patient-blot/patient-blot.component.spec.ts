import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientBlotComponent } from './patient-blot.component';

describe('PatientBlotComponent', () => {
  let component: PatientBlotComponent;
  let fixture: ComponentFixture<PatientBlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientBlotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientBlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
