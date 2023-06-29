import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectList2ColComponent } from './select-list2-col.component';

describe('SelectList2ColComponent', () => {
  let component: SelectList2ColComponent;
  let fixture: ComponentFixture<SelectList2ColComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectList2ColComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectList2ColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
