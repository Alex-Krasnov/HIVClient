import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCureSchemasComponent } from './patient-cure-schemas.component';

describe('PatientCureSchemasComponent', () => {
  let component: PatientCureSchemasComponent;
  let fixture: ComponentFixture<PatientCureSchemasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientCureSchemasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientCureSchemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
