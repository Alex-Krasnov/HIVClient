import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDieListComponent } from './select-die-list.component';

describe('SelectDieListComponent', () => {
  let component: SelectDieListComponent;
  let fixture: ComponentFixture<SelectDieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectDieListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectDieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
