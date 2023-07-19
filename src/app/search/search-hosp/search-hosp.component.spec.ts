import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHospComponent } from './search-hosp.component';

describe('SearchHospComponent', () => {
  let component: SearchHospComponent;
  let fixture: ComponentFixture<SearchHospComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchHospComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchHospComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
