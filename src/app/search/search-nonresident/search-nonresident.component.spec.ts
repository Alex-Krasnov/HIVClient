import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchNonresidentComponent } from './search-nonresident.component';

describe('SearchNonresidentComponent', () => {
  let component: SearchNonresidentComponent;
  let fixture: ComponentFixture<SearchNonresidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchNonresidentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchNonresidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
