import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPregnantComponent } from './search-pregnant.component';

describe('SearchPregnantComponent', () => {
  let component: SearchPregnantComponent;
  let fixture: ComponentFixture<SearchPregnantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPregnantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPregnantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
