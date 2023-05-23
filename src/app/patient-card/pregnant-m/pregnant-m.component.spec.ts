import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregnantMComponent } from './pregnant-m.component';

describe('PregnantMComponent', () => {
  let component: PregnantMComponent;
  let fixture: ComponentFixture<PregnantMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregnantMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregnantMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
