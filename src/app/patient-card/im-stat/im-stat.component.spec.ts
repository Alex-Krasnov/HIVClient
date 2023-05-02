import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImStatComponent } from './im-stat.component';

describe('ImStatComponent', () => {
  let component: ImStatComponent;
  let fixture: ComponentFixture<ImStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImStatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
