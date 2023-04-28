import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRegistryComponent } from './patient-registry.component';

describe('PatientRegistryComponent', () => {
  let component: PatientRegistryComponent;
  let fixture: ComponentFixture<PatientRegistryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientRegistryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
