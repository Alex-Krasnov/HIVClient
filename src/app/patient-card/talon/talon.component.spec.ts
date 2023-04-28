import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalonComponent } from './talon.component';

describe('TalonComponent', () => {
  let component: TalonComponent;
  let fixture: ComponentFixture<TalonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TalonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
