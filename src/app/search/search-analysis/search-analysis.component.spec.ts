import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAnalysisComponent } from './search-analysis.component';

describe('SearchAnalysisComponent', () => {
  let component: SearchAnalysisComponent;
  let fixture: ComponentFixture<SearchAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchAnalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
