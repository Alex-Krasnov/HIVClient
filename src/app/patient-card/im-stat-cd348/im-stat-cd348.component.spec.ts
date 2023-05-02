import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImStatCD348Component } from './im-stat-cd348.component';

describe('ImStatCD348Component', () => {
  let component: ImStatCD348Component;
  let fixture: ComponentFixture<ImStatCD348Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImStatCD348Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImStatCD348Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
