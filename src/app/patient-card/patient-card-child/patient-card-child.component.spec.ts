import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCardChildComponent } from './patient-card-child.component';

describe('PatientCardChildComponent', () => {
  let component: PatientCardChildComponent;
  let fixture: ComponentFixture<PatientCardChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientCardChildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientCardChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
