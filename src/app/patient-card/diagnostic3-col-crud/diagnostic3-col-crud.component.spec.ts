import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Diagnostic3ColCrudComponent } from './diagnostic3-col-crud.component';

describe('Diagnostic3ColCrudComponent', () => {
  let component: Diagnostic3ColCrudComponent;
  let fixture: ComponentFixture<Diagnostic3ColCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Diagnostic3ColCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Diagnostic3ColCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
