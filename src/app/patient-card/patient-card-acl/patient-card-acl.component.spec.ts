import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCardAclComponent } from './patient-card-acl.component';

describe('PatientCardAclComponent', () => {
  let component: PatientCardAclComponent;
  let fixture: ComponentFixture<PatientCardAclComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientCardAclComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientCardAclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
