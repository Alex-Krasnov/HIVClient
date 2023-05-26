import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCardJailComponent } from './patient-card-jail.component';

describe('PatientCardJailComponent', () => {
  let component: PatientCardJailComponent;
  let fixture: ComponentFixture<PatientCardJailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientCardJailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientCardJailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
