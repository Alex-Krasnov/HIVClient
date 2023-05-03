import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HepCPcrComponent } from './hep-cpcr.component';

describe('HepCPcrComponent', () => {
  let component: HepCPcrComponent;
  let fixture: ComponentFixture<HepCPcrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HepCPcrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HepCPcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
