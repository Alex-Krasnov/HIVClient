import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCovidComponent } from './search-covid.component';

describe('SearchCovidComponent', () => {
  let component: SearchCovidComponent;
  let fixture: ComponentFixture<SearchCovidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCovidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCovidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
