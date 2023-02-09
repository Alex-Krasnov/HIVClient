import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientStageComponent } from './patient-stage.component';

describe('PatientStageComponent', () => {
  let component: PatientStageComponent;
  let fixture: ComponentFixture<PatientStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientStageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
