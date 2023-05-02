import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Diagnostics2ColComponent } from './diagnostics2-col.component';

describe('Diagnostics2ColComponent', () => {
  let component: Diagnostics2ColComponent;
  let fixture: ComponentFixture<Diagnostics2ColComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Diagnostics2ColComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Diagnostics2ColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
