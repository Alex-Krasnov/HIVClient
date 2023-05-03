import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GEComponent } from './ge.component';

describe('GEComponent', () => {
  let component: GEComponent;
  let fixture: ComponentFixture<GEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GEComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
