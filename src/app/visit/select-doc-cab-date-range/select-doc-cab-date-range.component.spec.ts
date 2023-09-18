import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDocCabDateRangeComponent } from './select-doc-cab-date-range.component';

describe('SelectDocCabDateRangeComponent', () => {
  let component: SelectDocCabDateRangeComponent;
  let fixture: ComponentFixture<SelectDocCabDateRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectDocCabDateRangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectDocCabDateRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
