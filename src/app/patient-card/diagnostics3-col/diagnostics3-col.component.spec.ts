import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Diagnostics3ColComponent } from './diagnostics3-col.component';

describe('Diagnostics3ColComponent', () => {
  let component: Diagnostics3ColComponent;
  let fixture: ComponentFixture<Diagnostics3ColComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Diagnostics3ColComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Diagnostics3ColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
