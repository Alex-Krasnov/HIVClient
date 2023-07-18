import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchVisitComponent } from './search-visit.component';

describe('SearchVisitComponent', () => {
  let component: SearchVisitComponent;
  let fixture: ComponentFixture<SearchVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchVisitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
