import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DieCouresComponent } from './die-coures.component';

describe('DieCouresComponent', () => {
  let component: DieCouresComponent;
  let fixture: ComponentFixture<DieCouresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DieCouresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DieCouresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
